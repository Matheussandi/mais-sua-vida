const serverURL = process.env.SERVER;

import { useUserContext } from '../../../../context/UserContext';
import { differenceInYears } from 'date-fns';

import { Text } from '../../../Text';
import Icon from 'react-native-vector-icons/FontAwesome';

import DocImage from '../../../../assets/doctor.png';

import {
	Container,
	Photo,
	DetailsContainer,
	DetailItem,
	UserContent,
	UserName,
	UserDetails,
	UserItem,
} from './styles';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export function Header() {
	const { userData } = useUserContext();

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
		<Container>
			<UserContent>
				{/* 				<Photo
					source={{
						uri: `${serverURL}/uploads/${userData?.patientImage}`
					}}
				/> */}
				<Photo source={DocImage} />
				<UserName>
					{userData?.nome} {userData?.sobrenome}
				</UserName>

				<UserDetails>
					<UserItem>
						<MaterialCommunityIcons
							name="heart-pulse"
							size={30}
							color="white"
						/>
						<Text color="#fff">Idade</Text>

						{userData?.dataNascimento ? (
							<Text color="#fff" weight="500" size={18}>
								{ageCalculation(userData?.dataNascimento)} anos
							</Text>
						) : (
							<Icon name="question" size={20} color="#fff" />
						)}
					</UserItem>

					<UserItem>
						<MaterialCommunityIcons
							name="human-male-height"
							size={30}
							color="white"
						/>
						<Text color="#fff">Altura</Text>

						{userData?.altura ? (
							<Text color="#fff" weight="500" size={18}>
								{heightConversion(userData?.altura)}m
							</Text>
						) : (
							<Icon name="question" size={20} color="#fff" />
						)}
					</UserItem>

					<UserItem>
						<FontAwesome5 name="weight" size={30} color="white" />
						<Text color="#fff">Peso</Text>

						{userData?.peso ? (
							<Text color="#fff" weight="500" size={18}>
								{userData?.peso}kg
							</Text>
						) : (
							<Icon name="question" size={20} color="#fff" />
						)}
					</UserItem>
				</UserDetails>
			</UserContent>
		</Container>
	);
}
