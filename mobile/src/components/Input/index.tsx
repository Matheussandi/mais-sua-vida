import React from 'react';
import { TextInputProps } from 'react-native';
import { InputText } from './styles';

export type InputProps = TextInputProps & {
    value?: string;
};

export function Input({ value, ...rest }: InputProps) {
	return <InputText value={value} placeholderTextColor="#7A7A80" {...rest} />;
}
