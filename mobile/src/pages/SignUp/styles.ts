import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    background-color: #f0f0f0;
`;

export const TopContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const CenteredView = styled.View`
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const InputWrapper = styled.View`
    width: 100%;
    height: 50px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    flex: 1;
    height: 100%;
    margin-left: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    margin-top: 20px;
    background-color: #0079ff;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const LoginButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;

export const SignUpText = styled.Text`
    margin-top: 20px;
    font-size: 16px;
`;

export const SignUpLink = styled.Text`
    color: #0079ff;
`;

