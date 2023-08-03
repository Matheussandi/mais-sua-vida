import { Modal } from 'react-native';

import { Text } from '../../../Text';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Doctor } from '../../../../types/Doctors';

interface DoctorModalProps{
    visible: boolean;
    onClose: () => void;
    doctor: null | Doctor;
}
const serverUrl = process.env.SERVER;

import { 
	Image,
	CloseButton,
	ModalBody,
	Header,
	DescriptionContainer,
	Footer,
	Button
} from './styles';


export function DoctorModal({visible, onClose, doctor}: DoctorModalProps){
	if(!doctor){
		return null;
	}

	return(
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<Image
				source={{
					uri: `${serverUrl}/uploads/${doctor.doctorImage}`
				}}
			>
				<CloseButton onPress={onClose}>
					<Icon name="close" size={20} color="#FFF"/>
				</CloseButton>

			</Image>
			<ModalBody>
				<Header>
					<Text size={24} weight="500">Dr. {doctor?.nome} {doctor?.sobrenome}</Text>
					<Text color="#666" style={{marginTop: 8}}>
						{doctor.especializacao?.nome}
					</Text>
				</Header>
				<DescriptionContainer>
					<Text weight="500" color="#666">Sobre</Text>
					<Text>{doctor.sobre}</Text>

					<Text weight="500" color="#666" style={{marginTop: 20}}>Experiência</Text>
					<Text>{doctor.experiencia}</Text>
				</DescriptionContainer>
			</ModalBody>
			<Footer>
				<Button>
					<Text color="#FFF" weight="700">Marcar Consulta</Text>
				</Button>
			</Footer>
		</Modal>
	);
}