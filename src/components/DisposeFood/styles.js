import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    background-color: ${colours.white};
    border-top: 1px solid ${colours.grey};
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    left: 0;
    padding: 1.5rem 0;
    position: fixed;
    right: 0;
`;
