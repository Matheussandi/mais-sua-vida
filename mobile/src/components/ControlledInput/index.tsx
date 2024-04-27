import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Input, InputProps } from '../Input';


import { ErrorText, InputWrapper } from './styles';
import { Feather } from '@expo/vector-icons';

// Define an enum for the allowed icon names
type IconNames = 'mail' | 'lock' | 'user' | 'phone' | 'calendar'

type Props = InputProps & {
	control: Control<any>;
	name: string;
	icon: IconNames;
	error?: FieldError;
	rightIcon?: React.ReactNode;
}
export function ControlledInput({ control, name, icon, error, rightIcon, ...rest }: Props) {
	return (
		<>
			<InputWrapper>
				<Feather name={icon} size={24} color="#777" />
				<Controller
					name={name}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input
							onChangeText={onChange}
							value={value}
							{...rest}
						/>
					)}
				/>
				{rightIcon}
			</InputWrapper>

			{
				error && <ErrorText>{error.message}</ErrorText>
			}

		</>
	);
}