import { TouchableOpacity, Modal } from 'react-native';

import { useState, useEffect } from 'react';

import { useUserContext } from '../../../../context/UserContext';
import { differenceInYears } from 'date-fns';

import { Text } from '../../../Text';
import * as ImagePicker from 'expo-image-picker';

import { API_URL } from '@env';

import {
	Container,
	Photo,
	UserContent,
	UserName,
	UserDetails,
	UserItem,
	BackButton,
	ModalBackground,
	ModalContent,
	ModalCloseButton,
	Title,
	UpdateImageButton,
	UpdateImageText,
	ModalHeader,
	UserIcon,
	BackgroundIcon,
} from './styles';

import {
	Feather,
	FontAwesome5,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../../api';

interface UserData {
	nome: string;
	sobrenome: string;
	dataNascimento?: string;
	altura?: string;
	peso?: string;
}

export function Profile() {
	const { userData, updateProfileImage } = useUserContext();

	const userId = userData?.id;

	const [isModalVisible, setModalVisible] = useState(false);

	const navigation = useNavigation();

	function ageCalculation(dataNascimento: string) {
		const today = new Date();
		const birthday = new Date(dataNascimento);
		const ageGap = differenceInYears(today, birthday);

		return ageGap;
	}

	function heightConversion(height: string) {
		const heightCalc = parseInt(height) / 100;
		const convertedHeight = heightCalc.toFixed(2);

		return convertedHeight;
	}

	useEffect(() => {
		(async () => {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				alert('Permissão para acessar a galeria é necessária');
			}
		})();
	}, []);

	const handleSelectPhoto = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const pickImage = async () => {
		const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: false,
			aspect: [4, 4],
			quality: 1,
		});


		if (!canceled) {
			const filename = assets[0].uri.substring(
				assets[0].uri.lastIndexOf('/') + 1,
				assets[0].uri.length
			);

			const extend = filename.split('.')[1];

			const formData = new FormData();
			formData.append(
				'patientImage',
				JSON.parse(
					JSON.stringify({
						name: filename,
						uri: assets[0].uri,
						type: 'image/' + extend,
					})
				)
			);
			formData.append('nome', userData?.nome);
			formData.append('sobrenome', userData?.sobrenome);
			formData.append('CPF', userData?.CPF);
			formData.append('email', userData?.email);
			formData.append('senha', userData?.senha);
			formData.append('telefone', userData?.telefone);

			try {
				const response = await api
					.put(`/paciente/${userId}`, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((response) => {
						const responseData = response.data;

						setModalVisible(false);
						updateProfileImage(responseData.patientImage);
					})
					.catch((erro) => {
						console.error(erro.response.data);
					});
			} catch (error: any) {
				console.error(error);
				console.error('Resposta da API:', error.response.data);
			}
		}
	};

	return (
		<>
			<Container>
				<BackButton onPress={() => navigation.goBack()}>
					<Feather name="arrow-left" size={24} color="#FFF" />
				</BackButton>

				<UserContent>
					<TouchableOpacity onPress={handleSelectPhoto}>
						{userData?.patientImage ? (
							<Photo
								source={{
									uri: `${API_URL}/uploads/${userData?.patientImage}`,
								}}
							/>
						) : (
							<BackgroundIcon>
								<UserIcon name="user" size={60} />
							</BackgroundIcon>
						)}

					</TouchableOpacity>
					<UserName>
						{userData?.nome} {userData?.sobrenome}
					</UserName>

					<UserDetails>
						<UserItem>
							<MaterialCommunityIcons
								name="heart-pulse"
								size={32}
								color="white"
							/>
							<Text color="#fff">Idade</Text>

							{userData?.dataNascimento ? (
								<Text color="#fff" weight="500" size={18}>
									{ageCalculation(userData?.dataNascimento)}{' '}
									anos
								</Text>
							) : (
								<Text color="white">--</Text>
							)}
						</UserItem>

						<UserItem>
							<MaterialCommunityIcons
								name="human-male-height"
								size={32}
								color="white"
							/>
							<Text color="#fff">Altura</Text>

							{userData?.altura ? (
								<Text color="#fff" weight="500" size={18}>
									{heightConversion(userData?.altura)}m
								</Text>
							) : (
								<Text color="white">--</Text>
							)}
						</UserItem>

						<UserItem>
							<FontAwesome5
								name="weight"
								size={32}
								color="white"
							/>
							<Text color="#fff">Peso</Text>

							{userData?.peso ? (
								<Text color="#fff" weight="500" size={18}>
									{userData?.peso}kg
								</Text>
							) : (
								<Text color="white">--</Text>
							)}
						</UserItem>
					</UserDetails>
				</UserContent>

				<Modal
					visible={isModalVisible}
					animationType="slide"
					transparent={true}
					onRequestClose={closeModal}
				>
					<ModalBackground>
						<ModalContent>
							<ModalHeader>
								<Title>Atualizar Foto</Title>

								<ModalCloseButton onPress={closeModal}>
									<Feather name="x" size={24} color="#000" />
								</ModalCloseButton>
							</ModalHeader>

							<UpdateImageButton onPress={pickImage}>
								<UpdateImageText>
									Escolher imagem
								</UpdateImageText>
							</UpdateImageButton>
						</ModalContent>
					</ModalBackground>
				</Modal>
			</Container>
		</>
	);
}

