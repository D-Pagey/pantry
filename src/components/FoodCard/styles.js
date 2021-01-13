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
    padding: 1rem;
    width: 100%;
    z-index: ${zIndex.default};
`;

export const Name = styled.p`
    font-size: 18px;
    margin: 0;
`;

export const Subtext = styled.p`
    color: ${colours.darkGrey};
    font-size: 14px;
    margin: 0.5rem 0 1rem;
`;

export const OwnerPicture = styled(ProfilePhoto)`
    align-self: center;
    grid-row: 1 / 4;
    grid-column: 2 / 3;
    justify-self: ${({ length }) => length === 1 && 'center'};
    position: relative;
    left: ${({ index }) => `calc(${index * 30}px)`};
    z-index: ${({ index, length }) => length - index};
`;

export const CircleWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const DonutWrapper = styled.div`
    grid-column: 3 / 4;
    grid-row: 1 / 4;
    justify-self: end;
`;
