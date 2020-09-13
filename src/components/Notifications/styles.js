import styled from 'styled-components';

import { mediaQuery, zIndex } from '../../tokens';
import { Button } from '../Button';

export const List = styled.ul`
    align-items: center;
    background-color: white;
    border: 1px solid #504e4e2b;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 2rem 1rem;
    position: absolute;
    right: -3rem;
    top: 3rem;
    width: 275px;
    z-index: ${zIndex.rise};

    @media ${mediaQuery.tablet} {
        left: -6.6rem;
    }
`;

export const Title = styled.h3`
    font-weight: normal;
    margin: 0 0 1rem;
    text-align: center;
`;

export const Item = styled.li`
    border-bottom: 1px solid #504e4e2b;
    display: grid;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content 1fr;
    padding: 1.5rem 0;
    width: 100%;
    /* https://stackoverflow.com/questions/54008865/target-first-child-css-styled-components/54009010 */
    &:nth-child(2) {
        border-top: 1px solid #504e4e2b;
    }
`;

export const Text = styled.span`
    align-self: center;
    grid-column: 1 / 3;
    justify-self: center;
    text-align: center;
`;

export const DismissButton = styled(Button)`
    grid-column: 2 / 3;
`;

export const CloseButton = styled(Button)`
    margin: 2rem 0 0;
    width: 100px;
`;
