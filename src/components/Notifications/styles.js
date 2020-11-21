import styled from 'styled-components';

import { mediaQuery, zIndex } from '../../tokens';
import { NotificationButton as AcceptButton } from '../NotificationButton';
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
    padding: 1.5rem;
    position: absolute;
    right: -3rem;
    top: 3rem;
    width: 300px;
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
    align-items: center;
    border-bottom: 1px solid #504e4e2b;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    width: 100%;
    /* https://stackoverflow.com/questions/54008865/target-first-child-css-styled-components/54009010 */
    &:nth-child(2) {
        border-top: 1px solid #504e4e2b;
    }
`;

export const Text = styled.span`
    margin: 0 0.5rem 0 0;
`;

export const CloseWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0 0;
    width: 100%;
`;

export const CloseButton = styled(Button)`
    align-self: flex-end;
    padding: ${({ isLoading }) => (isLoading ? '0.75rem 2rem 0.75rem 1rem' : '0.75rem')};
`;

export const NotificationButton = styled(AcceptButton)`
    margin: 0 0.75rem 0 0;
`;
