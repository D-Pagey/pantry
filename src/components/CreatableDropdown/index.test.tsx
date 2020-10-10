import React from 'react';

import { render } from '../../test-utils';
import { formatDropdownOptions } from '../../utils';
import { Fridge } from '../../fixtures';
import { CreatableDropdown } from '.';

const props = {
    options: formatDropdownOptions(Fridge),
    setSelected: () => null
};

describe('CreatableDropdown component', () => {
    it('should render', () => {
        const { container } = render(<CreatableDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
