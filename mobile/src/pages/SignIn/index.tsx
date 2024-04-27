import React, { useEffect, useState } from 'react';
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
} from 'react-native';

import { api } from '../../api';

// eslint-disable-next-line
const imagePath = require("../../assets/LogoPng.png");
import {
	Container,
	Title,
	ForgotPasswordLink,
	LoginButton,
	LoginButtonText,
	Logo,
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
	const { onLogin, authState } = useAuth();

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
		setIsLoading(true); // inicia o spinner
		try {
			if (onLogin) {
				const result = await onLogin(data.email.toLowerCase(), data.senha);
				if (result && result.error) {
					Alert.alert('Erro', result.error);
				}
				navigation.navigate('Main');
			} else {
				throw new Error('onLogin function is not defined');
			}
		} catch (error) {
			Alert.alert('Erro', 'Ocorreu um erro durante o login. Por favor, tente novamente.');
		} finally {
			setIsLoading(false); // para o spinner
		}
	};

	async function handleSignUp() {
		navigation.navigate('SignUp');
	}

	async function handleForgotPassword() {
		navigation.navigate('ForgotPassword');
	}

	useEffect(() => {
		if (authState?.authenticated) {
			navigation.navigate('Main');
		}
	}, []);

	return (
		<KeyboardAvoidingView behavior={'padding'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<TopContent>
						<Title>Entrar</Title>
					</TopContent>
					<CenteredView>
						<Logo source={imagePath} />
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

