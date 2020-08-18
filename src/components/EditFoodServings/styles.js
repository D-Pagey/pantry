import styled from 'styled-components';
import ReactCheckbox from 'rc-checkbox';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h4`
    font-weight: normal;
    margin: 0 0 1.5rem;
`;

export const List = styled.ul`
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    align-items: center;
    border-bottom: 1px solid ${colours.veryLightGrey};
    display: flex;
    padding: 1rem 0 1rem 3rem;

    &:first-child {
        border-top: 1px solid ${colours.veryLightGrey};
    }
`;

export const Checkbox = styled(ReactCheckbox)`
    margin: 0 1rem 0 0;
`;

export const Text = styled.span`
    color: ${({ colour }) => colour};
`;

export const Photo = styled.img`
    border-radius: 50%;
    margin: 0 1rem 0 0;
    width: 40px;
`;