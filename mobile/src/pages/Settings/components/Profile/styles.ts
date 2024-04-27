import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

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

export const BackgroundIcon = styled.View`
    background-color: #fff;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

export const UserIcon = styled(Feather)`
    color: #0079ff;
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

export const ModalBackground = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
`;

export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ModalCloseButton = styled.TouchableOpacity``;

export const Title = styled.Text`
    color: #000;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    align-items: center;
    justify-content: center;
`;

export const UpdateImageButton = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    background-color: #0079ff;
    margin: 8px 0;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const UpdateImageText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

