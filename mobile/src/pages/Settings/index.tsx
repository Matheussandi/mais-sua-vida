import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import {
	Container,
	Content,
	Divider,
	InternalContent,
	OptionContainer,
	OptionText,
} from './styles';

import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from '@expo/vector-icons';

import { Profile } from './components/Profile';
import { useAuth } from '../../context/AuthContext';

export function Settings() {
	const { onLogout } = useAuth();

	const navigation = useNavigation();

	function handleDisconnect() {
		if (onLogout) {
			onLogout();
			navigation.navigate('SignIn');
		}
	}

	return (
		<>
			<Container>
				<Profile />

				<Content>
					<InternalContent>
						<ScrollView>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('InfoBasics')
								}
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
								onPress={() => navigation.navigate('Faq')}
							>
								<OptionContainer>
									<Octicons
										name="question"
										size={24}
										color="#0079ff"
									/>
									<OptionText>
										Perguntas Frequentes
									</OptionText>
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

