import React from 'react';
import { CategoryList } from '.';
import { Fridge } from '../../fixtures';

export const CategoriesWithCount = [
  {
      colour: 'red',
      id: '111',
      name: 'meat',
      count: 3
  },
  {
      colour: 'blue',
      id: '222',
      name: 'fish',
      count: 1,
  },
  {
      colour: 'pink',
      id: '444',
      name: 'snacks'
  }
];

const context = {
  categories: CategoriesWithCount,
  fridge: Fridge
};

describe('CategoryList component', () => {
  it('should render', () => {
    const { container } = render(<CategoryList />, context);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should only render categories with counts > 0', () => {
    const { getByTestId, queryByTestId } = render(<CategoryList />, context);
    getByTestId('categoryCardmeat');
    getByTestId('categoryCardfish');
    expect(queryByTestId('categoryCardsnacks')).toBeNull();
  });
});
