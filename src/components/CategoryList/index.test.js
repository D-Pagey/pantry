import React from 'react';
import { CategoryList } from '.';
import { CategoriesArray, Fridge } from '../../fixtures';

const props = {};

const context = {
  categories: CategoriesArray,
  fridge: Fridge
};

describe('CategoryList component', () => {
  it('should render', () => {
    const { container } = render(<CategoryList {...props} />, context);
    expect(container.firstChild).toMatchSnapshot();
  });
});
