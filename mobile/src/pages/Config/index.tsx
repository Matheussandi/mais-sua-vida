import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../Text';

import {
	Container,
	Content,
	Divider,
	InternContent,
	InternalContent,
	OptionContainer,
	OptionText,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, TouchableOpacity } from 'react-native';

import DocImage from '../../assets/doctor.png';
import { useUserContext } from '../../context/UserContext';
import {
	EvilIcons,
	Feather,
	FontAwesome5,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
} from '@expo/vector-icons';

import { Header } from './components/Header';
import { ScrollView } from 'react-native-gesture-handler';

export function Config() {
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

	function handleDisconnect() {
		navigation.reset({
			index: 0,
			routes: [{ name: 'SignIn' }],
		});
	}

	return (
		<>
			<Container>
				<Header />

				<Content>
					<InternalContent>
						<ScrollView>
							<TouchableOpacity
								onPress={() => navigation.navigate('InfoBasics')}
							>
								<OptionContainer>
									<FontAwesome5
										name="user"
										size={24}
										color="#0079ff"
									/>
									<OptionText>Informações básicas</OptionText>
									<MaterialIcons
										name="keyboard-arrow-right"
										size={30}
										color="#0079ff"
										style={{ marginLeft: 'auto' }}
									/>
								</OptionContainer>
							</TouchableOpacity>

							<Divider />

							<TouchableOpacity
								onPress={() => navigation.navigate('Documents')}
							>
								<OptionContainer>
									<Octicons
										name="file"
										size={24}
										color="#0079ff"
									/>
									<OptionText>Documentos</OptionText>
									<MaterialIcons
										name="keyboard-arrow-right"
										size={30}
										color="#0079ff"
										style={{ marginLeft: 'auto' }}
									/>
								</OptionContainer>
							</TouchableOpacity>

							<Divider />

							<TouchableOpacity
								onPress={() => navigation.navigate('Address')}
							>
								<OptionContainer>
									<Octicons
										name="location"
										size={24}
										color="#0079ff"
									/>
									<OptionText>Endereço</OptionText>
									<MaterialIcons
										name="keyboard-arrow-right"
										size={30}
										color="#0079ff"
										style={{ marginLeft: 'auto' }}
									/>
								</OptionContainer>
							</TouchableOpacity>

							<Divider />

							<TouchableOpacity
								onPress={() => navigation.navigate('Faq')}
							>
								<OptionContainer>
									<Octicons
										name="question"
										size={24}
										color="#0079ff"
									/>
									<OptionText>Perguntas Frequentes</OptionText>
									<MaterialIcons
										name="keyboard-arrow-right"
										size={30}
										color="#0079ff"
										style={{ marginLeft: 'auto' }}
									/>
								</OptionContainer>
							</TouchableOpacity>


							<Divider />

							<TouchableOpacity onPress={handleDisconnect}>
								<OptionContainer>
									<Ionicons
										name="md-exit-outline"
										size={24}
										color="red"
									/>
									<OptionText>Sair</OptionText>
								</OptionContainer>
							</TouchableOpacity>
						</ScrollView>
					</InternalContent>
				</Content>
			</Container>
		</>
	);
}

