import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    flex: 1;
    background-color: #fafafa;
`;

export const CenteredContainer = styled.SafeAreaView`
    align-items:center;
    justify-content: center;
    flex:1;
`;

export const Header = styled.View`
    flex-direction: row;
    background-color:  #0079FF;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
`;

export const Greetings = styled.View`
`;

export const UserImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #fafafa
`;

export const EspecializationsContainer = styled.View`
    height: 73px;
    margin-top: 24px;
`;

export const Especializations = styled.View``;

export const DoctorsContainer = styled.View`
    flex: 1;

`;