import React from 'react';
import { PageCategories } from '.';
import { CategoriesArray, Fridge } from '../../fixtures';

const props = {};

const context = {
  isAuthed: false,
  isCheckingAuth: true,
  categories: CategoriesArray,
  fridge: Fridge
};

describe('PageCategories component', () => {
  it('should render', () => {
    const { container } = render(<PageCategories {...props} />, context);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render loading spinner if checking auth', () => {
    const { queryByTestId } = render(<PageCategories {...props} />, context);
    expect(queryByTestId('pageCategories')).toBeNull();
  });

  it('should render category list if authed', () => {
    const { getByTestId } = render(<PageCategories {...props} />, {
      ...context,
      isAuthed: true,
      isCheckingAuth: false,
    });
    getByTestId('categoryList');
  });
});
