import styled from 'styled-components';

import { colours } from '../../tokens';
import { ProfilePhoto } from '../ProfilePhoto';

export const Wrapper = styled.div`
    box-shadow: ${({ isSelected }) => isSelected && '0px 4px 4px rgba(0, 0, 0, 0.25)'};
    border: 1px solid ${colours.darkGreen20};
    border-radius: 10px;
    cursor: pointer;
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 1fr 1fr max-content;
    margin: ${({ margin }) => margin};
    max-width: 330px;
    min-width: 220px;
    padding: 1rem;
    width: 280px;
`;

export const Name = styled.p`
    font-size: 18px;
    margin: 0;
`;

export const Date = styled.p`
    color: ${colours.grey};
    font-size: 14px;
    margin: 4px 0 8px;
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
