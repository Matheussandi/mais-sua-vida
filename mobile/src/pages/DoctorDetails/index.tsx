import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, Text, Alert } from 'react-native';
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

import docImage from '../../assets/doctor.png';

import { Header } from '../../components/Header';
import { useUserContext } from '../../context/UserContext';
import { Doctor } from '../../types/Doctors';
import { api } from '../../api';

export function DoctorDetails({ route, navigation }) {
	const { doctor } = route.params;

	const [isDateModalVisible, setDateModalVisible] = useState(false);
	const [isTimeModalVisible, setTimeModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [showButtons, setShowButtons] = useState(false); // Estado para controlar a exibição dos botões

	const { userData } = useUserContext();
	const [data, setData] = useState('');
	const [hora, setHora] = useState('');
	const [local, setLocal] = useState('Rua exemplo N278');
	const [idPaciente, setIdPaciente] = useState(userData?.id || '');
	const [idMedico, setIdMedico] = useState(doctor.id || '');

	useEffect(() => {
		setIdMedico(doctor.id);
	}, []);

	const openDateModal = () => {
		setDateModalVisible(true);
	};

	const openTimeModal = () => {
		setTimeModalVisible(true);
	};

	const handleDateConfirm = (date) => {
		setSelectedDate(date);
		setDateModalVisible(false);

		const formattedDate = date.toISOString().split('T')[0];
		setData(formattedDate);
	};

	const handleTimeConfirm = (time) => {
		setSelectedTime(time);
		setTimeModalVisible(false);

		const formattedTime = time.toLocaleTimeString();
		setHora(formattedTime);
	};

	const handleMarcarConsulta = async () => {
		try {
			if (!data || !hora || !local || !idPaciente || !idMedico) {
				Alert.alert(
					'Preencha todos os campos antes de agendar a consulta.'
				);
				return;
			}
			console.log('Data:', data);
			console.log('Hora:', hora);

			const response = await api.post('/consultas', {
				data,
				hora,
				local,
				idPaciente,
				idMedico,
			});

			if (response.status === 201) {
				console.log(response.data);
				Alert.alert('Consulta marcada com sucesso!');

				setSelectedDate(null);
				setSelectedTime(null);
				setLocal('Rua exemplo N278');
				setShowButtons(false); // Após marcar a consulta, oculta os botões
				navigation.goBack();
			} else {
				console.log(response.data);
				Alert.alert(
					'Erro ao marcar a consulta. Tente novamente mais tarde.'
				);
			}
		} catch (error) {
			console.log(error);
			Alert.alert(
				'Erro ao marcar a consulta, verifique se todos os dados estão digitados de forma correta.'
			);
		}
	};

	const handleCancelar = () => {
		setSelectedDate(null);
		setSelectedTime(null);
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
							uri: `http://192.168.1.103:3333/uploads/${doctor?.doctorImage}`,
						}}
					/>
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

					<Section>
						<SectionTitle>CRM</SectionTitle>
						<SectionContent>{doctor.CRM}</SectionContent>
					</Section>

					<Section>
						<SectionTitle>Local da Consulta</SectionTitle>
						<SectionContent>{local}</SectionContent>
					</Section>

					<View>
						{showButtons ? ( // Mostra os botões apenas quando showButtons for true
							<>
								<Text>Data: {data}</Text>
								<Text>Hora: {hora}</Text>

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
                                        Data da Consulta
									</AppointmentButtonText>
								</AppointmentButton>

								<AppointmentButton onPress={openTimeModal}>
									<AppointmentButtonText>
                                        Hora da Consulta
									</AppointmentButtonText>
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

			<DateTimePickerModal
				isVisible={isTimeModalVisible}
				mode="time"
				onConfirm={handleTimeConfirm}
				onCancel={() => setTimeModalVisible(false)}
			/>
		</Container>
	);
}

