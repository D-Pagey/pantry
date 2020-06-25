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
    border-bottom: 1px solid ${colours.veryLightGrey};
    padding: 1rem 0 1rem 3rem;

    &:first-child {
        border-top: 1px solid ${colours.veryLightGrey};
    }
`;

export const Checkbox = styled(ReactCheckbox)`
    margin: 0 1rem 0 0;
`;