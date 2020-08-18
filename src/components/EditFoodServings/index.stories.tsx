import React from 'react';
import { Fridge, ExpiredPhotoBatch } from '../../fixtures';
import { EditFoodServings } from '.';

export default { title: 'EditFoodServings' };

const props = {
    item: { ...Fridge[0], batches: [ExpiredPhotoBatch] },
    updateFridge: () => {}
};

export const normal = () => <EditFoodServings {...props} />;
