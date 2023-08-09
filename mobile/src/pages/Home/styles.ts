import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

import { Feather } from '@expo/vector-icons';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fafafa;
`;

export const CenteredContainer = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const Header = styled.View`
    flex: 0.2;
    flex-direction: row;
    background-color: #0079ff;
    padding: ${isAndroid ? `${StatusBar.currentHeight}px` : '24px'} 24px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 0 16px; /* Adiciona a margem lateral de 16 pixels */
`;

export const Greetings = styled.View`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`;

export const GreetingsText = styled.Text`
    font-size: 14px;
    font-weight: normal;
    color: #fff;
`;

export const UserName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`;

export const UserImageContainer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #fafafa;
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    align-items: center;
    justify-content: center;
`;

export const UserIcon = styled(Feather)`
    color: lightgrey;
`;

export const EspecializationsContainer = styled.View`
    margin-top: 24px;
`;

export const EspecializationsTitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
`;

export const EspecializationsList = styled.View``;

export const DoctorsContainer = styled.View`
    flex: 1;
    margin-top: 16px;
`;

export const EmptyDoctorsContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const EmptyDoctorsIcon = styled(Feather)`
    color: #0079ff;
`;

export const EmptyDoctorsText = styled.Text`
    color: #666;
    font-size: 16px;
    margin-top: 24px;
`;

