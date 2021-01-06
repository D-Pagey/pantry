import styled from 'styled-components';

import { mediaQuery } from '../../tokens';
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

export const FoodCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    justify-items: center;

    @media ${mediaQuery.tablet} {
        justify-items: start;
        padding: 1rem 0 0;
    }
`;
