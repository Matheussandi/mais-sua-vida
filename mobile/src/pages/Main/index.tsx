import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import { Config } from '../Config';

import { useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { Appointments } from '../Appointments';
import { useUserContext } from '../../context/UserContext';

type AppRoutes = {
    home: undefined;
    config: undefined;
    calendar: undefined;
    settings: undefined;
    heart: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function Main() {
	const route = useRoute();
	const { userData } = useUserContext();
	const userId = route.params?.userId;

	// console.log('ID do usuário logado:', userId);
  

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarLabelPosition: 'below-icon',
				tabBarActiveTintColor: '#0079FF',
				tabBarInactiveTintColor: '#969CB2',
				tabBarStyle: {
					height: 60,
				},
			}}
		>
			<Screen
				name="home"
				component={Home}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: () => (
						<Feather name="home" size={24} color="#0079FF" />
					),
				}}
			/>

			<Screen
				name="calendar"
				component={Appointments}
				options={{
					tabBarLabel: 'Appointments',
					tabBarIcon: () => (
						<Feather name="calendar" size={24} color="#0079FF" />
					),
				}}
			/>
			<Screen
				name="heart"
				component={Config}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: () => (
						<Feather name="heart" size={24} color="#0079FF" />
					),
				}}
			/>
			<Screen
				name="settings"
				component={Config}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: () => (
						<Feather name="settings" size={24} color="#0079FF" />
					),
				}}
			/>
		</Navigator>
	);
}

