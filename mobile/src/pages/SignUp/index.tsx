import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Feather } from '@expo/vector-icons';

import { api } from '../../api';
import {
	Container,
	Input,
	Title,
	TopContent,
	CenteredView,
	InputWrapper,
	LoginButton,
	LoginButtonText,
	SignUpText,
	SignUpLink,
	BackButton,
} from './styles';
import { useUserContext } from '../../context/UserContext';

export default function SignUp() {
	const [nome, setNome] = useState('');
	const [sobrenome, setSobrenome] = useState('');
	const [email, setEmail] = useState('');
	const [CPF, setCPF] = useState('');
	const [telefone, setTelefone] = useState('');
	const [senha, setSenha] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { setUserData } = useUserContext();
	const navigation = useNavigation();

	async function handleSignIn() {
		navigation.navigate('SignIn');
	}

	async function handleSignUp() {
		try {
			const data = {
				nome,
				sobrenome,
				CPF,
				email,
				senha,
				telefone,
			};

			const paciente = await api
				.post('paciente', data)
				.then((response) => {
					const userData = response.data;
					setUserData(userData);
					navigation.reset({
						index: 0,
						routes: [{ name: 'Main' }],
					}); //This works!
				})
				.catch((error) => {
					Alert.alert('Erro ao cadastrar o usuário');
					console.log(data);
					console.log(error);
				});
		} catch (erro: any) {
			console.log(erro);

			if (erro.response) {
				const { data } = erro.response;
				console.log('Dados do Erro: ', data);
			}
		}
	}
	return (
		<KeyboardAvoidingView behavior={'padding'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<TopContent>
						<BackButton onPress={handleSignIn}>
							<Feather name="arrow-left" size={24} color="#333" />
						</BackButton>
						<Title>Registrar</Title>
					</TopContent>
					<ScrollView>
						<CenteredView>
							<InputWrapper>
								<Feather name="user" size={24} color="#777" />
								<Input
									placeholder="Nome"
									value={nome}
									onChangeText={(value: string) =>
										setNome(value)
									}
								/>
							</InputWrapper>
							<InputWrapper>
								<Feather name="user" size={24} color="#777" />
								<Input
									placeholder="Sobrenome"
									value={sobrenome}
									onChangeText={(value: string) =>
										setSobrenome(value)
									}
								/>
							</InputWrapper>
							<InputWrapper>
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
								<Feather name="lock" size={24} color="#777" />
								<Input
									placeholder="Senha"
									secureTextEntry={!showPassword}
									value={senha}
									onChangeText={(value: string) =>
										setSenha(value)
									}
									maxLength={16}
								/>
								{/* Ícone de olho para alternar a visualização da senha */}
								<Feather
									name={showPassword ? 'eye-off' : 'eye'}
									size={20}
									color="#777"
									onPress={() =>
										setShowPassword(!showPassword)
									}
								/>
							</InputWrapper>
							<InputWrapper>
								<Feather name="user" size={24} color="#777" />
								<Input
									placeholder="CPF"
									value={CPF}
									maxLength={11}
									onChangeText={(value: string) =>
										setCPF(value)
									}
								/>
							</InputWrapper>
							<InputWrapper>
								<Feather name="phone" size={24} color="#777" />
								<Input
									placeholder="Telefone"
									value={telefone}
									maxLength={13}
									onChangeText={(value: string) =>
										setTelefone(value)
									}
								/>
							</InputWrapper>
							<LoginButton onPress={handleSignUp}>
								<LoginButtonText>Cadastrar</LoginButtonText>
							</LoginButton>
							<SignUpText>
                                Já tem uma conta?{' '}
								<SignUpLink onPress={handleSignIn}>
                                    Entre
								</SignUpLink>
							</SignUpText>
						</CenteredView>
					</ScrollView>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

