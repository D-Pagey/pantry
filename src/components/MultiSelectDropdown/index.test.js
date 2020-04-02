/* eslint-disable no-shadow */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { MultiSelectDropdown } from '.';

jest.mock('react-select/creatable', () => ({ options, value, onChange }) => {
    const handleChange = (event) => {
        const option = options.find((option) => option.value === event.currentTarget.value);
        onChange(option);
    };

    return (
        <select data-testid="select" value={value} onChange={handleChange}>
            {options.map(({ label, value }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
});

const props = {
    options: [
        { label: 'Meat', value: 'meat' },
        { label: 'Fish', value: 'fish' }
    ],
    setValues: () => {},
    values: []
};

describe('MultiSelectDropdown component', () => {
    it('should render', () => {
        const { container } = render(<MultiSelectDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a label', () => {
        const label = 'Which food categories is it?';
        const { getByText } = render(<MultiSelectDropdown {...props} label={label} />);
        getByText(label);
    });

    it('should render an error', () => {
        const error = 'Required';
        const { getByText } = render(<MultiSelectDropdown {...props} error={error} />);
        getByText(error);
    });

    it('should call setValues when changed', () => {
        const setValues = jest.fn();
        const option = { label: 'Fish', value: 'fish' };
        const { getByTestId } = render(<MultiSelectDropdown {...props} setValues={setValues} />);

        userEvent.selectOptions(getByTestId('select'), option.value);

        expect(setValues).toHaveBeenCalledWith(option);
    });
});
