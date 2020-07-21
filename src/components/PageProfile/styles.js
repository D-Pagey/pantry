import styled from 'styled-components';
import Select from 'react-select';

export const Wrapper = styled.div`
    padding: 2rem;
`;

export const Image = styled.img`
    border-radius: 50%;
    width: 200px;
`;

export const HouseholdWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const Dropdown = styled(Select)`
    flex-grow: 1;
    margin: 0 0 0 1rem;
    max-width: 250px;
`;
