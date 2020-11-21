import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button as Btn } from '../Button';

export const Wrapper = styled.div``;

export const RouterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export const FoodCardWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

export const Button = styled(Btn)`
    justify-self: end;
    margin: 0 1rem;
`;
