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
            expires: dateFns.format(new Date(2019, 2, 14), 'MM/DD/YYYY'),
            name: 'chicken',
            servings: '2'
        },
        {
            category: { label: 'Fish', value: 'fish' },
            expires: dateFns.format(new Date(2019, 3, 9), 'MM/DD/YYYY'),
            name: 'salmon',
            servings: '1'
        },
        {
            category: { label: 'Vegetables', value: 'vegetables' },
            expires: dateFns.format(new Date(2019, 6, 11), 'MM/DD/YYYY'),
            name: 'carrots',
            servings: '3'
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
                expires: '04/09/2019',
                name: 'salmon',
                servings: '1'
            },
            {
                category: { label: 'Vegetables', value: 'vegetables' },
                expires: '07/11/2019',
                name: 'carrots',
                servings: '3'
            }
        ]);
    });
});
