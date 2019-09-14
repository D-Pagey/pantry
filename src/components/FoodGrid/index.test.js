import React from 'react';
import userEvent from '@testing-library/user-event';
import FoodGrid from '.';

const firebaseContext = {
    categories: ['Meat', 'Fish', 'Vegetables'],
    fridge: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: new Date(2019, 2, 14),
            name: 'chicken',
            servings: { label: '2', value: '2' }
        },
        {
            category: { label: 'Fish', value: 'fish' },
            expires: new Date(2019, 3, 9),
            name: 'salmon',
            servings: { label: '1', value: '1' }
        },
        {
            category: { label: 'Vegetables', value: 'vegetables' },
            expires: new Date(2019, 6, 11),
            name: 'carrots',
            servings: { label: '3', value: '3' }
        },
        {
            category: { label: 'Vegetables', value: 'vegetables' },
            expires: new Date(2019, 6, 11),
            name: 'broccoli',
            servings: { label: '3', value: '3' }
        }
    ],
    updateFridge: () => {}
};

describe('FoodGrid component', () => {
    it('should render', () => {
        const { container } = render(<FoodGrid />, firebaseContext);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle delete', async () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<FoodGrid />, { ...firebaseContext, updateFridge });
        const deleteButton = getByTestId('deleteButton0Meat');

        userEvent.click(deleteButton);

        expect(updateFridge).toHaveBeenCalledWith(
            firebaseContext.fridge.filter((item, index) => index !== 0)
        );
    });
});
