import { useNavigation } from '@react-navigation/native';
import { Text, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import {
	CardContainer,
	Container,
	ModalBackground,
	ModalContent,
	ModalCloseButton,
	Title,
	TextModal,
} from './styles';

import { Feather } from '@expo/vector-icons';

import { api } from '../../api';

import { useUserContext } from '../../context/UserContext';

import { CardDoctor } from '../../components/CardDoctor';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { Header } from '../../components/Header';

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
	const [scheduledAppointments, setScheduledAppointments] = useState<
        Consulta[]
    >([]);
	const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(
		null
	);
	const [isModalVisible, setModalVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { userData } = useUserContext();

	const userId = userData?.id;
	const navigation = useNavigation();

	const handleCardPress = (consulta: Consulta) => {
		setSelectedConsulta(consulta);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const today = dayjs();

	// Filtrar consultas passadas e futuras
	const pastAppointments = scheduledAppointments.filter((consulta) =>
		dayjs(consulta.data).isBefore(today)
	);

	const futureAppointments = scheduledAppointments.filter(
		(consulta) =>
			dayjs(consulta.data).isAfter(today) ||
            dayjs(consulta.data).isSame(today, 'day')
	);

	const fetchAppointment = async (patientId: string) => {
		try {
			const response = await api.get(`/consultas/${patientId}`);
			setScheduledAppointments(response.data);
			setError(null); // Limpar o erro se a busca for bem-sucedida
		} catch (error) {
			console.error('Erro na consulta à API:', error);
			setError('Ocorreu um erro ao buscar as consultas.'); // Definir a mensagem de erro
		}
	};

	useEffect(() => {
		if (userId) {
			fetchAppointment(userId);
		}
	}, [userId]);

	return (
		<Container>
			<Header title={'Consultas'} />

			<CardContainer>
				<ScrollView showsVerticalScrollIndicator={false}>
					{futureAppointments.length > 0 && (
						<>
							<Title>Agendadas</Title>
							{futureAppointments.map((consulta) => (
								<CardDoctor
									key={consulta.id}
									doctor={consulta.medico}
									onPress={() => handleCardPress(consulta)}
								/>
							))}
						</>
					)}

					{pastAppointments.length > 0 && (
						<>
							<Title>Histórico</Title>
							{pastAppointments.map((consulta) => (
								<CardDoctor
									key={consulta.id}
									doctor={consulta.medico}
									onPress={() => handleCardPress(consulta)}
								/>
							))}
						</>
					)}

					{futureAppointments.length === 0 &&
                        pastAppointments.length === 0 && (
						<Text>Não há consultas agendadas.</Text>
					)}
				</ScrollView>
			</CardContainer>

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
						<TextModal>
                            Data:{' '}
							{dayjs(selectedConsulta?.data).format('D/MM/YYYY')}
						</TextModal>
						<TextModal>Horário: {selectedConsulta?.hora}</TextModal>
						<TextModal>Local: {selectedConsulta?.local}</TextModal>
					</ModalContent>
				</ModalBackground>
			</Modal>
		</Container>
	);
}
