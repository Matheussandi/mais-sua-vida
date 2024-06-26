import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from 'react-native';

// eslint-disable-next-line
const imagePath = require("../../assets/logo.png");
import {
	Container,
	Title,
	ForgotPasswordLink,
	LoginButton,
	LoginButtonText,
	TopContent,
	ForgotPasswordContainer,
	CenteredView,
	SignUpText,
	SignUpLink,
} from './styles';

import { ControlledInput } from '../../components/ControlledInput';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';

interface FormData {
	email: string;
	senha: string;
}

const schema = yup
	.object({
		email: yup.string().email('Email inválido').required('Email inválido'),
		senha: yup.string().required('Senha inválida'),
	})
	.required();

export default function SignIn() {
	const { onLogin } = useAuth();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const navigation = useNavigation();

	const login = async (data: FormData) => {
		setIsLoading(true);
		try {
			if (onLogin) {
				const result = await onLogin(data.email.toLowerCase(), data.senha);
				if (result && result.error) {
					Alert.alert('Erro', result.error);
				}
				navigation.navigate('Main' as never);
			} else {
				throw new Error('onLogin function is not defined');
			}
		} catch (error) {
			Alert.alert('Erro', 'Ocorreu um erro durante o login. Por favor, tente novamente.');
		} finally {
			setIsLoading(false);
		}
	};

	async function handleSignUp() {
		navigation.navigate('SignUp' as never);
	}

	async function handleForgotPassword() {
		navigation.navigate('ForgotPassword' as never);
	}

	/* 	useEffect(() => {
		if (authState?.authenticated === true) {
			navigation.navigate('Main');
		}
	}, [authState]); */

	return (
		<KeyboardAvoidingView behavior={'padding'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<TopContent>
						<Title>Entrar</Title>
					</TopContent>
					<CenteredView>
						<Image
							source={imagePath}
							width={150}
							height={150}
							style={{ marginVertical: 50 }}
						/>
						<ControlledInput
							name="email"
							maxLength={25}
							control={control}
							icon="mail"
							placeholder="E-mail"
							error={errors.email}
							autoCapitalize="none"
						/>

						<ControlledInput
							name="senha"
							secureTextEntry={!isPasswordVisible}
							maxLength={16}
							control={control}
							icon="lock"
							placeholder="Senha"
							error={errors.senha}
							rightIcon={
								<TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
									<Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#777" />
								</TouchableOpacity>
							}
						/>

						<ForgotPasswordContainer>
							<ForgotPasswordLink onPress={handleForgotPassword}>
								Esqueceu a senha?
							</ForgotPasswordLink>
						</ForgotPasswordContainer>

						<LoginButton onPress={handleSubmit(login)}>
							{isLoading ? (
								<ActivityIndicator size="small" color="#fff" />
							) : (
								<LoginButtonText>Acessar</LoginButtonText>
							)}
						</LoginButton>

						<SignUpText>
							Não tem uma conta?{' '}
							<SignUpLink onPress={handleSignUp}>
								Inscreva-se
							</SignUpLink>
						</SignUpText>
					</CenteredView>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

