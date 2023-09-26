import {
	DoctorCard,
	DoctorDetails,
	DoctorImage,
	DoctorName,
	DoctorSpecialization,
} from './styles';

import { API_URL } from '@env';
interface DoctorCardProps {
    doctor: Doctor;
    onPress: () => void;
}

export function CardDoctor({ doctor, onPress }: DoctorCardProps) {
	return (
		<DoctorCard onPress={onPress}>
			<DoctorImage
				source={{
					uri: API_URL + '/uploads/' + doctor?.doctorImage,
				}}
			/>
			<DoctorDetails>
				<DoctorName>{doctor.nome}</DoctorName>
				<DoctorSpecialization>
					{doctor.especialidade}
				</DoctorSpecialization>
			</DoctorDetails>
		</DoctorCard>
	);
}

