import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';
import { api } from '../api';

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthState {
	token: string | null;
	authenticated: boolean;
	userId: string | null;
}

interface LoginResponse {
	user: User;
	token: string;
	error?: string;
}

interface RegisterData {
	nome: string;
	sobrenome: string;
	CPF: string;
	telefone: string;
	email: string;
	senha: string;
}

interface RegisterResponse extends RegisterData {
	id: string;
	patientImage: string | null;
	dataNascimento: string | null;
	altura: number | null;
	peso: number | null;
	updatedAt: string;
	createdAt: string;
}

interface AuthProps {
	authState?: AuthState;
	onRegister?: (data: RegisterData) => Promise<RegisterResponse>;
	onLogin?: (email: string, password: string) => Promise<LoginResponse>;
	onLogout?: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: false, userId: null });

	useEffect(() => {
		async function fetchAuthData() {
			try {
				const [token, userId] = await Promise.all([
					SecureStore.getItemAsync(TOKEN_KEY),
					SecureStore.getItemAsync(USER_ID_KEY),
				]);

				if (token && userId) {
					setAuthState({ token, authenticated: true, userId });
					axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
					axios.defaults.headers.common['UserId'] = userId;
				}
			} catch (e) {
				console.error('Erro ao buscar token ou userId:', e);
			}
		}

		fetchAuthData();
	}, []);

	const onRegister = async (data: RegisterData): Promise<RegisterResponse> => {
		await onLogout();

		const response = await api.post(`${API_URL}/paciente`, data);
		const { token, user } = response.data;
		const { id } = user;

		await SecureStore.setItemAsync(TOKEN_KEY, token);
		await SecureStore.setItemAsync(USER_ID_KEY, id.toString());

		setAuthState({ token, authenticated: true, userId: id });

		return response.data;
	};
	const onLogin = async (email: string, senha: string): Promise<LoginResponse> => {
		const response = await api.post('/paciente/login', { email, senha });
		const { token, user } = response.data;
		const { id } = user;

		await SecureStore.setItemAsync(TOKEN_KEY, token);
		await SecureStore.setItemAsync(USER_ID_KEY, id.toString());

		setAuthState({ token, authenticated: true, userId: id });

		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

		return response.data;
	};
	const onLogout = async (): Promise<void> => {
		await SecureStore.deleteItemAsync(TOKEN_KEY);

		setAuthState({ token: null, authenticated: false, userId: null });

		axios.defaults.headers.common['Authorization'] = '';
	};

	const value = { authState, onRegister, onLogin, onLogout };

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};