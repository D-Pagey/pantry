import styled from 'styled-components';
import { colours, zIndex } from '../../tokens';

export const Wrapper = styled.div`
    background-color: ${colours.white};
    border-top: 1px solid ${colours.grey};
    bottom: 0;
    left: 0;
    padding: 1.5rem;
    position: fixed;
    right: 0;
    z-index: ${zIndex.rise};
`;

export const InnerWrapper = styled.div`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 1fr max-content max-content;
    margin: 0 auto;
    width: 18rem;
`;

export const Text = styled.p`
    font-size: 1.35rem;
`;
