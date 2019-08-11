import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '.';

const props = {
    testId: 'storybookInput',
    placeholder: 'test'
};

storiesOf('Input', module)
    .add('with label', () => <Input {...props} label="Name" />)
    .add('without label', () => <Input {...props} />)
    .add('with error', () => <Input {...props} error="Required" />);
