import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../tokens';

export const Wrapper = styled.div`
    position: relative;
    top: ${HEADER_HEIGHT};
    height: calc(100vh - ${HEADER_HEIGHT});
`;