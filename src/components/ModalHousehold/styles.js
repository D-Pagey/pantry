import styled from 'styled-components';
import { Button } from '../Button';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: max-content;
`;

export const Title = styled.h3`
    font-size: 28px;
    font-weight: 400;
    margin: 0 0 20px;
`;

export const ColouredButton = styled(Button)`
    background-color: white;
    border: 1px solid ${({ color }) => color};
    color: ${({ color }) => color};
    font-size: 1.25rem;
    margin: 0 0 20px;
    width: 200px;
`;
