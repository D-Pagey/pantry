import React from 'react';
import dateFns from 'date-fns';
import userEvent from '@testing-library/user-event';
import FoodGrid from '.';

const firebaseContext = {
    updateFridge: () => {}
};

const props = {
    data: [
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
        }
    ]
};

describe('FoodGrid component', () => {
    it('should render', () => {
        const { container } = render(<FoodGrid {...props} />, firebaseContext);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle delete', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<FoodGrid {...props} />, { updateFridge });
        const deleteButton = getByTestId('deleteButton0Meat');

        userEvent.click(deleteButton);

        expect(updateFridge).toHaveBeenCalledWith([
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
            }
        ]);
    });
});
