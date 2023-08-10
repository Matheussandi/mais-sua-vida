import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
    flex: 0.5;
`;

export const BackButton = styled.TouchableOpacity`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    padding: 20px 0;
    left: 20px;
`;

export const UserContent = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const UserName = styled.Text`
    color: #fff;
    margin: 20px 0;
    font-size: 20px;
    font-weight: 600;
`;

export const Photo = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #fff;
`;

export const UserDetails = styled.View`
    flex-direction: row;
`;

export const UserItem = styled.View`
    align-items: center;
    margin: 10px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background: rgba(204, 204, 204, 0.3);
    margin: 24px 0;
`;
