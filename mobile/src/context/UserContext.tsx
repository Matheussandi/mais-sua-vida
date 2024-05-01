import axios from 'axios';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { API_URL } from '@env';

interface User {
	id: string;
	nome: string;
	sobrenome: string;
	email: string;
	patientImage?: string | null;
	CPF: string;
	senha: string;
	telefone: string;
	dataNascimento: string | null;
	altura: string | null;
	peso: string | null;
	createdAt: string;
	updatedAt: string;
}

interface UserContextData {
	userData: User | null;
	setUserData: (user: User | null) => void;
	updateProfileImage: (newImageUrl: string) => void;
}

interface UserProviderProps {
	children: ReactNode;
}

const UserContext = React.createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const { authState } = useAuth();
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		if (authState?.authenticated) {
			loadUserData();
		}
	}, [authState]);

	const loadUserData = async () => {
		try {
			const response = await axios.get(`${API_URL}/paciente/${authState?.userId}`);
			setUserData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const updateProfileImage = (newImageUrl: string) => {
		if (userData === null) {
			setUserData({ patientImage: newImageUrl } as User);
		} else {
			setUserData({ ...userData, patientImage: newImageUrl });
		}
	};

	return (
		<UserContext.Provider value={{ userData, setUserData, updateProfileImage }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);