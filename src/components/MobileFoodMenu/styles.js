import styled from 'styled-components';
import { Button as Btn } from '../Button';
import { ProfilePhoto as Photo } from '../ProfilePhoto';
import { colours, zIndex } from '../../tokens';

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

export const ModalStyles = {
    overlay: {
        zIndex: zIndex.ultimate,
        background: '#2b2b2bbd'
    },
    content: {
        inset: `90px 0 0`,
        borderRadius: '10px 10px 0 0',
        padding: '1rem'
    }
};

export const Title = styled.h2`
    font-weight: normal;
    margin: 0 0 1rem;
    text-align: center;
`;

export const Subtitle = styled.h3`
    font-weight: normal;
    margin: 0;
`;

export const OptionWrapper = styled.div`
    display: grid;
    grid-template-columns: max-content max-content max-content;
    align-items: center;
    grid-column-gap: 1rem;
    margin: 0 0 1rem;
`;

export const Button = styled(Btn)`
    background: ${({ selected }) => (selected ? colours.blue : colours.white)};
    color: ${({ selected }) => (selected ? colours.white : colours.blue)};
    border: 1px solid ${colours.blue};
`;

export const ProfilePhoto = styled(Photo)`
    border: ${({ selected }) => selected && `3px solid ${colours.darkGreen100}`};
    filter: ${({ selected }) => (selected ? 'grayscale(0)' : 'grayscale(1)')};
`;
