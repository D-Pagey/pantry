import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    box-shadow: ${({ isSelected }) => isSelected && '0px 4px 4px rgba(0, 0, 0, 0.25)'};
    border: 1px solid ${colours.darkGreen20};
    border-radius: 10px;
    cursor: pointer;
    display: grid;
    grid-column-gap: 2rem;
    grid-template-columns: 1fr max-content max-content;
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

export const OwnerPicture = styled.img`
    align-self: center;
    border-radius: 50%;
    grid-row: 1 / 4;
    grid-column: 2 / 3;
    width: 50px;
`;

export const CircleWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const DonutWrapper = styled.div`
    grid-column: 3 / 4;
    grid-row: 1 / 4;
    justify-self: end;
    position: relative;
    top: 4px;
`;
