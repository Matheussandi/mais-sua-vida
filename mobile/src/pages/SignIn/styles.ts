import styled from 'styled-components/native';
import { Platform, StatusBar} from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container= styled.SafeAreaView`
    flex: 1;
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0' };

`;

export const LoginBoard = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    
`;

export const Header = styled.View`
    min-height: 110px;    
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 20px;
    text-align: center;
    align-items: center;
    width: 100px;
    padding: 14px;
    flex-shrink: 0;
    border-radius: 6px;
    backgroundColor: #0079FF;
    color: #fff;
`;

export const Footer = styled.View`
    min-height: 110px;    
    align-items: center;
`;

export const Logo = styled.Image`
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
`;