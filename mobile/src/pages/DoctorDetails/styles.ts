import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    background-color: #f0f0f0;
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
    margin: 0 16px;
`;

export const CardDoctorImage = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    box-shadow: 0px 2px 3.84px rgba(0, 0, 0, 0.25);
    elevation: 5;
`;

export const CardDoctorView = styled.View`
    width: 100%;
    height: 200px;
    border-radius: 8px;
    background-color: #f0f0f0;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    box-shadow: 0px 2px 3.84px rgba(0, 0, 0, 0.25);
    elevation: 5;
`;

export const UserIcon = styled(Feather)`
    color: #0079ff;
`;

export const DoctorContent = styled.View`
    margin: 0 16px 80px 16px;
`;

export const DoctorName = styled.Text`
    font-size: 18px;
    font-weight: 700;
    margin-top: 12px;
`;

export const DoctorSpecialization = styled.Text`
    font-size: 16px;
    color: #666;
`;

export const DoctorCardItemSeparator = styled.View`
    height: 16px;
`;

export const DoctorContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const Section = styled.View`
    margin: 10px 0;
`;

export const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const SectionContent = styled.Text`
    font-size: 16px;
    text-align: justify;
    color: #666;
`;

export const AppointmentButton = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    background-color: #0079ff;
    margin: 8px 0;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const AppointmentButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

