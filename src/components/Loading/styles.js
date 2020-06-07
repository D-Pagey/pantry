import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    height: calc(100vh - ${HEADER_HEIGHT});
    justify-content: center;
`;
