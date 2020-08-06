import React from 'react';
import { Button } from '.';

export default { title: 'Button' };

export const normal = () => <Button onClick={() => console.log('clicked')}>Click me</Button>;

export const secondary = () => (
    <Button secondary onClick={() => console.log('clicked')}>
        Click me
    </Button>
);

export const disabled = () => (
    <Button disabled onClick={() => console.log('this should not work')}>
        Click me
    </Button>
);

export const destructive = () => <Button destructive>Click me</Button>;
