import styled from 'styled-components/native';

export const InputWrapper = styled.View`
    width: 80%;
    height: 50px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    flex: 1;
    height: 100%;
    margin-left: 10px;
`;

export const ErrorText = styled.Text`
    color: red;
    width: 80%;
    margin-top: 2px;
`;