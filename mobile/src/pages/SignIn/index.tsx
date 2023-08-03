import React, { useState} from 'react';
import { TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { useUserContext } from '../../context/UserContext';

import { api } from '../../api';

// eslint-disable-next-line
const imagePath = require('../../assets/logo.png');
import { 
	Container, 
	LoginBoard,
	Header,
	Footer,
	Logo,
	Button
} from './styles';


export default function SignIn(){
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const { setUserData } = useUserContext();

	const navigation = useNavigation();

	async function handleSignIn(){

		const data =  {
			email,
			senha,
		};

		await api.post('paciente/login', data)
			.then(response => {
				const userData = response.data;
				
				setUserData(userData);
				navigation.reset({
					index:0,
					routes: [{ name: 'Main'}],
				});//This works!
			})
			.catch(error => {
				console.log(data);
				console.log(error);
			});
	}

	async function handleSignUp(){
		navigation.navigate('SignUp');
	}
	return(
		<Container>
			<Header>
				<Text>Entrar</Text>
			</Header>
			<LoginBoard>
				<Logo 
					source={imagePath}
				/>
				<TextInput 
					placeholder="Insira o seu E-mail"
					value={email}
					onChangeText={value => setEmail(value)}
				/>
				<TextInput 
					placeholder="Insira a sua Senha"
					secureTextEntry={true}
					value={senha}
					onChangeText={value=> setSenha(value)}
					maxLength={16}
				/>
				<Button onPress={handleSignIn}>
					<Text>Acessar</Text>
				</Button>
			</LoginBoard>
			<Footer>
				<TouchableOpacity onPress={handleSignUp}>
					<Text>Não possui conta? Cadastre-se</Text>
				</TouchableOpacity>
			</Footer>
			
		
		</Container>
	);
}