import styled from 'styled-components';
import { Button } from '../Button';

export const ModalStyles = {
    content: {
        bottom: 'auto',
        left: '50%',
        marginRight: '-50%',
        right: 'auto',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const Grid = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
`;

export const ServingsTitles = styled.span`
    font-size: 1.25rem;
`;

export const Text = styled.span`
    color: ${({ colour }) => colour};
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0;
`;

export const DateButton = styled(Button)`
    border: 1px solid ${({ borderColour }) => borderColour};
`;
