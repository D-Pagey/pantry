import styled from 'styled-components';
import { MOBILE_HEADER_HEIGHT, HEADER_HEIGHT, PAGE_WIDTH, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    position: relative;
    top: ${MOBILE_HEADER_HEIGHT};
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - 20px);
    margin: 0 auto;
    max-width: ${PAGE_WIDTH};
    padding: 0;

    @media ${mediaQuery.tablet} {
        top: ${HEADER_HEIGHT};
        min-height: calc(100vh - ${HEADER_HEIGHT} - 20px);
        padding: 0 2rem;
    }

    @media ${mediaQuery.maxPage} {
        padding: 0;
    }
`;

export const Title = styled.h1`
    font-weight: 300;
    margin: 2rem 0;
`;
