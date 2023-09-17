import {
	DoctorCard,
	DoctorDetails,
	DoctorImage,
	DoctorName,
	DoctorSpecialization,
} from './styles';

interface DoctorCardProps {
    doctor: Doctor;
    onPress: () => void; // Função que será chamada quando o card do médico for pressionado
}

export function CardDoctor({ doctor, onPress }: DoctorCardProps) {
	return (
		<DoctorCard onPress={onPress}>
			<DoctorImage
				source={{
					uri: `http://192.168.1.103:3333/uploads/${doctor?.doctorImage}`,
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

