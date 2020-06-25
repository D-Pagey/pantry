import React from 'react';
import { DisposeFood } from '.';

const props = {
    handleDelete: () => console.log('delete'),
    handleEdit: () => console.log('edit'),
    name: 'carrot'
};

export default { title: 'DisposeFood' };

export const normal = () => <DisposeFood {...props} />;
