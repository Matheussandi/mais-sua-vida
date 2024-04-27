import { useNavigation } from '@react-navigation/native';

import {
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
	View,
} from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
	CenteredView,
	Container,
	LoginButton,
	LoginButtonText,
} from './styles';

import { ControlledInput } from '../../components/ControlledInput';
import { Header } from '../../components/Header';

import { useUserContext } from '../../context/UserContext';
import React, { useEffect } from 'react';

import { api } from '../../api';

interface FormData {
	nome: string;
	sobrenome: string;
	CPF: string;
	telefone: string;
	email: string;
	senha: string;
	dataNascimento: string;
	altura: string;
	peso: string;
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
		dataNascimento: yup.string(),
		altura: yup.string(),
		peso: yup.string(),
	})
	.required();

export function InfoBasics() {
	const { setUserData, userData } = useUserContext();

	const userId = userData.id;

	const navigation = useNavigation();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleUpdateUser(data: FormData) {
		try {
			const updatedUser = await api
				.put(`paciente/${userId}`, data) // Use o ID do usuário na rota
				.then((response) => {
					const userData = response.data;
					navigation.navigate('home');
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (erro: any) {
			console.error(erro);

			if (erro.response) {
				const { data } = erro.response;
				console.error('Dados do Erro: ', data);
			}
		}
	}

	useEffect(() => {
		if (userData) {
			const { nome, sobrenome, CPF, telefone, email, dataNascimento, altura, peso } = userData;

			setValue('nome', nome);
			setValue('sobrenome', sobrenome);
			setValue('CPF', CPF);
			setValue('telefone', telefone);
			setValue('email', email);
			setValue('dataNascimento', dataNascimento);
			setValue('altura', altura);
			setValue('peso', peso);
		}
	}, [userData, control]);

	return (
		<KeyboardAvoidingView behavior={'padding'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header title={'Informações Básicas'} />

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

							<ControlledInput
								name="dataNascimento"
								maxLength={10}
								control={control}
								icon="calendar"
								placeholder="Data de Nascimento"
								error={errors.dataNascimento}
								autoCapitalize="none"
							/>

							<ControlledInput
								name="altura"
								maxLength={3}
								control={control}
								icon="user"
								placeholder="Altura"
								error={errors.altura}
								autoCapitalize="none"
							/>

							<ControlledInput
								name="peso"
								maxLength={3}
								control={control}
								icon="user"
								placeholder="Peso"
								error={errors.peso}
								autoCapitalize="none"
							/>

							<LoginButton
								onPress={handleSubmit(handleUpdateUser)}
							>
								<LoginButtonText>Salvar</LoginButtonText>
							</LoginButton>
						</CenteredView>
					</ScrollView>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}