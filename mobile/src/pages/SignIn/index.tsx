import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/UserContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
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
	const { setUserData } = useUserContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const navigation = useNavigation();

	async function handleSignIn(data: FormData) {
		await api
			.post('paciente/login', data)
			.then((response) => {
				const userData = response.data;
				const userId = userData.id;

				setUserData(userData);
				navigation.reset({
					index: 0,
					routes: [{ name: 'Main', params: { userId } }],
				});
			})
			.catch((error) => {
				Alert.alert('Usuário inválido');
				console.log(data);
				console.log(error);
			});
	}

	async function handleSignUp() {
		navigation.navigate('SignUp');
	}

	async function handleForgotPassword() {
		navigation.navigate('ForgotPassword');
	}

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
							secureTextEntry={true}
							maxLength={16}
							control={control}
							icon="lock"
							placeholder="Senha"
							error={errors.senha}
						/>

						<ForgotPasswordContainer>
							<ForgotPasswordLink onPress={handleForgotPassword}>
                                Esqueceu a senha?
							</ForgotPasswordLink>
						</ForgotPasswordContainer>
						<LoginButton onPress={handleSubmit(handleSignIn)}>
							<LoginButtonText>Acessar</LoginButtonText>
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

