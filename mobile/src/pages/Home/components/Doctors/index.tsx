import { FlatList, Image } from 'react-native';
import { useState } from 'react';

import { Text } from '../../../Text';
import { Doctor } from '../../../../types/Doctors';

import docImage from '../../../../assets/doctor.png';

interface DoctorProps {
    doctors: Doctor[];
}

const serverUrl = process.env.SERVER;

import {
	DoctorContainer,
	DoctorImage,
	DoctorDetails,
	Separator,
	DoctorCardItemSeparator,
	DoctorCard,
	DoctorName,
	DoctorSpecialization,
	Title,
} from './styles';
import { DoctorModal } from '../DoctorModal';

export function Doctors({ doctors }: DoctorProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedDoctor, setSelectedDoctor] = useState<null | Doctor>(null);

	function handleOpenModal(doctor: Doctor) {
		setIsModalVisible(true);
		setSelectedDoctor(doctor);
	}

	return (
		<>
			<DoctorModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				doctor={selectedDoctor}
			/>

			<Title>Médicos Recomendados</Title>

			<FlatList
				data={doctors}
				showsVerticalScrollIndicator={false}
				keyExtractor={(doctor) => doctor.id}
				ItemSeparatorComponent={() => <DoctorCardItemSeparator />}
				renderItem={({ item: doctor }) => (
					<DoctorCard onPress={() => handleOpenModal(doctor)}>
						<DoctorImage source={docImage} />
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

