import React from 'react';
import userEvent from '@testing-library/user-event';
import { addDays, format } from 'date-fns';
import arraySort from 'array-sort';

import { Fridge } from '../../fixtures';
import { colours } from '../../tokens';
import { FoodTable } from '.';

const props = {
    food: Fridge,
    handleEdit: () => {},
    setFood: () => {}
};

const context = {
    deleteFoodItem: () => {}
};

describe('FoodTable component', () => {
    it('should render', () => {
        const { container } = render(<FoodTable {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        colour                  | date
        ${colours.red}          | ${new Date()}
        ${colours.orange}       | ${addDays(new Date(), 2)}
        ${colours.darkGreen100} | ${addDays(new Date(), 4)}
    `('should have $colour for expiry date', ({ colour, date }) => {
        const item = {
            categories: ['111'],
            expires: date,
            name: 'chicken',
            servings: 2,
            id: '666'
        };

        const { getByText } = render(<FoodTable {...props} food={[item]} />, context);
        const expiryDate = getByText(format(date, 'do MMM'));

        expect(expiryDate).toHaveStyleRule('color', colour);
    });

    it('should sort categories correctly', () => {
        const setFood = jest.fn();
        const { getByText } = render(<FoodTable {...props} setFood={setFood} />, context);

        userEvent.click(getByText('Name'));

        expect(setFood).toHaveBeenCalledWith(arraySort(props.food, 'name'));
    });

    it('should handle a delete food click', () => {
        const deleteFoodItem = jest.fn();
        const { getByTestId } = render(<FoodTable {...props} />, { ...context, deleteFoodItem });
        const button = getByTestId('deleteButton0');

        userEvent.click(button);

        expect(deleteFoodItem).toHaveBeenCalledWith(Fridge[0].id);
    });
});
