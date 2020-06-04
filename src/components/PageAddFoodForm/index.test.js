import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { PageAddFoodForm } from '.';
import { CategoriesArray } from '../../fixtures';

jest.mock('uuid', () => ({
    v4: () => '5'
}));

const context = {
    categories: CategoriesArray,
    addNewCategories: () => {},
    updateFridge: () => {}
};

describe.skip('PageAddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call addNewCategories with correct values', async () => {
        const newCategory = (name) => ({
            colour: 'black',
            id: '5',
            label: name,
            value: name,
            name
        });
        const newCategoryNames = ['sweets', 'chocolate'];
        
        const addNewCategories = jest.fn();
        const { getByTestId, getByLabelText } = render(<PageAddFoodForm />, { ...context, addNewCategories });

        await selectEvent.create(getByLabelText('What categories of food?'), newCategoryNames[0]);
        await selectEvent.create(getByLabelText('What categories of food?'), newCategoryNames[1]);
        await userEvent.type(getByTestId('addFoodInput'), 'Chicken');

        userEvent.click(getByTestId('addFoodFormSubmit'));

        await waitFor(() =>
            expect(addNewCategories).toHaveBeenCalledWith([
                newCategory(newCategoryNames[0]),
                newCategory(newCategoryNames[1])
            ])
        );
    });

    it('should call updateFridge with correct values', async () => {
        const { id, name } = CategoriesArray[0];
        const updateFridge = jest.fn();
        const foodName = 'Chicken';
        const { getByTestId, getByLabelText, queryAllByText } = render(<PageAddFoodForm />, {
            ...context,
            updateFridge
        });

        await selectEvent.select(getByLabelText('What categories of food?'), [name]);
        await userEvent.type(getByTestId('addFoodInput'), foodName);
        userEvent.click(queryAllByText('Up')[0]);
        userEvent.click(getByTestId('singleSelectButton0'));

        userEvent.click(getByTestId('addFoodFormSubmit'));

        await waitFor(() =>
            expect(updateFridge).toHaveBeenCalledWith({
                categories: [id],
                id: '5',
                expires: expect.any(Date),
                name: foodName,
                servings: 1
            })
        );
    });
});
