import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import * as S from '../src/components/App/styles';

addDecorator((storyFn) => (
  <Router history={createMemoryHistory()}>
    <div style={{ margin: '1rem' }}>
      <S.GlobalStyle />
      {storyFn()}
    </div>
  </Router>
));

configure(() => {
  const req = requireContext('../src', true, /\.stories\.js$/);
  req.keys().forEach((filename) => req(filename));
}, module);