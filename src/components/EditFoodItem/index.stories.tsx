import React from 'react';
import { Fridge } from '../../fixtures';
import { EditFoodItem } from '.';

export default { title: 'EditFoodItem' };

const props = {
    item: Fridge[0]
};

export const normal = () => <EditFoodItem {...props} />;
