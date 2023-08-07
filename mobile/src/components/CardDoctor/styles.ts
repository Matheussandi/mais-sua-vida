
import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

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

export const DoctorCard = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 8px;
`;

export const DoctorImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  
`;

export const DoctorDetails = styled.View`
  margin: 12px 0 12px 8px;
`;

export const DoctorName = styled.Text`
  font-size: 18px;
  font-weight: 700;
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

