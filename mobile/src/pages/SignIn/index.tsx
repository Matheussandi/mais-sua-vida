import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/UserContext';
import { Feather } from '@expo/vector-icons';

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
	Input,
	ForgotPasswordLink,
	LoginButton,
	LoginButtonText,
	Logo,
	InputWrapper,
	TopContent,
	ForgotPasswordContainer,
	CenteredView,
	SignUpText,
	SignUpLink,
} from './styles';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { setUserData } = useUserContext();

	const navigation = useNavigation();

	async function handleSignIn() {
		const data = {
			email,
			senha,
		};

		await api
			.post('paciente/login', data)
			.then((response) => {
				const userData = response.data;

				setUserData(userData);
				navigation.reset({
					index: 0,
					routes: [{ name: 'Main' }],
				}); //This works!
			})
			.catch((error) => {
				console.log(data);
				console.log(error);
			});
	}

	async function handleSignUp() {
		navigation.navigate('SignUp');
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
						<InputWrapper>
							{/* Ícone de e-mail */}
							<Feather name="mail" size={24} color="#777" />
							<Input
								placeholder="E-mail"
								value={email}
								onChangeText={(value: string) =>
									setEmail(value)
								}
							/>
						</InputWrapper>
						<InputWrapper>
							{/* Ícone de senha */}
							<Feather name="lock" size={24} color="#777" />
							<Input
								placeholder="Senha"
								secureTextEntry={!showPassword} // A propriedade secureTextEntry será true quando o showPassword for false, e vice-versa
								value={senha}
								onChangeText={(value: string) =>
									setSenha(value)
								}
								maxLength={16}
							/>
							{/* Ícone de olho para alternar a visualização da senha */}
							<Feather
								name={showPassword ? 'eye-off' : 'eye'}
								size={24}
								color="#777"
								onPress={() => setShowPassword(!showPassword)}
							/>
						</InputWrapper>
						<ForgotPasswordContainer>
							<ForgotPasswordLink onPress={handleSignUp}>
                                Esqueceu a senha?
							</ForgotPasswordLink>
						</ForgotPasswordContainer>
						<LoginButton onPress={handleSignIn}>
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

