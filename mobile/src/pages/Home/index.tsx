import React, { useState, useEffect } from 'react';

import { useUserContext } from '../../context/UserContext';

import { ActivityIndicator, Image } from 'react-native';

import { api } from '../../api';

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
	const [especialization, setEspecialization] = useState<Especialization[]>(
		[]
	);
	const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

	const { userData } = useUserContext();

	const navigation = useNavigation();

	useEffect(() => {
		Promise.all([api.get('/medico'), api.get('especializacao')]).then(
			([doctorResponse, especializationResponse]) => {
				setDoctors(doctorResponse.data);
				setEspecialization(especializationResponse.data);
			}
		);
	}, []);

	const filterDoctors = () => {
		const filtered = doctors.filter((doctor) => {
			const fullName = `${doctor.nome} ${doctor.sobrenome}`;

			return fullName.toLowerCase().includes(searchQuery.toLowerCase());
		});
		setFilteredDoctors(filtered);
	};

	useEffect(() => {
		filterDoctors();
	}, [searchQuery, doctors]);

	const handleSearchSubmit = () => {
		filterDoctors();
	};

	async function handleSelectEspecialization(especializationId: string) {
		const route = !especializationId
			? '/medico'
			: `/especializacao/${especializationId}/medico/`;

		setIsLoadingDoctors(true);

		await new Promise((resolve) => setTimeout(resolve, 500));
		const { data } = await api.get(route);

		setDoctors(data);
		setIsLoadingDoctors(false);
	}

	// const userImage = userData?.patientImage;
	const userImage = 'abc';

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
					<TouchableOpacity
						onPress={() => navigation.navigate('Settings')}
					>
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
						value={searchQuery}
						onChangeText={setSearchQuery}
						onSubmitEditing={handleSearchSubmit}
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
							onSelectEspecialization={
								handleSelectEspecialization
							}
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
                                    Ainda não temos nenhum(a) Dr(a) com essa
                                    especialidade
								</EmptyDoctorsText>
							</EmptyDoctorsContainer>
						)}
					</DoctorsContainer>
				)}
			</ContentContainer>
		</Container>
	);
}

