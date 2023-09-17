const serverURL = process.env.SERVER;

import { useUserContext } from '../../../../context/UserContext';
import { differenceInYears } from 'date-fns';

import { Text } from '../../../Text';

import DocImage from '../../../../assets/doctor.png';

import {
	Container,
	Photo,
	UserContent,
	UserName,
	UserDetails,
	UserItem,
	BackButton,
} from './styles';

import {
	Feather,
	FontAwesome5,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface UserDataProps {
    nome: string;
    sobrenome: string;
    dataNascimento?: string;
    altura?: string;
    peso?: string;
}

export function Profile() {
	const { userData } = useUserContext();

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

	return (
		<>
			<Container>
				<BackButton onPress={() => navigation.goBack()}>
					<Feather name="arrow-left" size={24} color="#FFF" />
				</BackButton>

				<UserContent>
					<Photo
						source={{
							uri: `http://192.168.1.103:3333/uploads/${userData?.patientImage}`,
						}}
					/>
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
			</Container>
		</>
	);
}

