/* eslint-disable react/prop-types */
import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFoodForm from '.';

jest.mock('react-select', () => ({ options, value, onChange }) => {
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
    fridge: []
};

const props = {};

describe('AddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<AddFoodForm {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle form submit', async () => {
        const updateFridge = jest.fn();
        const { getByTestId, getByText } = render(<AddFoodForm {...props} />, {
            ...context,
            updateFridge
        });

        fireEvent.change(getByTestId('select'), { target: { value: 'vegetables' } });

        userEvent.click(getByText('Submit'));

        await wait(() =>
            expect(updateFridge).toHaveBeenCalledWith([
                expect.objectContaining({
                    category: { label: 'Vegetables', value: 'vegetables' },
                    expires: expect.any(Date),
                    name: '',
                    servings: { label: '', value: '' }
                })
            ])
        );
    });

    it('should show errors for required fields if no value', async () => {
        const { getByText } = render(<AddFoodForm {...props} />, context);

        userEvent.click(getByText('Submit'));

        await wait(() => getByText('Required'));
    });
});
