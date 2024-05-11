import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
	Container,
	CenteredView,
	LoginButton,
	LoginButtonText,
	SignUpText,
	SignUpLink,
} from './styles';

import { ControlledInput } from '../../components/ControlledInput';
import { Header } from '../../components/Header';
import { maskCpf, maskPhone } from '../../utils/mask';
import { unMask } from '../../utils/unMask';

import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';

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
			.required('CPF é obrigatório.'),
		// .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido.'),
		telefone: yup
			.string()
			.required('Número de telefone é obrigatório.'),
		// .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido.'),
		email: yup.string().email('Email inválido').required('Email inválido'),
		senha: yup.string().required('Senha inválida'),
	})
	.required();

export default function SignUp() {
	const { onRegister } = useAuth();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);


	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		shouldUnregister: false,
	});

	const navigation = useNavigation();

	const handleCpfChange = (value: string) => {
		const maskedValue = maskCpf(value);
		setValue('CPF', maskedValue);
	};

	const handlePhoneChange = (value: string) => {
		const maskedValue = maskPhone(value);
		setValue('telefone', maskedValue);
	};

	const handleSignUp = async (data: FormData) => {
		setIsLoading(true);
		try {
			data.CPF = unMask(data.CPF);
			data.telefone = unMask(data.telefone);
			data.email = data.email.toLowerCase();

			if (onRegister) {
				const result = await onRegister(data);
				if (result && result.error) {
					Alert.alert('Erro', result.error);
				} else {
					navigation.navigate('SignIn');
				}
			} else {
				console.error('onRegister is undefined');
			}
		} catch (error) {
			console.error('Error during registration:', error);
			Alert.alert('Erro', 'Ocorreu um erro durante o registro. Por favor, tente novamente.');
		} finally {
			setIsLoading(false);
		}
	};

	async function handleSignIn() {
		navigation.navigate('SignIn');
	}

	return (
		<KeyboardAvoidingView behavior={'padding'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header title={'Registrar'} />

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
								maxLength={14}
								control={control}
								icon="user"
								keyboardType='numeric'
								placeholder="CPF"
								error={errors.CPF}
								onChangeText={handleCpfChange}
							/>
							<ControlledInput
								name="telefone"
								maxLength={15}
								control={control}
								icon="phone"
								keyboardType='numeric'
								placeholder="Telefone"
								error={errors.telefone}
								onChangeText={handlePhoneChange}
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

							<LoginButton onPress={handleSubmit(handleSignUp)}>
								{isLoading ? (
									<ActivityIndicator size="small" color="#fff" />
								) : (
									<LoginButtonText>Cadastrar</LoginButtonText>
								)}
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

