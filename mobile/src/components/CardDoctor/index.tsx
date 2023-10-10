import React, { useEffect, useState } from 'react';
import {
	DoctorCard,
	DoctorDetails,
	DoctorImage,
	DoctorName,
	DoctorSpecialization,
} from './styles';

import { API_URL } from '@env';

import { Text } from 'react-native';

interface Doctor {
    id: string;
    nome: string;
    especializacao: {
        id: string;
        nome: string;
    };
    doctorImage: string;
}

interface DoctorCardProps {
    doctorId: string;
    onPress: () => void;
}

export function CardDoctor({ doctorId, onPress }: DoctorCardProps) {
	const [doctorData, setDoctorData] = useState<Doctor | null>(null);

	async function getDoctorData() {
		try {
			const response = await fetch(API_URL + `/medico/${doctorId}`);
			const data = await response.json();
			setDoctorData(data);
		} catch (error) {
			console.error('Erro ao obter dados do médico: ', error);
		}
	}

	useEffect(() => {
		getDoctorData();
	}, [doctorId]);

	if (!doctorData) {
		return <Text>Carregando...</Text>;
	}

	return (
		<DoctorCard onPress={onPress}>
			<DoctorImage
				source={{
					uri: API_URL + '/uploads/' + doctorData.doctorImage,
				}}
			/>
			<DoctorDetails>
				<DoctorName>{doctorData.nome}</DoctorName>
				<DoctorSpecialization>
					{doctorData.especializacao.nome}
				</DoctorSpecialization>
			</DoctorDetails>
		</DoctorCard>
	);
}

