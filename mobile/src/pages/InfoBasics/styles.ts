import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`;

export const CenteredView = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;
`;

export const LoginButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    background-color: #0079ff;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const LoginButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;