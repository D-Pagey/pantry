import React from 'react';
import { storiesOf } from '@storybook/react';
import DialDatePicker from '.';

const props = {
    initialDate: new Date()
};

storiesOf('DialDatePicker', module)
    .add('with label', () => <DialDatePicker {...props} label="Expiry date?" />)
    .add('without label', () => <DialDatePicker {...props} />);
