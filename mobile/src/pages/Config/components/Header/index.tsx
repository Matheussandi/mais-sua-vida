const serverURL = process.env.SERVER;

import { useUserContext } from '../../../../context/UserContext';
import { differenceInYears } from 'date-fns';

import { Text } from '../../../Text';
import Icon from 'react-native-vector-icons/FontAwesome';

import { 
	Container,
	PageHeader,
	Photo,
	DetailsContainer,
	DetailItem
} from './styles';


export function Header(){
	const { userData } = useUserContext();

	function ageCalculation(dataNascimento: string){
		const today = new Date();
		const birthday = new Date(dataNascimento);
		const ageGap = differenceInYears(today, birthday);

		return ageGap;
	}

	function heightConversion(height: string){
		
		const heightCalc = (parseInt(height)) / 100;
		const convertedHeight = heightCalc.toFixed(2);
        
		return convertedHeight;
	}


	return(
		<Container>
			<PageHeader>
				<Photo
					source={{
						uri: `${serverURL}/uploads/${userData?.patientImage}`
					}}
				/>
				<Text weight="500" color="#fff" style={{marginTop: 10, marginBottom: 30}}>{userData?.nome} {userData?.sobrenome}</Text>
				<DetailsContainer>
					<DetailItem>
						<Icon name="heartbeat" size={30} color="#fff"/>
						<Text color="#fff">Idade</Text>
                        
						{userData?.dataNascimento ?(
							<Text  color="#fff" weight="500" size={18}>{ageCalculation(userData?.dataNascimento)} anos</Text>

						): (
							<Icon name="question" size={20} color="#fff"/>
						)}
					</DetailItem>
					
					<DetailItem>
						<Icon name="arrows-v" size={30} color="#fff"/>
						<Text color="#fff">Altura</Text>
						
						{userData?.altura ?(
							<Text  color="#fff" weight="500" size={18}>{heightConversion(userData?.altura)}m</Text>

						): (
							<Icon name="question" size={20} color="#fff"/>
						)}
						
					</DetailItem>
					
					<DetailItem>
						<Icon name="info-circle" size={30} color="#fff"/>
						<Text color="#fff">Peso</Text>
						
						{userData?.peso ?(
							<Text  color="#fff" weight="500" size={18}>{userData?.peso}kg</Text>

						): (
							<Icon name="question" size={20} color="#fff"/>
						)}
						
					</DetailItem>
				</DetailsContainer>
			</PageHeader>

		</Container>
	);
}