import styled from 'styled-components';
import { Button } from '../Button';

export const List = styled.ul`
    margin: 1.5rem auto;
    padding: 0;
    list-style: none;
    width: 17rem;
`;

export const Item = styled.li`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
`;

export const Text = styled.span`
    color: ${({ colour }) => colour};
    margin: 0 0 0 1rem;
`;

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

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    align-items: center;
    background: none;
    border: 1px solid darkgrey;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 1rem;
    border-radius: 50%;
`;

export const DateButton = styled(Button)`
    border: 1px solid ${({ borderColour }) => borderColour};
`;
