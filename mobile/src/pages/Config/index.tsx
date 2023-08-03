import { StackActions } from '@react-navigation/native';
import { useNavigation  } from '@react-navigation/native';

import { Text } from '../Text';
import { Header } from './components/Header';

import {
	ConfigBody,
	ConfigItems,
	Button
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Config(){

	const navigation = useNavigation();

	function handleDisconnect(){
		navigation.reset({
			index:0,
			routes: [{ name: 'SignIn'}],
		});
	}

	return (
		<>
			<Header/>
			<ConfigBody>
				<ConfigItems>
					<Button>
						<Icon name="user" size={20} color="#000" />
						<Text weight="700" style={{marginLeft: 10}}>Informações Basicas</Text>
					</Button>
				</ConfigItems>
				<ConfigItems>
					<Button onPress={handleDisconnect}>
						<Icon name="warning" color="red" size={20}></Icon>
						<Text weight="700" color="red" style={{marginLeft: 10}}>Sair</Text>
					</Button>
				</ConfigItems>
			</ConfigBody>
		</>
	);
}