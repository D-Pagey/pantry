import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Fridge } from '../../fixtures';
import { FirebaseContext } from '../ProviderFirebase';
import { FoodTable } from '.';

const props = {
    food: Fridge,
    handleEdit: () => {},
    setFood: () => {}
};

const firebaseContext = {
    deleteFoodItem: () => {}
};

export default { title: 'FoodTable' };

export const normal = () => (
    <FirebaseContext.Provider value={{ ...firebaseContext }}>
        <MemoryRouter>
            <FoodTable {...props} />
        </MemoryRouter>
    </FirebaseContext.Provider>
);
