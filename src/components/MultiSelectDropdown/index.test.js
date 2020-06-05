import React from 'react';
import selectEvent from 'react-select-event';
import { MultiSelectDropdown } from '.';

jest.mock('uuid', () => ({
    v4: () => '5'
}));

const props = {
    options: [
        { colour: 'red', count: 1, id: '111', label: 'Meat', name: 'meat', value: 'meat' },
        { colour: 'blue', count: 3, id: '222', label: 'Fish', name:'fish', value: 'fish' },
        { colour: 'green', count: 5, id: '333', label: 'Vegetables', name:'vegetables', value: 'vegetables' }
    ],
    setValues: () => {},
    value: []
};

describe('MultiSelectDropdown component', () => {
    it('should render', () => {
        const { container } = render(<MultiSelectDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('should call setValues when changed', async () => {
        const setValues = jest.fn();
        const { getByLabelText } = render(<MultiSelectDropdown {...props} setValues={setValues} />);

        await selectEvent.select(getByLabelText(''), [props.options[0].label]);

        expect(setValues).toHaveBeenCalledWith([props.options[0]]);
    });

    it.todo('should render values passed down as props');

    it.skip('should create new values with id and colour', async () => {
        const label = 'categories';
        const setValues = jest.fn();
        const newItem = {
            label: 'Vegetables',
            value: 'Vegetables',
            name: 'vegetables',
            id: '5',
            colour: 'black',
            count: 0
        };
        const { getByLabelText } = render(<MultiSelectDropdown {...props} label={label} setValues={setValues} />);

        await selectEvent.create(getByLabelText(label), 'test');

        expect(setValues).toHaveBeenCalledWith();
    });
});
