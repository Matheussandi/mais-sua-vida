import React from 'react';
import { ActivityIndicator } from 'react-native';

// eslint-disable-next-line
const imagePath = require('../../assets/LogoPng.png');

import { 
	Container,
	Logo,
} from './styles';


export default function SplashScreen() {

	return (
		<Container>
			<Logo 
				source={imagePath}
			/>
			<ActivityIndicator size={60} color="blue"/>
		</Container>
	);
}