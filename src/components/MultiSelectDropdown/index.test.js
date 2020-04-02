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
});