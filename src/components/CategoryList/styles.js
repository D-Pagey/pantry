import styled from 'styled-components';
import { CATEGORY_CARD_WIDTH } from '../../tokens';

export const Wrapper = styled.div`
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: ${`repeat(auto-fill, minmax(${CATEGORY_CARD_WIDTH}, 1fr))`};
    justify-items: center;
    padding: 1rem 0;
`;
