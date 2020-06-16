import React from 'react';
import { DisposeFood, DisposeFoodProps } from '.';

const props: DisposeFoodProps = {
    handleClick: (option) => console.log({ option })
};

export default { title: 'DisposeFood' };

export const normal = () => <DisposeFood {...props} />;
