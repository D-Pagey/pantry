import styled from 'styled-components';

import { mediaQuery } from '../../tokens';
import { Button as Btn } from '../Button';
import { ExpiringPill } from '../ExpiringPill';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 2rem;
`;

export const FilterWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    @media ${mediaQuery.tablet} {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const ExpiringButton = styled(ExpiringPill)`
    align-self: flex-end;
    margin: 1rem 0 0;

    @media ${mediaQuery.tablet} {
        align-self: center;
        margin: 0;
    }
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

export const AddButton = styled(Btn)`
    align-self: flex-end;
    margin: 0 1rem 0 0;
`;
