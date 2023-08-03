import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import { UserProvider } from './src/context/UserContext';

type RootStackParamList = {
    SignIn: undefined,
    SignUp: undefined,
    Main: undefined,
}


import SplashScreen from './src/pages/SplashScreen';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import { Main } from './src/pages/Main';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
	const [ appLoaded, setAppLoaded] = useState(false);
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


	if(!appLoaded || !fontsLoaded){
		return <SplashScreen/>;
	}
	
	return (
		<UserProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="SignIn">
					<Stack.Screen
						name="SignIn"
						component={SignIn}
						options={{ headerShown: false}}
					/>
					<Stack.Screen
						name="SignUp"
						component={SignUp}
						options={{ headerShown: false}}
					/>
					<Stack.Screen
						name="Main"
						component={Main}
						options={{ headerShown: false}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</UserProvider>
	);
	
}
