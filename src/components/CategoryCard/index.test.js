import React from 'react';
import { CategoryCard } from '.';

const props = {
  colour: 'red',
  label: 'meat',
  quantity: 2,
};

describe('CategoryCard component', () => {
  it('should render', () => {
    const { container } = render(<CategoryCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
