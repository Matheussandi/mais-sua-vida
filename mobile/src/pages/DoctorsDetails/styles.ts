import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    background-color: #f0f0f0;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const CardContainer = styled.View`
    padding: 16px;
    margin-bottom: 150px;
`;

export const Card = styled.View`
    background-color: #f0f0f0;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
`;

export const CardTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const CardDate = styled.Text`
    font-size: 14px;
    color: #777;
`;

export const Title = styled.Text`
    color: #000;
    font-size: 16px;
    font-weight: 700;
    opacity: 0.5;
    margin-bottom: 16px;
`;

export const DoctorCard = styled.View`
    margin: 0 16px
    `;

export const DoctorImage = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: 8px;
    
`;

export const DoctorContent = styled.View`
    margin: 0 16px
`;

export const DoctorName = styled.Text`
    font-size: 18px;
    font-weight: 700;
    margin-top: 12px;
`;

export const DoctorSpecialization = styled.Text`
    font-size: 16px;
`;

export const DoctorCardItemSeparator = styled.View`
    height: 16px;
`;

export const DoctorContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
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

export const ModalCloseButton = styled.TouchableOpacity`
    align-self: flex-end;
`;

export const AppointmentButton = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    margin-top: 20px;
    background-color: #0079ff;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const AppointmentButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;