import styled from 'styled-components';
import Select from 'react-select';

import { colours, mediaQuery, zIndex } from '../../tokens';
import { ReactModalAdapter } from '../ReactModalAdapter';
import { Button as Btn } from '../Button';
import { ProfilePhoto as Photo } from '../ProfilePhoto';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 5rem;
`;

export const FoodCardGrid = styled.div`
    align-self: center;
    box-sizing: border-box;
    display: grid;
    grid-row-gap: 1rem;
    padding: 0;
    margin: 0 0 1rem;
    max-width: 330px;
    width: 100%;

    @media ${mediaQuery.tablet} {
        grid-template-columns: repeat(auto-fill, minmax(280px, 320px));
        grid-column-gap: 1rem;
        padding: 1rem 0 0;
        max-width: none;
    }
`;

export const TopButtonsWrapper = styled.div`
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    margin: 0 0 1rem;
`;

export const FilterButtonsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

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
            max-width: 500px;
            padding: 1rem 1.5rem 2rem;
            right: auto;
            top: 15%;
            left: 50%;
            transform: translate(-50%, 0);
        }
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
    margin: ${({ margin }) => margin};
`;

export const Button = styled(Btn)`
    background: ${({ selected }) => (selected ? colours.blue : colours.white)};
    color: ${({ selected }) => (selected ? colours.white : colours.blue)};
    border: 1px solid ${colours.blue};
    padding: 1rem 0.5rem;
`;

export const ReactSelect = styled(Select)`
    margin: 0 0 1rem;
`;
