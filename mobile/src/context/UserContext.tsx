import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
	userData: null,
	setUserData: (data) => {},
	updateProfileImage: (newImageUrl) => {},
});

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

	const updateProfileImage = (newImageUrl: string) => {
		if (userData === null) {
			// Se userData for null, crie um novo objeto com a propriedade patientImage.
			setUserData({ patientImage: newImageUrl });
		} else {
			// Se userData já contém dados, atualize a propriedade patientImage.
			setUserData({ ...userData, patientImage: newImageUrl });
		}
	};

	return(
		<UserContext.Provider value={{ userData, setUserData, updateProfileImage}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);