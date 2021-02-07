import styled from 'styled-components';
import { colours, zIndex } from '../../tokens';
import { ReactModalAdapter } from '../ReactModalAdapter';
import { Button as Btn } from '../Button';
import { ProfilePhoto as Photo } from '../ProfilePhoto';

export const ReactModal = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal'
})`
    & .Overlay {
        background: #2b2b2bbd;
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
        webkitoverflowscrolling: touch;
        padding: 0.75rem;
        position: fixed;
        right: 0;
    }
    &[class*='--after-open'] {
    }
    &[class*='--before-close'] {
    }
`;

export const Title = styled.h2`
    font-weight: normal;
    margin: 0 0 1rem;
    text-align: center;
`;

export const Subtitle = styled.h3`
    font-weight: normal;
    margin: 0 0 0.5rem;
`;

export const PhotoWrapper = styled.div`
    align-items: center;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(70px, 1fr));
    margin: 0 0 1rem;
`;

export const ProfilePhoto = styled(Photo)`
    border: ${({ selected }) => selected && `3px solid ${colours.darkGreen100}`};
    filter: ${({ selected }) => (selected ? 'grayscale(0)' : 'grayscale(1)')};
`;

export const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    margin: 0 0 1rem;
    margin: ${(props) => props.margin};
`;

export const Button = styled(Btn)`
    background: ${({ selected }) => (selected ? colours.blue : colours.white)};
    color: ${({ selected }) => (selected ? colours.white : colours.blue)};
    border: 1px solid ${colours.blue};
    padding: 1rem 0.5rem;
`;

export const Wrapper = styled.div`
    align-items: center;
    background-color: ${colours.white};
    border-top: 1px solid ${colours.silver};
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    left: 0;
    padding: 1rem;
    position: fixed;
    right: 0;
    z-index: ${zIndex.default};
`;

export const FilterButton = styled.button.attrs(() => ({
    type: 'button'
}))`
    border: none;
    cursor: pointer;
    display: flex;
    padding: 0;
    margin: 0 1rem 0 0;
    width: 50px;
`;

export const FilterImage = styled.img`
    width: 100%;
`;
