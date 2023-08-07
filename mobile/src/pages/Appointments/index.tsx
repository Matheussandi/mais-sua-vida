import { Text, FlatList, Modal } from 'react-native';
import { useState } from 'react';
import {
	BackButton,
	CardContainer,
	Container,
	HeaderContainer,
	HeaderTitle,
	ModalBackground,
	ModalContent,
	ModalCloseButton,
	DoctorCardItemSeparator,
} from './styles';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { api } from '../../api';
import { useUserContext } from '../../context/UserContext';
import { useEffect } from 'react';
import { CardDoctor } from '../../components/CardDoctor';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

dayjs.locale(ptBr);

interface Medico {
  nome: string;
  imagem: string;
  especialidade: string;
}

interface Consulta {
  id: string;
  data: string;
  hora: string;
  local: string;
  idPaciente: string;
  idMedico: string;
  createdAt: string;
  updatedAt: string;
  medico: Medico;
}

export function Appointments() {
	const { userData } = useUserContext();
	const userId = userData?.id;
	const [consultasAgendadas, setConsultasAgendadas] = useState<Consulta[]>(
		[]
	);
	const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(
		null
	);
	const [isModalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();

	const handleCardPress = (consulta: Consulta) => {
		setSelectedConsulta(consulta);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	async function fetchAppointment(patientId: string) {
		try {
			const response = await api.get('/consultas');
			console.log(response.data);
			const filteredConsultas = response.data.filter(
				(consulta: Consulta) => consulta.idPaciente === patientId
			);
			setConsultasAgendadas(filteredConsultas);
		} catch (error) {
			console.error('Erro na consulta à API:', error);
			throw error;
		}
	}

	useEffect(() => {
		if (userId) {
			fetchAppointment(userId);
		}
	}, [userId]);

	return (
		<Container>
			{/* Cabeçalho */}
			<HeaderContainer>
				<BackButton onPress={() => navigation.goBack()}>
					<Feather name="arrow-left" size={24} color="#333" />
				</BackButton>
				<HeaderTitle>Consultas</HeaderTitle>
			</HeaderContainer>

			<CardContainer>
				{consultasAgendadas.length > 0 ? (
					<FlatList
						data={consultasAgendadas}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={() => <DoctorCardItemSeparator />}
						renderItem={({ item }) => (
							<CardDoctor
								doctor={item.medico}
								onPress={() => handleCardPress(item)}
							/>
						)}
					/>
				) : (
					<Text>Não há consultas agendadas.</Text>
				)}
			</CardContainer>

			{/* Modal para exibir os detalhes da consulta */}
			<Modal
				visible={isModalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={closeModal}
			>
				<ModalBackground>
					<ModalContent>
						<ModalCloseButton onPress={closeModal}>
							<Feather name="x" size={24} color="#000" />
						</ModalCloseButton>
						<Text>Data: {dayjs(selectedConsulta?.data).format('D/MM/YYYY')}</Text>
						<Text>Horário: {selectedConsulta?.hora}</Text>
						<Text>Local: {selectedConsulta?.local}</Text>
					</ModalContent>
				</ModalBackground>
			</Modal>
		</Container>
	);
}
