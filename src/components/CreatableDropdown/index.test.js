import React from 'react';
import { Fridge } from '../../fixtures';
import { CreatableDropdown } from '.';

const props = {
    options: Fridge.map(item => item.name),
    setSelected: () => {}
};

describe('CreatableDropdown component', () => {
    it('should render', () => {
        const { container } = render(<CreatableDropdown {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});