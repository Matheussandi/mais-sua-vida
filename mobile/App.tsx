import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import { UserProvider } from './src/context/UserContext';

type RootStackParamList = {
	SignIn: undefined;
	SignUp: undefined;
	ForgotPassword: undefined;
	Main: undefined;
	Settings: undefined;
	DoctorDetails: undefined;
	Faq: undefined;
	InfoBasics: undefined;
	UpdatePassword: undefined;
};

import SplashScreen from './src/pages/SplashScreen';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import { Main } from './src/pages/Main';
import { Settings } from './src/pages/Settings';
import { DoctorDetails } from './src/pages/DoctorDetails';
import { Faq } from './src/pages/Faq';
import { InfoBasics } from './src/pages/InfoBasics';
import { ForgotPassword } from './src/pages/ForgotPassword';
import { UpdatePassword } from './src/pages/UpdatePassword';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
	const { authState } = useAuth();

	const [appLoaded, setAppLoaded] = useState(false);
	const [fontsLoaded] = useFonts({
		Inter_400: require('./src/assets/fonts/Inter-Regular.otf'),
		Inter_500: require('./src/assets/fonts/Inter-SemiBold.otf'),
		Inter_700: require('./src/assets/fonts/Inter-Bold.otf'),
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setAppLoaded(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (!appLoaded || !fontsLoaded) {
		return <SplashScreen />;
	}

	return (
		<AuthProvider>
			<UserProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="SignIn">
						<>
							<Stack.Screen
								name="Main"
								component={Main}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Settings"
								component={Settings}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="DoctorDetails"
								component={DoctorDetails}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Faq"
								component={Faq}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="InfoBasics"
								component={InfoBasics}
								options={{ headerShown: false }}
							/>

							<Stack.Screen
								name="UpdatePassword"
								component={UpdatePassword}
								options={{ headerShown: false }}
							/>

							<Stack.Screen
								name="SignIn"
								component={SignIn}
								options={{ headerShown: false }}
							/>

							<Stack.Screen
								name="SignUp"
								component={SignUp}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="ForgotPassword"
								component={ForgotPassword}
								options={{ headerShown: false }}
							/>
						</>
					</Stack.Navigator>
				</NavigationContainer>
			</UserProvider>
		</AuthProvider>
	);
}