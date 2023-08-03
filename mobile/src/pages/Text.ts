import styled from 'styled-components/native';

interface TextProps {
  weight?: '400' | '500' | '700';
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<TextProps>`
    font-family: ${({ weight }: TextProps) => weight ? `Inter_${weight}` : 'Inter_400'};
    color: ${({ color }: TextProps) => color || '#333'};
    font-size: ${({ size }: TextProps) => size ? `${size}px` : '16px'};
    opacity: ${({ opacity }: TextProps) => opacity || 1};
`;
