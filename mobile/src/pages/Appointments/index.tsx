import { Text, Modal, ScrollView } from 'react-native';
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
	Title,
	TextModal,
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

	const today = dayjs(); // Obter a data de hoje

	// Filtrar consultas passadas e futuras
	const consultasPassadas = consultasAgendadas.filter(
		(consulta) => dayjs(consulta.data).isBefore(today)
	);

	const consultasFuturas = consultasAgendadas.filter(
		(consulta) => dayjs(consulta.data).isAfter(today) || dayjs(consulta.data).isSame(today, 'day')
	);


	async function fetchAppointment(patientId: string) {
		try {
			const response = await api.get('/consultas');
			// console.log(response.data);
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
				<ScrollView showsVerticalScrollIndicator={false}>
					{consultasFuturas.length > 0 && (
						<>
							<Title>Agendadas</Title>
							{consultasFuturas.map((consulta) => (
								<CardDoctor
									key={consulta.id}
									doctor={consulta.medico}
									onPress={() => handleCardPress(consulta)}
								/>
							))}
						</>
					)}

					{consultasPassadas.length > 0 && (
						<>
							<Title>Histórico</Title>
							{consultasPassadas.map((consulta) => (
								<CardDoctor
									key={consulta.id}
									doctor={consulta.medico}
									onPress={() => handleCardPress(consulta)}
								/>
							))}
						</>
					)}

					{consultasFuturas.length === 0 && consultasPassadas.length === 0 && (
						<Text>Não há consultas agendadas.</Text>
					)}
				</ScrollView>
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
						<TextModal>Data: {dayjs(selectedConsulta?.data).format('D/MM/YYYY')}</TextModal>
						<TextModal>Horário: {selectedConsulta?.hora}</TextModal>
						<TextModal>Local: {selectedConsulta?.local}</TextModal>
					</ModalContent>
				</ModalBackground>
			</Modal>
		</Container>
	);
}
