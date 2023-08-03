import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import  Home  from '../Home';
import  { Config }  from '../Config';

import Icon from 'react-native-vector-icons/FontAwesome';

type AppRoutes = {
    home: undefined,
    config: undefined,
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function Main(){
	return(
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
						<Icon name="home" size={30} color="#0079FF"/>
					)
				}}
			/>
			<Screen
				name="config"
				component={Config}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: () => (
						<Icon name="cog" size={30} color="#0079FF"/>
					)
				}}
			/>
		</Navigator>
	);
}