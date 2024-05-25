import React from 'react';
import { ActivityIndicator, Image } from 'react-native';

// eslint-disable-next-line
const imagePath = require('../../assets/logo.png');

import { Container } from './styles';

export default function SplashScreen() {

	return (
		<Container>
			<Image
				source={imagePath}
				width={150}
				height={150}
				style={{ marginVertical: 50 }}
			/>
			<ActivityIndicator size={60} color="#0079ff" />
		</Container>
	);
}