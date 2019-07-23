import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '.';

const props = {
    testId: 'storybookInput'
};

storiesOf('Input', module).add('default', () => <Input {...props} />);
