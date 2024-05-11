import { FlatList } from 'react-native';

import { Doctor } from '../../../../types/Doctors';

interface DoctorProps {
	doctors: Doctor[];
}

import {
	DoctorImage,
	DoctorDetails,
	DoctorCardItemSeparator,
	DoctorCard,
	DoctorName,
	DoctorSpecialization,
	Title,
	UserIcon,
	DoctorImageCard,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

export function Doctors({ doctors }: DoctorProps) {
	const navigation = useNavigation();

	function handleOpenDoctorDetails(doctor: Doctor) {
		navigation.navigate('DoctorDetails', { doctor });
	}

	return (
		<>
			<Title>Médicos Recomendados</Title>

			<FlatList
				data={doctors}
				showsVerticalScrollIndicator={false}
				keyExtractor={(doctor) => doctor.id}
				ItemSeparatorComponent={() => <DoctorCardItemSeparator />}
				renderItem={({ item: doctor }) => (
					<DoctorCard onPress={() => handleOpenDoctorDetails(doctor)}>
						{doctor.doctorImage ? (
							<DoctorImage
								source={{
									uri: API_URL + '/uploads/' + doctor.doctorImage,
								}}
							/>
						) : (
							<DoctorImageCard>
								<UserIcon name="user" size={150} />
							</DoctorImageCard>
						)}
						<DoctorDetails>
							<DoctorName>
								Dr. {doctor.nome} {doctor.sobrenome}
							</DoctorName>
							<DoctorSpecialization>
								{doctor.especializacao?.nome}
							</DoctorSpecialization>
						</DoctorDetails>
					</DoctorCard>
				)}
			/>
		</>
	);
}

