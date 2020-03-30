/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '.';

const props = {
  name: 'test',
  onBlur: () => {},
  onChange: () => {},
  testId: 'storybookInput',
  placeholder: 'test',
  value: '',
};

storiesOf('Input', module)
  .add('with label', () => <Input {...props} label="Name" />)
  .add('without label', () => <Input {...props} />)
  .add('with error', () => <Input {...props} error="Required" />);
