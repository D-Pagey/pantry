/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import CreatableDropdown from '.';

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

  it('should render a label', () => {
    const label = 'What food category is it?';
    const { getByText } = render(<CreatableDropdown {...props} label={label} />);
    getByText(label);
  });

  it('should render an error', () => {
    const error = 'What food category is it?';
    const { getByText } = render(<CreatableDropdown {...props} error={error} />);
    getByText(error);
  });
});
