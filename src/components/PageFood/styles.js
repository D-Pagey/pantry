import styled from 'styled-components';

import { mediaQuery } from '../../tokens';

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

export const ModifyButtonsWrapper = styled.div`
    display: flex;

    & button {
        margin: 0 1rem 0 0;
    }
`;
