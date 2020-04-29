import React from 'react';
import userEvent from '@testing-library/user-event';
import { CategoriesWithCounts } from '../../fixtures';
import { PageProfile } from '.';

const props = {};

const context = {
  categories: CategoriesWithCounts,
  deleteCategory: () => {},
  signOut: () => {},
  user: {
    email: 'dan@gmail.com',
    name: 'Dan',
  },
};

describe('PageProfile component', () => {
  it('should render', () => {
    const { container } = render(<PageProfile {...props} />, context);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call sign out on click', () => {
    const signOut = jest.fn();
    const { getByTestId } = render(<PageProfile {...props} />, { ...context, signOut });

    userEvent.click(getByTestId('pageProfileButton'));

    expect(signOut).toHaveBeenCalled();
  });

  it('should call deleteCategory with id if count = 0', () => {
    const deleteCategory = jest.fn();
    const { getByTestId } = render(<PageProfile {...props} />, { ...context, deleteCategory });

    userEvent.click(getByTestId('profileCategoryDeleteButton1'));

    expect(deleteCategory).toHaveBeenCalledWith(CategoriesWithCounts[1].id);
  });

  it('should not call deleteCategory if count > 0', () => {
    const deleteCategory = jest.fn();
    const { getByTestId } = render(<PageProfile {...props} />, { ...context, deleteCategory });

    userEvent.click(getByTestId('profileCategoryDeleteButton0'));

    expect(deleteCategory).not.toHaveBeenCalled();
  });
});
