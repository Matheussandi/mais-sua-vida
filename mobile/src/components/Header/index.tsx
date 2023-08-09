import { Feather } from '@expo/vector-icons';
import { BackButton, Container, Title } from './styles';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
	const navigation = useNavigation();

	return (
		<Container>
			<BackButton onPress={() => navigation.goBack()}>
				<Feather name="arrow-left" size={24} color="#333" />
			</BackButton>
			<Title>{title}</Title>
		</Container>
	);
}