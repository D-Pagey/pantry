import React from 'react';
import { CreatableDropdown } from '.';

const props = {
  options: ['purple', 'orange', 'yellow', 'green'],
  setSelected: () => {},
  value: '',
};

describe('CreatableDropdown component', () => {
  it('should render', () => {
    const { container } = render(<CreatableDropdown {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
