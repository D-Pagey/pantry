import React from 'react';
import { MultiSelectDropdown} from '.';

const props = {
    options: [{ label: 'Meat', value: 'meat' }],
    setValues: () => {},
    values: []
};

describe('MultiSelectDropdown component', () => {
    it('should render', () => {
        const { container } = render(<MultiSelectDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});