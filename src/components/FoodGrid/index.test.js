import React from 'react';
import userEvent from '@testing-library/user-event';
import { addDays, format } from 'date-fns';
import FoodGrid from '.';

const props = {
    match: {
        params: {
            category: 'meat'
        }
    }
};

const firebaseContext = {
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
        }
    ],
    updateFridge: () => {}
};

describe('FoodGrid component', () => {
    it('should render', () => {
        const { container } = render(<FoodGrid {...props} />, firebaseContext);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle delete', async () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<FoodGrid {...props} />, {
            ...firebaseContext,
            updateFridge
        });
        const deleteButton = getByTestId('deleteButton0');

        userEvent.click(deleteButton);

        expect(updateFridge).toHaveBeenCalledWith(
            firebaseContext.fridge.filter((item, index) => index !== 0)
        );
    });

    it.each`
        colour     | date
        ${'red'}   | ${new Date()}
        ${'blue'}  | ${addDays(new Date(), 2)}
        ${'black'} | ${addDays(new Date(), 4)}
    `('should have $colour for expiry date', ({ colour, date }) => {
        const item = {
            category: { label: 'Meat', value: 'meat' },
            expires: date,
            name: 'chicken',
            servings: { label: '2', value: '2' }
        };
        const updatedContext = {
            ...firebaseContext,
            fridge: [item]
        };

        const { getByText } = render(<FoodGrid {...props} />, updatedContext);
        const expiryDate = getByText(format(date, 'do MMM'));

        expect(expiryDate).toHaveStyleRule('color', colour);
    });
});
