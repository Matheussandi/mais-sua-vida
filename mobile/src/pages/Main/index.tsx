import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import React from 'react';

import { TabIcon } from './styles';

import { Appointments } from '../Appointments';
import { Settings } from '../Settings';
import Home from '../Home';

type AppRoutes = {
    home: undefined;
    calendar: undefined;
    settings: undefined;
};

type IconName = 'home' | 'calendar' | 'settings';

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function Main() {
	return (
		<Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
					let iconName: IconName = 'home'; // Default to 'home'

					if (route.name === 'home') {
						iconName = 'home';
					} else if (route.name === 'calendar') {
						iconName = 'calendar';
					} else if (route.name === 'settings') {
						iconName = 'settings';
					}

					return (
						<TabIcon focused={focused}>
							<Feather
								name={iconName}
								size={24}
								color={focused ? '#FFFFFF' : color}
							/>
						</TabIcon>
					);
				},
				tabBarLabelStyle: { display: 'none' },
				tabBarStyle: {
					height: 60,
				},
				tabBarActiveTintColor: '#0079FF',
				tabBarInactiveTintColor: '#969CB2',
			})}
		>
			<Screen
				name="home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Screen
				name="calendar"
				component={Appointments}
				options={{ headerShown: false }}
			/>
			<Screen
				name="settings"
				component={Settings}
				options={{ headerShown: false }}
			/>
		</Navigator>
	);
}