import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h4`
    font-weight: normal;
    margin: 0 0 1.5rem;
`;

export const List = styled.ul`
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    align-items: center;
    border-bottom: 1px solid ${colours.veryLightGrey};
    display: flex;
    padding: 1rem 0;

    &:first-child {
        border-top: 1px solid ${colours.veryLightGrey};
    }
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
    border: 1px solid red;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 1rem;
`;