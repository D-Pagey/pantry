import React from 'react';
import { Fridge } from '../../fixtures';
import { EditFoodServings } from '.';

export default { title: 'EditFoodServings' };

const props = {
    item: Fridge[0],
    updateFridge: () => {}
};

export const normal = () => <EditFoodServings {...props} />;
