import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    border: 1px solid ${colours.darkGreen20};
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: ${({ margin }) => margin};
    padding: 1rem;
    max-width: 330px;
`;

export const Name = styled.p`
    margin: 0;
    font-size: 18px;
`;

export const Date = styled.p`
    color: ${colours.grey};
    font-size: 14px;
    margin: 4px 0 8px;
`;

export const CircleWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const DaysWrapper = styled.div`
    align-items: center;
    display: flex;
    grid-column: 2 / 3;
    grid-row: 1 / 4;
    justify-content: center;
    justify-self: end;
    width: max-content;
`;

export const Days = styled.span`
    color: ${colours.darkGrey};
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    position: absolute;
`;
