import React from 'react';
import { Button } from '.';

export default { title: 'Button' };

export const normal = () => <Button onClick={() => console.log('clicked')}>Click me</Button>;
