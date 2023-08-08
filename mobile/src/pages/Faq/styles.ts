import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

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

export const QuestionContainer = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    padding: 20px;
    margin: 0 16px;
`;

export const QuestionText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #0079ff;

    margin-bottom: 10px;
`;

export const AnswerText = styled.Text`
    font-size: 14px;
    text-align: justify;
    color: #666;
`;

export const ExpandIcon = styled(Feather)`
    position: absolute;
    bottom: 10px;
    right: 20px;
`;

