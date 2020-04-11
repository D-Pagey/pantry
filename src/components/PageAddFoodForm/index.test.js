import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { PageAddFoodForm } from '.';
import { Categories } from '../../fixtures/categories';

jest.mock('uuid', () => ({
    v4: () => '5'
}));

const context = {
    categories: Categories,
    updateCategories: () => {},
    updateFridge: () => {}
};

describe('PageAddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call updateCategories with correct values', async () => {
        const { colour, id, name } = Categories[0];
        const updateCategories = jest.fn();
        const foodName = 'Chicken';
        const { getByTestId, getByLabelText } = render(<PageAddFoodForm />, { ...context, updateCategories });

        await selectEvent.select(getByLabelText('What categories of food?'), [name]);
        await userEvent.type(getByTestId('addFoodInput'), foodName);

        userEvent.click(getByTestId('addFoodFormSubmit'));

        await waitFor(() =>
            expect(updateCategories).toHaveBeenCalledWith([
                {
                    colour,
                    id,
                    label: name,
                    name,
                    value: name
                }
            ])
        );
    });

    it('should call updateFridge with correct values', async () => {
        const { id, name } = Categories[0];
        const updateFridge = jest.fn();
        const foodName = 'Chicken';
        const { getByTestId, getByLabelText, queryAllByText } = render(<PageAddFoodForm />, { ...context, updateFridge });

        await selectEvent.select(getByLabelText('What categories of food?'), [name]);
        await userEvent.type(getByTestId('addFoodInput'), foodName);
        userEvent.click(queryAllByText('Up')[0]);
        userEvent.click(getByTestId('singleSelectButton0'));
        
        userEvent.click(getByTestId('addFoodFormSubmit'));

        await waitFor(() => expect(updateFridge).toHaveBeenCalledWith({
            categories: [id],
            id: '5',
            expires: expect.any(Date),
            name: foodName,
            servings: 1
        }));
    });
});
