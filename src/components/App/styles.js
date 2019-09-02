import styled, { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'polished';

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
    padding: 0 1rem 2rem;
`;
