import styled, { keyframes } from 'styled-components';
import { colours } from '../../tokens';

export const Button = styled.button.attrs(({ type }) => ({
    type: type || 'button'
}))`
    background-color: ${colours.darkGreen100};
    border: 0;
    border-radius: 5px;
    color: ${colours.white};
    cursor: pointer;
    padding: 1rem;
    margin: ${({ margin }) => margin};
    min-width: 68px;
    width: ${({ size }) => size === 'sm' && 'max-content'};
`;

export const SecondaryButton = styled(Button)`
    background-color: ${colours.white};
    border: 1px solid ${colours.darkGreen100};
    color: ${colours.darkGreen100};
    margin: ${({ margin }) => margin};
`;

export const DisabledButton = styled(Button)`
    background-color: ${colours.grey};
    color: ${colours.white};
    cursor: not-allowed;
    margin: ${({ margin }) => margin};
`;

export const DestructiveButton = styled(Button)`
    background-color: ${colours.red};
`;

const ellipsis = keyframes`
  to {
      width: 1.25rem;    
    }
`;

export const LoadingButton = styled(Button)`
    background-color: ${colours.lightGreen};
    cursor: wait;
    padding: 1rem 2rem 1rem 1rem;

    &:after {
        animation: ${ellipsis} steps(4, end) 1000ms infinite;
        content: '...';
        display: inline-block;
        position: absolute;
        overflow: hidden;
        vertical-align: bottom;
        width: 0px;
    }
`;
