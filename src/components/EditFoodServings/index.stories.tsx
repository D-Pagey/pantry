import React from 'react';
import { Fridge } from '../../fixtures';
import { EditFoodServings } from '.';

export default { title: 'EditFoodServings' };

const props = {
    item: Fridge[0]
};

export const normal = () => <EditFoodServings {...props} />;
