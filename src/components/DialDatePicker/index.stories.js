import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import DialDatePicker from '.';

const Wrapper = () => {
  const [date, setDate] = useState(new Date());

  return <DialDatePicker date={date} setDate={setDate} label="Expiry date?" />;
};

storiesOf('DialDatePicker', module).add('default', () => <Wrapper />);
