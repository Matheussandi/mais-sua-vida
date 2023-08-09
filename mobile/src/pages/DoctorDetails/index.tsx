import { ScrollView } from 'react-native';
import {
	AppointmentButton,
	AppointmentButtonText,
	Container,
	DoctorCard,
	DoctorContent,
	DoctorImage,
	DoctorName,
	DoctorSpecialization,
	Section,
	SectionContent,
	SectionTitle,
} from './styles';

import docImage from '../../assets/doctor.png';

import { Header } from '../../components/Header';

export function DoctorDetails({ route }) {
	const { doctor } = route.params;

	return (
		<Container>
			<Header title={'Médico'} />

			<ScrollView>
				<DoctorCard>
					<DoctorImage source={docImage} />
				</DoctorCard>

				<DoctorContent>
					<DoctorName>
						{doctor.nome} {doctor.sobrenome}
					</DoctorName>
					{doctor.especializacao?.nome && (
						<DoctorSpecialization>
							{doctor.especializacao.nome}
						</DoctorSpecialization>
					)}

					<Section>
						<SectionTitle>Sobre</SectionTitle>
						<SectionContent>{doctor.sobre}</SectionContent>
					</Section>

					<Section>
						<SectionTitle>Experiência</SectionTitle>
						<SectionContent>{doctor.experiencia}</SectionContent>
					</Section>

					<Section>
						<SectionTitle>CRM</SectionTitle>
						<SectionContent>{doctor.CRM}</SectionContent>
					</Section>

					<AppointmentButton>
						<AppointmentButtonText>Agendar</AppointmentButtonText>
					</AppointmentButton>
				</DoctorContent>
			</ScrollView>
		</Container>
	);
}

