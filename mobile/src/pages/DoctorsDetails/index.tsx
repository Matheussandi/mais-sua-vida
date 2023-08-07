import { View, Text, Image } from 'react-native';
import {
	AppointmentButton,
	AppointmentButtonText,
	BackButton,
	Container,
	DoctorCard,
	DoctorContent,
	DoctorImage,
	DoctorName,
	HeaderContainer,
	HeaderTitle,
} from './styles';

import { Feather } from '@expo/vector-icons';

import docImage from '../../assets/doctor.png';
import { useNavigation } from '@react-navigation/native';

export function DoctorDetails({ route }) {
	const { doctor } = route.params;

	const navigation = useNavigation();

	return (
		<Container>
			{/* Cabeçalho */}
			<HeaderContainer>
				<BackButton onPress={() => navigation.goBack()}>
					<Feather name="arrow-left" size={24} color="#333" />
				</BackButton>
				<HeaderTitle>Médico</HeaderTitle>
			</HeaderContainer>

			<DoctorCard>
				<DoctorImage source={docImage} />
			</DoctorCard>

			<DoctorContent>
				<DoctorName>
					{doctor.nome} {doctor.sobrenome}
				</DoctorName>
				{doctor.especializacao?.nome && (
					<Text>{doctor.especializacao.nome}</Text>
				)}

				<AppointmentButton>
					<AppointmentButtonText>Agendar</AppointmentButtonText>
				</AppointmentButton>
			</DoctorContent>

		</Container>
	);
}

