import { Card, CardDate, CardTitle, DoctorCard, DoctorDetails, DoctorImage, DoctorName, DoctorSpecialization } from './styles';

interface DoctorCardProps {
	doctor: Doctor;
	onPress: () => void; // Função que será chamada quando o card do médico for pressionado
  }

import docImage from '../../assets/doctor.png';

export function CardDoctor({doctor, onPress}: DoctorCardProps) {
	return (
		<DoctorCard onPress={onPress}>
			<DoctorImage source={docImage} />
			<DoctorDetails>
				<DoctorName>{doctor.nome}</DoctorName>
				<DoctorSpecialization>{doctor.especialidade}</DoctorSpecialization>
			</DoctorDetails>
		</DoctorCard>
	);
}
  