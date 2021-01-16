import React from 'react';

import { render } from '../../test-utils';
import { formatFoodDropdownOptions } from '../../utils';
import { Fridge } from '../../fixtures';
import { CreatableDropdown } from '.';

const props = {
    options: formatFoodDropdownOptions(Fridge),
    setSelected: () => null,
    inputName: 'test-input-name'
};

describe('CreatableDropdown component', () => {
    it('should render', () => {
        const { container } = render(<CreatableDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
