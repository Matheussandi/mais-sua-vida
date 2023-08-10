import React, { useState, useEffect } from 'react';

import { useUserContext } from '../../context/UserContext';

import { ActivityIndicator, Image } from 'react-native';

import { api } from '../../api';

import DoctorImage from '../../assets/persona.jpg';

import { Doctor } from '../../types/Doctors';
import { Especialization } from '../../types/Especialization';
import { useRoute, useNavigation } from '@react-navigation/native';

const serverUrl = process.env.SERVER;

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

export default function Home() {
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [especialization, setEspecialization] = useState<Especialization[]>(
		[]
	);
	const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const { userData } = useUserContext();

	const route = useRoute();
	const navigation = useNavigation();

	useEffect(() => {
		Promise.all([api.get('/medico'), api.get('especializacao')]).then(
			([doctorResponse, especializationResponse]) => {
				setDoctors(doctorResponse.data);
				setEspecialization(especializationResponse.data);
			}
		);
	}, []);

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
						<UserName>{userData?.nome} {userData?.sobrenome}</UserName>
					</Greetings>
					<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
						{userImage ? (
							<UserImageContainer>
								{/* <Image
									source={{
										uri: `${serverUrl}/uploads/${userData?.patientImage}`,
									}}
								/> */}
								<Image
									source={DoctorImage}
									style={{ width: 60, height: 60, borderRadius: 30 }}
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
					/>
					<Feather name="search" size={24} color="#fff" />
				</SearchInputContainer>
			</Header>

			<ContentContainer>
				<EspecializationsContainer>
					<EspecializationsTitle>Especialistas</EspecializationsTitle>
					<EspecializationsList>
						{/* Render your list of specializations here */}
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
							<Doctors doctors={doctors} />
						) : (
							<EmptyDoctorsContainer>
								{/* <EmptyDoctorsIcon name="exclamation-circle" size={60} /> */}
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
