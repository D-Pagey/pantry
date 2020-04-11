import React from 'react';
import userEvent from '@testing-library/user-event';
import { addDays, format } from 'date-fns';
import arraySort from 'array-sort';

import { Fridge } from '../../fixtures/fridge';
import { FoodTable } from '.';

const props = {
    food: Fridge,
    handleDelete: () => {},
    handleEdit: () => {},
    setFood: () => {}
};

describe('FoodTable component', () => {
    it('should render', () => {
        const { container } = render(<FoodTable {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        colour     | date
        ${'red'}   | ${new Date()}
        ${'blue'}  | ${addDays(new Date(), 2)}
        ${'black'} | ${addDays(new Date(), 4)}
    `('should have $colour for expiry date', ({ colour, date }) => {
        const item = {
            categories: ['111'],
            expires: date,
            name: 'chicken',
            servings: 2,
            id: '666'
        };

        const { getByText } = render(<FoodTable {...props} food={[item]} />);
        const expiryDate = getByText(format(date, 'do MMM'));

        expect(expiryDate).toHaveStyleRule('color', colour);
    });

    it('should sort categories correctly', () => {
        const setFood = jest.fn();
        const { getByText } = render(<FoodTable {...props} setFood={setFood} />);

        userEvent.click(getByText('Name'));

        expect(setFood).toHaveBeenCalledWith(arraySort(props.food, 'name'));
    });
});
