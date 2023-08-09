import styled from 'styled-components/native';

export const Container = styled.View`
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