import React, { useState } from 'react';
import { DialDatePicker } from '.';

const Wrapper = () => {
    const [date, setDate] = useState(new Date());

    return <DialDatePicker date={date} setDate={setDate} label="Expiry date?" />;
};

export default { title: 'DialDatePicker' };

export const normal = () => <Wrapper />;
