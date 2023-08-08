import styled from 'styled-components/native';
import { View } from 'react-native';

interface TabIconProps {
  focused: boolean;
}

export const TabIcon = styled(View)<TabIconProps>`
  padding: 8px;
  background-color: ${props => (props.focused ? '#0079FF' : 'transparent')};
  border-radius: 100px;
`;
