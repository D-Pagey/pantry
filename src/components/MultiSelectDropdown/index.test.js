import React from 'react';
import selectEvent from 'react-select-event';
import { MultiSelectDropdown } from '.';

jest.mock('uuid', () => ({
    v4: () => '5'
}));

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

    it('should call setValues when changed', async () => {
        const label = 'categories';
        const setValues = jest.fn();
        const { getByLabelText } = render(<MultiSelectDropdown {...props} label={label} setValues={setValues} />);

        await selectEvent.select(getByLabelText(label), [props.options[0].label, props.options[1].label]);

        expect(setValues).toHaveBeenCalledWith([props.options[0], props.options[1]]);
    });

    it('should create new values with id and colour', async () => {
        const label = 'categories';
        const setValues = jest.fn();
        const newItem = {
            label: 'Vegetables',
            value: 'Vegetables',
            id: '5',
            colour: 'black',
            count: 0
        };
        const { getByLabelText } = render(<MultiSelectDropdown {...props} label={label} setValues={setValues} />);

        await selectEvent.create(getByLabelText(label), newItem.label);

        expect(setValues).toHaveBeenCalledWith([newItem]);
    });
});
