/* eslint-disable react/prop-types */
import React from 'react';
import { wait, fireEvent } from '@testing-library/react';
import Dropdown from '.';

jest.mock('react-select', () => ({ options, value, onChange }) => {
    const handleChange = (event) => {
        const option = options.find((item) => item.value === event.currentTarget.value);
        onChange(option);
    };

    return (
        <select data-testid="select" value={value} onChange={handleChange}>
            {options.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
});

const props = {
    options: [
        {
            label: 'Meat',
            value: 'meat'
        },
        {
            label: 'Vegetables',
            value: 'vegetables'
        },
        {
            label: 'Fish',
            value: 'fish'
        }
    ],
    setSelected: () => {}
};

describe('Dropdown component', () => {
    it('should render', () => {
        const { container } = render(<Dropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a label', () => {
        const label = 'What food category is it?';
        const { getByText } = render(<Dropdown {...props} label={label} />);
        getByText(label);
    });

    it('should handle change', async () => {
        const setSelected = jest.fn();
        const { getByTestId } = render(<Dropdown {...props} setSelected={setSelected} />);

        fireEvent.change(getByTestId('select'), { target: { value: 'vegetables' } });

        await wait(() =>
            expect(setSelected).toHaveBeenCalledWith({ label: 'Vegetables', value: 'vegetables' })
        );
    });
});
