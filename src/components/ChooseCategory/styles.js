import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: max-content;
`;

export const Title = styled.h3`
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    padding: 0 0 1rem;
`;

export const GreyText = styled.p`
    color: ${colours.darkGrey};
    font-style: italic;
    margin: 0;
    padding: 0 0 1rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-gap: ${({ small }) => (small ? '16px' : '24px')};
    grid-template-columns: 1fr 1fr ${({ small }) => small && '1fr'};
    width: max-content;
`;
