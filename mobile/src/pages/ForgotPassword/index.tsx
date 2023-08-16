import { CenteredView, Container, LoginButton, LoginButtonText } from './styles';
import { ControlledInput } from '../../components/ControlledInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Header } from '../../components/Header';
import { Alert } from 'react-native';

interface FormData {
    email: string;
}

const schema = yup
	.object({
		email: yup.string().email('Email inválido').required('Email inválido'),
	})
	.required();

export function ForgotPassword() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleSendEmail() {
		Alert.alert('Email enviado com sucesso!');
	}

	return (
		<Container>
			<Header title={'Recuperar Senha'}/>

			<CenteredView>
				<ControlledInput
					name="email"
					maxLength={25}
					control={control}
					icon="mail"
					placeholder="E-mail"
					error={errors.email}
					autoCapitalize="none"
				/>

				<LoginButton onPress={handleSubmit(handleSendEmail)}>
					<LoginButtonText>Enviar Link de Recuperação</LoginButtonText>
				</LoginButton>
			</CenteredView>
		</Container>
	);
}
