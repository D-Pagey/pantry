import styled from 'styled-components';

import { colours, mediaQuery } from '../../tokens';
import { Button as Btn } from '../Button';
import { ExpiringPill } from '../ExpiringPill';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 2rem;
`;

export const AddButton = styled(Btn)`
    align-self: flex-end;
    margin: 0 1rem 0 0;
    border: 2px solid ${colours.darkGreen100};

    @media ${mediaQuery.tablet} {
        margin: 0;
    }
`;

export const FilterWrapper = styled.div`
    display: grid;
    gap: 2rem 1rem;
    padding: 1rem;
    grid-template-columns: 1fr 1fr;

    @media ${mediaQuery.tablet} {
        padding: 1rem 0;
        gap: 0 2rem;
        grid-template-columns: 1fr max-content max-content;
    }
`;

export const TopAddButton = styled(AddButton)`
    justify-self: end;
    margin: 0;
`;

export const ExpiringButton = styled(ExpiringPill)`
    align-items: center;
    display: flex;
    padding: 0.5rem;
    justify-self: start;
`;

export const SortButton = styled(Btn)`
    background-color: ${colours.blue};
    border: 2px solid ${colours.blue};
`;

export const FoodCardGrid = styled.div`
    align-self: center;
    box-sizing: border-box;
    display: grid;
    grid-row-gap: 1rem;
    padding: 0.5rem;
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
