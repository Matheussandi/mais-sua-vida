import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import { Config } from '../Config';

import { Feather } from '@expo/vector-icons';

type AppRoutes = {
    home: undefined;
    config: undefined;
    calendar: undefined;
    file: undefined;
    heart: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function Main() {
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
				component={Config}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: () => (
						<Feather name="calendar" size={24} color="#0079FF" />
					),
				}}
			/>
			<Screen
				name="file"
				component={Config}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: () => (
						<Feather name="file" size={24} color="#0079FF" />
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
		</Navigator>
	);
}

