import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


import {
	AppointmentButton,
	AppointmentButtonText,
	Container,
	DoctorCard,
	DoctorContent,
	DoctorImage,
	DoctorName,
	DoctorSpecialization,
	Section,
	SectionContent,
	SectionTitle,
} from './styles';

import { Header } from '../../components/Header';
import { useUserContext } from '../../context/UserContext';
import { api } from '../../api';

import { API_URL } from '@env';

export function DoctorDetails({ route, navigation }) {
	const { doctor } = route.params;

	const [isDateModalVisible, setDateModalVisible] = useState(false);
	const [isTimeModalVisible, setTimeModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [showButtons, setShowButtons] = useState(false);
	const { userData } = useUserContext();
	const [data, setData] = useState('');
	const [local, setLocal] = useState('Rua exemplo N278');
	const [idPaciente, setIdPaciente] = useState(userData?.id || '');
	const [idMedico, setIdMedico] = useState(doctor.id || '');
	const [dateError, setDateError] = useState(false);
	const [timeError, setTimeError] = useState(false);
	const [horariosSelecionados, setHorariosSelecionados] = useState([]);

	// Novos limites de horário
	const inicioExpediente = 9 * 60; // 9:00 em minutos
	const fimExpediente = 16 * 60;   // 16:00 em minutos
	const intervalo = 30;            // Intervalo de 30 minutos

	// Função para calcular os horários disponíveis
	const calcularHorariosDisponiveis = () => {
		const horariosDisponiveis = [];

		for (let minutos = inicioExpediente; minutos < fimExpediente; minutos += intervalo) {
			const hora = Math.floor(minutos / 60);
			const minuto = minutos % 60;
			const horario = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
			horariosDisponiveis.push(horario);
		}

		return horariosDisponiveis;
	};

	const [availableTimes, setAvailableTimes] = useState([]);

	useEffect(() => {
		if (selectedDate) {
			const horariosDisponiveis = calcularHorariosDisponiveis();
			setAvailableTimes(horariosDisponiveis);
		}
	}, [selectedDate]);

	const openDateModal = () => {
		setDateModalVisible(true);
	};

	const openTimeModal = () => {
		setTimeModalVisible(true);
	};

	const handleDateConfirm = (date) => {
		const selectedDayOfWeek = date.getDay();
		const currentDate = new Date();

		if (selectedDayOfWeek >= 1 && selectedDayOfWeek <= 6) {
			// Verificar se a data selecionada é maior ou igual à data atual
			if (date >= currentDate) {
				setSelectedDate(date);
				setDateError(false);
				setDateModalVisible(false);

				const formattedDate = date.toISOString().split('T')[0];
				setData(formattedDate);
			} else {
				setDateError(true);
				setDateModalVisible(false);
				Alert.alert('Selecione uma data igual ou posterior à data atual.');
			}
		} else {
			setDateError(true);
			setDateModalVisible(false);
			Alert.alert('Selecione uma data de segunda-feira a sábado.');
		}
	};

	const handleTimeConfirm = (time) => {
		const formattedTime = time.toLocaleTimeString();
		setSelectedTime(formattedTime);
		setTimeError(false);
		setTimeModalVisible(false);
	};

	const handleMarcarConsulta = async () => {
		try {
			if (!data || !selectedTime || !local || !idPaciente || !idMedico) {
				Alert.alert('Preencha todos os campos antes de agendar a consulta.');
				return;
			}

			// Verifique se o horário já foi selecionado por outro usuário
			if (horariosSelecionados.includes(selectedTime)) {
				Alert.alert('Este horário já foi selecionado por outro usuário. Por favor, escolha outro horário.');
				return;
			}

			const response = await api.post('/consultas', {
				data,
				hora: selectedTime,
				local,
				idPaciente,
				idMedico,
			});

			if (response.status === 201) {
				Alert.alert('Consulta marcada com sucesso!');

				// Remova o horário selecionado da lista de horários disponíveis
				setAvailableTimes((prevTimes) => prevTimes.filter((time) => time !== selectedTime));

				// Adicione o horário à lista de horários selecionados
				setHorariosSelecionados((prevHorarios) => [...prevHorarios, selectedTime]);

				setSelectedDate(null);
				setSelectedTime(null);
				setLocal('Rua exemplo N278');
				setShowButtons(false);
				navigation.goBack();
			} else {
				Alert.alert('Erro ao marcar a consulta. Tente novamente mais tarde.');
			}
		} catch (error) {
			Alert.alert('Erro ao marcar consulta. Já existe uma consulta marcada neste horário.');
		}
	};

	const handleCancelar = () => {
		setSelectedDate(null);
		setSelectedTime(null);
		setDateError(false);
		setTimeError(false);
		setShowButtons(false);
	};

	useEffect(() => {
		if (selectedDate && selectedTime) {
			setShowButtons(true);
		}
	}, [selectedDate, selectedTime]);

	return (
		<Container>
			<Header title={'Médico'} />
			<ScrollView>
				<DoctorCard>
					<DoctorImage
						source={{
							uri: API_URL + '/uploads/' + doctor?.doctorImage,
						}}
					/>
				</DoctorCard>
				<DoctorContent>
					<DoctorName>
						{doctor.nome} {doctor.sobrenome}
					</DoctorName>
					{doctor.especializacao?.nome && (
						<DoctorSpecialization>{doctor.especializacao.nome}</DoctorSpecialization>
					)}
					<Section>
						<SectionTitle>Sobre</SectionTitle>
						<SectionContent>{doctor.sobre}</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Experiência</SectionTitle>
						<SectionContent>{doctor.experiencia}</SectionContent>
					</Section>
					<Section>
						<SectionTitle>CRM</SectionTitle>
						<SectionContent>{doctor.CRM}</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Local da Consulta</SectionTitle>
						<SectionContent>{local}</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Dias de Atendimento</SectionTitle>
						<SectionContent>Segunda a Sábado</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Horários de Atendimento</SectionTitle>
						<SectionContent>9h as 16h</SectionContent>
					</Section>
					<View>
						{availableTimes.length > 0 ? (
							availableTimes.map((horario) => (
								<TouchableOpacity key={horario} onPress={() => setSelectedTime(horario)}>
									<Text>{horario}</Text>
								</TouchableOpacity>
							))
						) : (
							<Text>Nenhum horário disponível para a data selecionada.</Text>
						)}

						{!dateError && !timeError && showButtons ? (
							<>
								<Text>Data: {data}</Text>
								<Text>Hora: {selectedTime}</Text>
								<AppointmentButton onPress={handleMarcarConsulta}>
									<AppointmentButtonText>Confirmar</AppointmentButtonText>
								</AppointmentButton>
								<AppointmentButton onPress={handleCancelar}>
									<AppointmentButtonText>Cancelar</AppointmentButtonText>
								</AppointmentButton>
							</>
						) : (
							<>
								<AppointmentButton onPress={openDateModal}>
									<AppointmentButtonText>Data da Consulta</AppointmentButtonText>
								</AppointmentButton>

							</>
						)}
					</View>
				</DoctorContent>
			</ScrollView>
			{selectedDate && (
				<View>
					<Text>Data selecionada: {data}</Text>
				</View>
			)}
			<DateTimePickerModal
				isVisible={isDateModalVisible}
				mode="date"
				onConfirm={handleDateConfirm}
				onCancel={() => setDateModalVisible(false)}
			/>
		</Container>
	);
}