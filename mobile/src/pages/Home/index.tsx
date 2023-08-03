import React, { useState, useEffect } from 'react';

import { useUserContext } from '../../context/UserContext';

import { ActivityIndicator} from 'react-native';
import { Text } from '../Text';

import { api } from '../../api';

import { Doctor } from '../../types/Doctors';
import { Especialization } from '../../types/Especialization';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const serverUrl = process.env.SERVER;

import {
	Container,
	CenteredContainer,
	Header,
	Greetings,
	UserImage,
	EspecializationsContainer,
	DoctorsContainer,

} from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Especializations } from './components/Especializations';
import { Doctors } from './components/Doctors';

export default function Home() {
	const [ doctors, setDoctors] = useState<Doctor[]>([]);
	const [ especialization, setEspecialization] = useState<Especialization[]>([]);
	const [ isLoadingDoctors, setIsLoadingDoctors] = useState(false);
	const { userData } = useUserContext();

	const route = useRoute();

	useEffect(() => {
		Promise.all([
			api.get('/medico'),
			api.get('especializacao')
		]).then(([doctorResponse, especializationResponse]) => {
			setDoctors(doctorResponse.data);   
			setEspecialization(especializationResponse.data);
		});
	}, []);

	async function handleSelectEspecialization(especializationId: string){
		const route = !especializationId
			? '/medico'
			: `/especializacao/${especializationId}/medico/`;

		setIsLoadingDoctors(true);
		
		await new Promise(resolve => setTimeout(resolve, 500));
		const { data } = await api.get(route);
        
		setDoctors(data);
		setIsLoadingDoctors(false);
	}

	const userImage = userData?.patientImage;

	return (
		<>
			<Container>
				<Header>
					<Greetings>
						<Text color="#FFF">Olá, Bem-vindo(a)</Text>
						<Text weight="700" color="#FFF">{userData?.nome}</Text>
					</Greetings>

					{userImage ? (
						<UserImage source={{uri:`${serverUrl}/uploads/${userData?.patientImage}`}}/>
					): (
						<TouchableOpacity>
							<Icon name="user" size={40} color="lightgrey"/>
						</TouchableOpacity>
					)} 
				</Header>
				<EspecializationsContainer>
					<Text color="#000" weight="700" opacity={0.5}>Especialistas</Text>
					<Especializations
						especializations={especialization}
						onSelectEspecialization={handleSelectEspecialization}
					/>
				</EspecializationsContainer>
                
				{isLoadingDoctors ? (
					<CenteredContainer>
						<ActivityIndicator color="#0079FF" size={60}/>
					</CenteredContainer>
				): (
					<>
						{doctors.length > 0 ? (
							<DoctorsContainer>
								<Doctors 
									doctors={doctors}
								/>
							</DoctorsContainer>
						): (
							<CenteredContainer>
								<Icon name="exclamation-circle" size={60} color="#0079FF"/>
								<Text color="#666" style={{marginTop: 24}}>Ainda não temos nenhum(a) Dr(a) com essa especialidade</Text>
							</CenteredContainer>
						)}
                
					</>
				)}

			</Container>
		</>	
	);
}