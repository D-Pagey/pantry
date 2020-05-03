import styled, { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'polished';
import { NavLink } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`

  ${normalize()}

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 1250px;
    padding: 100px 1rem;
`;

export const Link = styled(NavLink)`
    color: initial;
    text-decoration: none;
`;

export const Title = styled.h4`
    font-weight: 500;
    padding: 0 0 2rem;
`;
