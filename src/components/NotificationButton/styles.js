import styled from 'styled-components';
import { colours } from '../../tokens';

export const AcceptButton = styled.button.attrs(({ type }) => ({
    type: type || 'button'
}))`
    align-items: center;
    background-color: ${colours.darkGreen100};
    border: 1px solid ${colours.darkGreen100};
    border-radius: 5px;
    color: ${colours.white};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0;
    height: 32px;
    width: 32px;
`;

export const DismissButton = styled(AcceptButton)`
    background-color: ${colours.white};
    border: 1px solid ${colours.darkGreen100};
    color: ${colours.darkGreen100};
`;

export const DisabledButton = styled(AcceptButton)`
    background-color: ${colours.grey};
    border: 1px solid ${colours.grey};
    cursor: not-allowed;
`;
