import { FlatList } from 'react-native';
import {  useState } from 'react';

import { Text } from '../../../Text';
import { Doctor } from '../../../../types/Doctors';

interface DoctorProps{
    doctors: Doctor[];
}

const serverUrl = process.env.SERVER;

import {
	DoctorContainer,
	DoctorImage,
	DoctorDetails,
	Separator
} from './styles';
import { DoctorModal } from '../DoctorModal';


export function Doctors({ doctors} : DoctorProps){
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedDoctor, setSelectedDoctor] = useState<null | Doctor>(null);
    
    
	function handleOpenModal(doctor: Doctor){
		setIsModalVisible(true);
		setSelectedDoctor(doctor);
	}

	return(
		<>
			<DoctorModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				doctor={selectedDoctor}
			/>

			<FlatList
				data={doctors}
				style={{ marginTop: 32}}
				contentContainerStyle={{ paddingHorizontal: 24}}
				keyExtractor={doctor => doctor.id}
				ItemSeparatorComponent={Separator}
				renderItem={({ item: doctor}) => (
                
					<DoctorContainer onPress={() => handleOpenModal(doctor)}>
						<DoctorImage
							source={{
								uri: `${serverUrl}/uploads/${doctor.doctorImage}`,
							}}
						/>
						<DoctorDetails>
							<Text weight="700">Dr. {doctor.nome} {doctor.sobrenome}</Text>
							<Text>{doctor.especializacao?.nome}</Text>
						</DoctorDetails>
					</DoctorContainer>
				)}
			/>
		</>
	);
}