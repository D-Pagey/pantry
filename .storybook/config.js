import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import { MemoryRouter, Router } from 'react-router-dom';
import * as S from '../src/components/App/styles';

addDecorator((storyFn) => (
  <MemoryRouter>
    <div style={{ margin: '1rem' }}>
      <S.GlobalStyle />
      {storyFn()}
    </div>
  </MemoryRouter>
));

configure(() => {
  const req = requireContext('../src', true, /\.stories\.js$/);
  req.keys().forEach((filename) => req(filename));
}, module);