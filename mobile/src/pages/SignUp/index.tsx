import React, { useState} from 'react';
import { TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { AxiosError } from 'axios';


import { api } from '../../api';

import { 
	Container, 
	LoginBoard,
	Header,
	Footer,
	Button
} from './styles';
import { useUserContext } from '../../context/UserContext';


export default function SignUp(){
	const [nome, setNome] = useState('');
	const [sobrenome, setSobrenome] = useState('');
	const [email, setEmail] = useState('');
	const [CPF, setCPF] = useState('');
	const [ telefone, setTelefone] = useState('');
	//const [dataNascimento, setDataNascimento] = useState('');
	const [senha, setSenha] = useState('');

	const { setUserData } = useUserContext();
	const navigation = useNavigation();

	async function handleSignIn(){
		navigation.navigate('SignIn');
	}

	async function handleSignUp(){
		try{
			const data = {
				nome,
				sobrenome,
				CPF,
				email,
				senha,
				telefone
			};

			const paciente = await api.post('paciente', data)
				.then(response => {
					const userData = response.data;
					setUserData(userData);
					navigation.reset({
						index:0,
						routes: [{ name: 'Main'}],
					});//This works!
				})
				.catch(error => {
					Alert.alert('Erro ao cadastrar o usuário');
					console.log(data);
					console.log(error);
				});
    
		}catch(erro: any){
			console.log(erro);
			
			if(erro.response){
				const { data } = erro.response;
				console.log('Dados do Erro: ', data);
			}
            
		}
		
	}
	return(
		<Container>
			<Header>
				<Text>Registrar</Text>
			</Header>
			<LoginBoard>
				<TextInput 
					placeholder="Insira o seu Nome"
					value={nome}
					onChangeText={value => setNome(value)}
				/>
				<TextInput 
					placeholder="Insira o seu Sobrenome"
					value={sobrenome}
					onChangeText={value => setSobrenome(value)}
				/>
				<TextInput 
					placeholder="Insira o seu CPF"
					value={CPF}
					onChangeText={value => setCPF(value)}
					maxLength={11}
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
				<TextInput 
					placeholder="Insira o seu Telefone"
					value={telefone}
					onChangeText={value=> setTelefone(value)}
					maxLength={13}
				/>
				
				
				<Button onPress={handleSignUp}>
					<Text>Cadastrar</Text>
				</Button>
			</LoginBoard>
			<Footer>
				<TouchableOpacity onPress={handleSignIn}>
					<Text>Já tem uma conta? Entre</Text>
				</TouchableOpacity>
			</Footer>
			
		
		</Container>
	);
}