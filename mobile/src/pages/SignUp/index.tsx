import React from 'react';
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '../../api';
import {
	Container,
	Title,
	TopContent,
	CenteredView,
	LoginButton,
	LoginButtonText,
	SignUpText,
	SignUpLink,
	BackButton,
} from './styles';
import { useUserContext } from '../../context/UserContext';
import { ControlledInput } from '../../components/ControlledInput';

interface FormData {
    nome: string;
    sobrenome: string;
    CPF: string;
    telefone: string;
    email: string;
    senha: string;
}

const schema = yup
	.object({
		nome: yup
			.string()
			.required('Nome é obrigatório.')
			.matches(/^[A-Za-zÀ-ÖØ-öø-ÿ']+$/, 'Nome inválido'),
		sobrenome: yup
			.string()
			.required('Sobrenome é obrigatório.')
			.matches(/^[A-Za-zÀ-ÖØ-öø-ÿ']+$/, 'Sobrenome inválido'),
		CPF: yup
			.string()
			.required('CPF é obrigatório.')
			.matches(/^\d{11}$/, 'CPF inválido.'),
		telefone: yup
			.string()
			.required('Número de telefone é obrigatório.')
			.matches(/^\d{13}$/, 'Telefone inválido.'),
		email: yup.string().email('Email inválido').required('Email inválido'),
		senha: yup.string().required('Senha inválida'),
	})
	.required();

export default function SignUp() {
	const { setUserData } = useUserContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const navigation = useNavigation();

	async function handleSignUp(data: FormData) {
		try {
			
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

	async function handleSignIn() {
		navigation.navigate('SignIn');
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
							<ControlledInput
								name="nome"
								maxLength={25}
								control={control}
								icon="user"
								placeholder="Nome"
								error={errors.nome}
								autoCapitalize="none"
							/>

							<ControlledInput
								name="sobrenome"
								maxLength={25}
								control={control}
								icon="user"
								placeholder="Sobrenome"
								error={errors.sobrenome}
								autoCapitalize="none"
							/>

							<ControlledInput
								name="CPF"
								maxLength={11}
								control={control}
								icon="user"
								placeholder="CPF"
								error={errors.CPF}
								autoCapitalize="none"
							/>

							<ControlledInput
								name="telefone"
								maxLength={13}
								control={control}
								icon="phone"
								placeholder="Telefone"
								error={errors.telefone}
								autoCapitalize="none"
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
								secureTextEntry={true}
								maxLength={16}
								control={control}
								icon="lock"
								placeholder="Senha"
								error={errors.senha}
							/>

							<LoginButton onPress={handleSubmit(handleSignUp)}>
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

