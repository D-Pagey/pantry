import styled from 'styled-components';
import { mediaQuery, zIndex } from '../../tokens';
import { ReactModalAdapter } from '../ReactModalAdapter';
import { Button } from '../Button';

export const ReactModal = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal'
})`
    & .Overlay {
        background: #2b2b2be8;
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: ${zIndex.ultimate};
    }
    & .Modal {
        border-radius: 10px 10px 0 0;
        background: white;
        bottom: 0;
        left: 0;
        outline: none;
        overflow: auto;
        padding: 0.75rem;
        position: fixed;
        right: 0;
        webkitoverflowscrolling: touch;
    }
    &[class*='--after-open'] {
    }
    &[class*='--before-close'] {
    }

    @media ${mediaQuery.tablet} {
        & .Modal {
            bottom: auto;
            border-radius: 10px;
            left: 50%;
            max-width: 300px;
            padding: 1rem 1.5rem 2rem;
            right: auto;
            top: 15%;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
`;

export const Grid = styled.div`
    align-self: center;
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
