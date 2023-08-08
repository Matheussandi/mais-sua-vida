import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Appointments } from '../Appointments';
import { TabIcon } from './styles'; // Import the TabIcon styled component

import Home from '../Home';
import { Config } from '../Config';

type AppRoutes = {
    home: undefined;
    config: undefined;
    calendar: undefined;
    settings: undefined;
    heart: undefined;
};

type IconName = 'home' | 'calendar' | 'heart' | 'settings';

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
					} else if (route.name === 'heart') {
						iconName = 'heart';
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
				name="heart"
				component={Config}
				options={{ headerShown: false }}
			/>
			<Screen
				name="settings"
				component={Config}
				options={{ headerShown: false }}
			/>
		</Navigator>
	);
}

