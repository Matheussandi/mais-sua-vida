import {
	CenteredView,
	Container,
	LoginButton,
	LoginButtonText,
} from './styles';

import { ControlledInput } from '../../components/ControlledInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Header } from '../../components/Header';
import { Alert } from 'react-native';

interface FormData {
    senha: string;
    confirmarSenha: string;
}

const schema = yup
	.object({
		senha: yup.string().required('Senha inválida'),
		confirmarSenha: yup
			.string()
			.required('Senha inválida')
			.oneOf([yup.ref('senha')], 'As senhas devem ser iguais'),
	})
	.required();

export function UpdatePassword() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	async function handleUpdate() {
		Alert.alert('Senha alterada com sucesso!');
	}

	return (
		<Container>
			<Header title={'Alterar Senha'} />

			<CenteredView>
				<ControlledInput
					name="senha"
					secureTextEntry={true}
					maxLength={16}
					control={control}
					icon="lock"
					placeholder="Senha"
					error={errors.senha}
				/>

				<ControlledInput
					name="confirmarSenha"
					secureTextEntry={true}
					maxLength={16}
					control={control}
					icon="lock"
					placeholder="Repita a Senha"
					error={errors.confirmarSenha}
				/>

				<LoginButton onPress={handleSubmit(handleUpdate)}>
					<LoginButtonText>Salvar</LoginButtonText>
				</LoginButton>
			</CenteredView>
		</Container>
	);
}

