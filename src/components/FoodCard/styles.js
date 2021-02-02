import styled from 'styled-components';

import { colours, zIndex } from '../../tokens';
import { ProfilePhoto } from '../ProfilePhoto';

export const Wrapper = styled.div`
    box-shadow: ${({ isSelected }) => isSelected && '0px 4px 4px rgba(0, 0, 0, 0.25)'};
    border: 1px solid ${colours.darkGreen20};
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 1fr 1fr max-content;
    max-width: 365px;
    padding: 1rem;
    width: 100%;
    z-index: ${zIndex.default};
`;

export const Name = styled.p`
    font-size: 18px;
    grid-column: 1 / 4;
    margin: 0;
`;

export const Subtext = styled.p`
    align-self: end;
    color: ${colours.darkGrey};
    font-size: 14px;
    margin: 0;
    padding: 0 0 0.5rem;
    grid-column: 1 / 2;
`;

export const OwnerPicture = styled(ProfilePhoto)`
    align-self: center;
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    justify-self: ${({ length }) => length === 1 && 'center'};
    position: relative;
    left: ${({ index }) => `calc(${index * 30}px)`};
    z-index: ${({ index, length }) => length - index};
`;

export const CircleWrapper = styled.div`
    align-items: center;
    display: flex;
    grid-column: 1 / 2;
`;

export const DonutWrapper = styled.div`
    display: flex;
    grid-column: 3 / 4;
    grid-row: 2 / 4;
`;
