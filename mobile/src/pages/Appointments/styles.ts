import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    background-color: #f0f0f0;
`;

export const CardContainer = styled.View`
    padding: 16px;
    margin-bottom: 130px;
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
    margin-bottom: 16px;
`;

export const TextModal = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
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


