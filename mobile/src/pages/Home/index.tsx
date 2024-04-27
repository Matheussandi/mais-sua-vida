import React, { useState, useEffect } from 'react';

import { useUserContext } from '../../context/UserContext';

import { ActivityIndicator, Alert, Image } from 'react-native';

import axios from 'axios';

import { Doctor } from '../../types/Doctors';
import { Especialization } from '../../types/Especialization';
import { useNavigation } from '@react-navigation/native';

import {
	Container,
	CenteredContainer,
	ContentContainer,
	Header,
	Greetings,
	EspecializationsContainer,
	DoctorsContainer,
	GreetingsText,
	UserName,
	UserImageContainer,
	UserIcon,
	EspecializationsTitle,
	EspecializationsList,
	EmptyDoctorsText,
	EmptyDoctorsContainer,
	HeaderContent,
	SearchInput,
	SearchInputContainer,
} from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Especializations } from './components/Especializations';
import { Doctors } from './components/Doctors';
import { Feather } from '@expo/vector-icons';
import { API_URL } from '@env';


export default function Home() {
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [especialization, setEspecialization] = useState<Especialization[]>([]);
	const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

	const { userData } = useUserContext();
	const navigation = useNavigation();

	async function fetchData<T>(url: string, setData: React.Dispatch<React.SetStateAction<T[]>>) {
		try {
			const response = await axios.get<T[]>(API_URL + url);
			setData(response.data);
		} catch (error) {
			console.error(`Erro ao buscar dados de ${url}:`, error);
			Alert.alert('Erro ao buscar dados');
		}
	}
	useEffect(() => {
		fetchData('/medico', setDoctors);
		fetchData('/especializacao', setEspecialization);
	}, []);

	useEffect(() => {
		const filtered = doctors.filter((doctor) => {
			const fullName = `${doctor.nome} ${doctor.sobrenome}`;
			return fullName.toLowerCase().includes(searchQuery.toLowerCase());
		});
		setFilteredDoctors(filtered);
	}, [searchQuery, doctors]);

	async function handleSelectEspecialization(especializationId: string) {
		const route = !especializationId
			? '/medico'
			: `/especializacao/${especializationId}/medico/`;

		setIsLoadingDoctors(true);

		await new Promise((resolve) => setTimeout(resolve, 500));
		try {
			const { data } = await axios.get(API_URL + route);
			setDoctors(data);
			setFilteredDoctors(data);
		} catch (error) {
			console.error('Erro ao buscar dados:', error);
		} finally {
			setIsLoadingDoctors(false);
		}
	}

	const userImage = userData?.patientImage;

	return (
		<Container>
			<Header>
				<HeaderContent>
					<Greetings>
						<GreetingsText>Olá, Bem-vindo(a) 🎉</GreetingsText>
						<UserName>
							{userData?.nome} {userData?.sobrenome}
						</UserName>
					</Greetings>
					<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
						{userImage ? (
							<UserImageContainer>
								<Image
									source={{
										uri:
											API_URL +
											'/uploads/' +
											userData?.patientImage,
									}}
									style={{
										width: 60,
										height: 60,
										borderRadius: 30,
									}}
								/>
							</UserImageContainer>
						) : (
							<UserImageContainer>
								<UserIcon name="user" size={40} />
							</UserImageContainer>
						)}
					</TouchableOpacity>
				</HeaderContent>

				<SearchInputContainer>
					<SearchInput
						placeholder="Pesquisar"
						placeholderTextColor="#fff"
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
					<Feather name="search" size={24} color="#fff" />
				</SearchInputContainer>
			</Header>

			<ContentContainer>
				<EspecializationsContainer>
					<EspecializationsTitle>Especialistas</EspecializationsTitle>
					<EspecializationsList>
						<Especializations
							especializations={especialization}
							onSelectEspecialization={handleSelectEspecialization}
						/>
					</EspecializationsList>
				</EspecializationsContainer>

				{isLoadingDoctors ? (
					<CenteredContainer>
						<ActivityIndicator color="#0079FF" size={60} />
					</CenteredContainer>
				) : (
					<DoctorsContainer>
						{doctors.length > 0 ? (
							<Doctors doctors={filteredDoctors} />
						) : (
							<EmptyDoctorsContainer>
								<EmptyDoctorsText>
									Ainda não temos nenhum(a) Dr(a) com essa especialidade.
								</EmptyDoctorsText>
							</EmptyDoctorsContainer>
						)}
					</DoctorsContainer>
				)}
			</ContentContainer>
		</Container>
	);
}

