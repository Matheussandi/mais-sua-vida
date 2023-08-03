import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
    width: 100%;
    height: 200px;
    align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    margin: 24px;
`;

export const Header = styled.View``;

export const ModalBody = styled.View`
    background: #fafafa;
    flex: 1;
    padding: 32px 24px 0px;
`;

export const DescriptionContainer = styled.ScrollView`
    margin-top: 32px;
    flex: 1;
`;

export const Footer = styled.View`
    justify-content: center;
    align-items: center;
    min-height: 110px;
    background: #fff;
    padding: 16px 24px;
`;

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;    
    text-align: center;
    background-color:  #0079FF;
    width: 200px;
    padding: 14px;
    border-radius: 8px;
`;