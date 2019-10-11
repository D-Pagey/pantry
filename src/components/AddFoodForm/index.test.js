/* eslint-disable react/prop-types */
import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFoodForm from '.';

jest.mock('react-select/creatable', () => ({ options, value, onChange }) => {
    const handleChange = (event) => {
        const option = options.find((item) => item.value === event.currentTarget.value);
        onChange(option);
    };

    return (
        <select data-testid="select" value={value || ''} onChange={handleChange}>
            {options.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
});

const context = {
    fridge: [],
    foodCategories: [
        {
            label: 'Meat',
            value: 'meat'
        },
        {
            label: 'Vegetables',
            value: 'vegetables'
        }
    ],
    updateFridge: () => {}
};

const props = {};

describe('AddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<AddFoodForm {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('should handle form submit', async () => {
        const updateFridge = jest.fn();
        const name = 'Chicken';
        const { getByTestId, getByText, queryAllByText } = render(<AddFoodForm {...props} />, {
            ...context,
            updateFridge
        });

        fireEvent.change(getByTestId('select'), { target: { value: 'vegetables' } });
        userEvent.type(getByTestId('addFoodFoodNameInput'), name);
        userEvent.click(queryAllByText('Up')[0]);
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Submit'));

        await wait(() =>
            expect(updateFridge).toHaveBeenCalledWith([
                expect.objectContaining({
                    category: { label: 'Vegetables', value: 'vegetables' },
                    expires: expect.any(Date),
                    name: name.toLowerCase(),
                    servings: { label: '1', value: '1' }
                })
            ])
        );
    });

    it('should show errors for required fields if no value', async () => {
        const { getByText, findAllByText } = render(<AddFoodForm {...props} />, context);

        userEvent.click(getByText('Submit'));

        await wait(() => findAllByText('Required'));
    });
});
