import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
	AppointmentButton,
	AppointmentButtonText,
	CardDoctorImage,
	CardDoctorView,
	Container,
	DoctorCard,
	DoctorContent,
	DoctorName,
	DoctorSpecialization,
	Section,
	SectionContent,
	SectionTitle,
	UserIcon,
} from './styles';

import { Header } from '../../components/Header';
import { useUserContext } from '../../context/UserContext';
import { api } from '../../api';

import { API_URL } from '@env';
import axios from 'axios';

export function DoctorDetails({ route, navigation }) {
	const { userData } = useUserContext();

	const { doctor } = route.params;

	const [isDateModalVisible, setDateModalVisible] = useState(false);

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [showButtons, setShowButtons] = useState(false);

	const [data, setData] = useState('');
	const [local, setLocal] = useState('Rua exemplo N278');

	const [idPaciente, setIdPaciente] = useState(userData?.id || '');
	const [idMedico, setIdMedico] = useState(doctor.id || '');
	const [dateError, setDateError] = useState(false);
	const [timeError, setTimeError] = useState(false);

	const inicioExpediente = 9 * 60;
	const fimExpediente = 16 * 60;
	const intervalo = 30;

	const calcularHorariosDisponiveis = () => {
		const horariosDisponiveis = [];

		for (
			let minutos = inicioExpediente;
			minutos < fimExpediente;
			minutos += intervalo
		) {
			const hora = Math.floor(minutos / 60);
			const minuto = minutos % 60;

			const horario = `${hora.toString().padStart(2, '0')}:${minuto
				.toString()
				.padStart(2, '0')}`;
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

	const handleDateConfirm = (date) => {
		const currentDate = new Date();

		if (
			date >= currentDate ||
			date.toDateString() === currentDate.toDateString()
		) {
			setSelectedDate(date);
			setDateError(false);
			setDateModalVisible(false);

			const formattedDate = date.toISOString().split('T')[0];
			setData(formattedDate);
		} else {
			setDateError(true);
			setDateModalVisible(false);
			Alert.alert('Selecione uma data válida.');
		}
	};

	const handleMarcarConsulta = async () => {
		try {
			if (!data || !selectedTime || !local || !idPaciente || !idMedico) {
				Alert.alert(
					'Preencha todos os campos antes de agendar a consulta.'
				);
				return;
			}

			const currentDate = new Date();
			const selectedDateTime = new Date(data + 'T' + selectedTime);

			if (selectedDateTime <= currentDate) {
				Alert.alert(
					'Não é possível marcar uma consulta neste horário.'
				);
				return;
			}

			const response = await axios.post(`${API_URL}/consultas`, {
				data,
				hora: selectedTime,
				local,
				idPaciente,
				idMedico,
			});

			if (response.status === 201) {
				Alert.alert('Consulta marcada com sucesso!');

				setAvailableTimes((prevTimes) =>
					prevTimes.filter((time) => time !== selectedTime)
				);

				setSelectedDate(null);
				setSelectedTime(null);
				setLocal('Rua exemplo N278');
				setShowButtons(false);
				navigation.goBack();
			} else {
				Alert.alert(
					'Erro ao marcar a consulta. Tente novamente mais tarde.'
				);
			}
		} catch (error) {
			Alert.alert('Horário indisponível. Por favor, selecione outro.');
		}
	};

	const handleCancelar = () => {
		setSelectedDate(null);
		setSelectedTime(null);
		setDateError(false);
		setTimeError(false);
		setShowButtons(false);
		setAvailableTimes([]);
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
					{doctor.doctorImage ? (
						<CardDoctorImage
							source={{
								uri: API_URL + '/uploads/' + doctor?.doctorImage,
							}}
						/>
					) : (
						<CardDoctorView>
							<UserIcon name="user" size={150} />
						</CardDoctorView>
					)}
				</DoctorCard>
				<DoctorContent>
					<DoctorName>
						{doctor.nome} {doctor.sobrenome}
					</DoctorName>
					{doctor.especializacao?.nome && (
						<DoctorSpecialization>
							{doctor.especializacao.nome}
						</DoctorSpecialization>
					)}
					<Section>
						<SectionTitle>Sobre</SectionTitle>
						<SectionContent>{doctor.sobre}</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Experiência</SectionTitle>
						<SectionContent>{doctor.experiencia}</SectionContent>
					</Section>
					{/* 					<Section>
						<SectionTitle>CRM</SectionTitle>
						<SectionContent>{doctor.CRM}</SectionContent>
					</Section> */}
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
						<SectionContent>9h às 16h</SectionContent>
					</Section>
					<View>
						{availableTimes.length > 0 ? (
							<View
								style={{
									flexDirection: 'row',
									flexWrap: 'wrap',
									justifyContent: 'space-around',
								}}
							>
								{availableTimes.map((item) => (
									<TouchableOpacity
										key={item}
										style={{
											width: '45%',
											margin: 5,
											borderWidth: 1.5,
											padding: 10,
											borderColor: '#0079ff',
											borderRadius: 5,
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor:
												selectedTime === item
													? '#0079ff'
													: 'transparent',
										}}
										onPress={() => setSelectedTime(item)}
									>
										<Text
											style={{
												fontWeight: 'bold',
												color:
													selectedTime === item
														? 'white'
														: 'black',
											}}
										>
											{item}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						) : (
							<Text>Selecione uma data para consulta.</Text>
						)}

						{!dateError && !timeError && showButtons ? (
							<>
								<View style={{ alignItems: 'center' }}>
									<Text
										style={{
											fontWeight: 'bold',
											fontSize: 16,
										}}
									>
										Data: {data}
									</Text>
									<Text
										style={{
											fontWeight: 'bold',
											fontSize: 16,
										}}
									>
										Hora: {selectedTime}
									</Text>
								</View>

								<AppointmentButton onPress={handleCancelar}>
									<AppointmentButtonText>
										Cancelar
									</AppointmentButtonText>
								</AppointmentButton>
								<AppointmentButton
									onPress={handleMarcarConsulta}
								>
									<AppointmentButtonText>
										Confirmar
									</AppointmentButtonText>
								</AppointmentButton>
							</>
						) : (
							<>
								<AppointmentButton onPress={openDateModal}>
									<AppointmentButtonText>
										Marcar Consulta
									</AppointmentButtonText>
								</AppointmentButton>
							</>
						)}
					</View>
				</DoctorContent>
			</ScrollView>

			<DateTimePickerModal
				isVisible={isDateModalVisible}
				mode="date"
				onConfirm={handleDateConfirm}
				onCancel={() => setDateModalVisible(false)}
			/>
		</Container>
	);
}

