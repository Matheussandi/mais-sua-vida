import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    flex: 1;
    background-color: #fafafa;
`;

export const PageHeader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #0079FF;
`;

export const Photo = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #FFF;
`;

export const DetailsContainer = styled.View`
    flex-direction: row;
`;

export const DetailItem = styled.View`
    align-items: center;
    margin: 10px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background: rgba(204, 204, 204, 0.3);
    margin: 24px 0;
`;