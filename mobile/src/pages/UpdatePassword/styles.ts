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
export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const Logo = styled.Image`
    width: 150px;
    height: 150px;
    margin: 50px 0;
`;

export const ForgotPasswordContainer = styled.View`
    width: 80%;
    justify-content: flex-end;
    margin-top: 10px;
`;

export const ForgotPasswordLink = styled.Text`
    color: #0079ff;
`;

export const LoginButton = styled.TouchableOpacity`
    width: 80%;
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

export const CenteredView = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const SignUpText = styled.Text`
    margin-top: 20px;
    font-size: 16px;
`;

export const SignUpLink = styled.Text`
    color: #0079ff;
`;
