import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #0079ff;
`;

export const Content = styled.View`
    flex: 0.5;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
`;

export const InternalContent = styled.View`
    padding: 30px 20px;
`;

export const OptionContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const OptionText = styled.Text`
    font-size: 18px;
    margin-left: 10px;
`;

export const OptionIconBackground = styled.View`
    background-color: #0079ff;
    opacity: 0.2;
    border-radius: 30px;
    padding: 10px;
`;

export const Divider = styled.View`
    height: 1px;
    background-color: #ccc;
    margin: 15px;
`;
