import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { addDays, format } from 'date-fns';
import FoodTable from '.';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useHistory: () => ({
        push: jest.fn()
    }),
    useParams: jest.fn(() => ({
        category: 'meat'
    }))
}));

const props = {};

const firebaseContext = {
    fridge: [
        {
            category: 'meat',
            expires: new Date(2019, 9, 12),
            name: 'chicken',
            servings: 2
        },
        {
            category: 'fish',
            expires: new Date(2019, 3, 9),
            name: 'salmon',
            servings: 1
        }
    ],
    updateFridge: () => {}
};

describe('FoodTable component', () => {
    it('should render', () => {
        const { container } = render(<FoodTable {...props} />, firebaseContext);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle delete', () => {
        const updateFridge = jest.fn();
        const { queryAllByTestId } = render(<FoodTable {...props} />, {
            ...firebaseContext,
            updateFridge
        });
        const deleteButton = queryAllByTestId('deleteButton');

        userEvent.click(deleteButton[0]);

        expect(updateFridge).toHaveBeenCalledWith(
            firebaseContext.fridge.filter((item, index) => index !== 0)
        );
    });

    it.skip('should handle edit', () => {
        const history = useHistory();
        const { queryAllByTestId } = render(<FoodTable {...props} />, {
            ...firebaseContext
        });
        const editButton = queryAllByTestId('editButton');

        userEvent.click(editButton[0]);
    });

    it.each`
        colour     | date
        ${'red'}   | ${new Date()}
        ${'blue'}  | ${addDays(new Date(), 2)}
        ${'black'} | ${addDays(new Date(), 4)}
    `('should have $colour for expiry date', ({ colour, date }) => {
        const item = {
            category: 'meat',
            expires: date,
            name: 'chicken',
            servings: 2
        };
        const updatedContext = {
            ...firebaseContext,
            fridge: [item]
        };

        const { getByText } = render(<FoodTable {...props} />, updatedContext);
        const expiryDate = getByText(format(date, 'do MMM'));

        expect(expiryDate).toHaveStyleRule('color', colour);
    });

    it('should handle the category: all', () => {
        useParams.mockReturnValueOnce({ category: 'all' });
        const { getByText, getByTestId } = render(<FoodTable {...props} />, firebaseContext);

        getByText(firebaseContext.fridge[0].name);
        getByText(firebaseContext.fridge[1].name);
        getByTestId('foodTableCategoryColumn');
    });
});
