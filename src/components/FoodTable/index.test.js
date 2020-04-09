import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { addDays, format } from 'date-fns';
import { Fridge } from '../../fixtures/fridge';
import { Categories } from '../../fixtures/categories';
import { FoodTable } from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: jest.fn(() => ({
    category: 'all',
  })),
  Redirect: jest.fn(() => null),
}));

const props = {};

const context = {
  fridge: Fridge,
  categories: Categories,
  updateFridge: () => null,
};

describe('FoodTable component', () => {
  // TODO: fix snapshot to be with valid category
  it('should render', () => {
    const { container } = render(<FoodTable {...props} />, context);
    expect(container.firstChild).toMatchSnapshot();
  });

  it.skip('should handle delete', () => {
    const updateFridge = jest.fn();
    const { queryAllByTestId } = render(<FoodTable {...props} />, {
      ...context,
      updateFridge,
    });
    const deleteButton = queryAllByTestId('deleteButton');

    userEvent.click(deleteButton[0]);

    expect(updateFridge).toHaveBeenCalledWith({
      key: 'fridge',
      isDeleting: true,
      values: context.fridge.filter((item, index) => index !== 0),
    });
  });

  it.skip('should handle edit', () => {
    // think these mocks are conflicting with the setupTests config
    const { push } = useHistory();
    const { queryAllByTestId } = render(<FoodTable {...props} />, context);
    const editButton = queryAllByTestId('editButton');

    userEvent.click(editButton[0]);

    expect(push).toHaveBeenCalledWith();
  });

  it.skip.each`
        colour     | date
        ${'red'}   | ${new Date()}
        ${'blue'}  | ${addDays(new Date(), 2)}
        ${'black'} | ${addDays(new Date(), 4)}
    `('should have $colour for expiry date', ({ colour, date }) => {
  const item = {
    categories: ['111'],
    expires: date,
    name: 'chicken',
    servings: 2,
    id: '666',
  };

  const { getByText } = render(<FoodTable {...props} />, { ...context, fridge: [item] });
  const expiryDate = getByText(format(date, 'do MMM'));

  expect(expiryDate).toHaveStyleRule('color', colour);
});

  it('should redirect if category does not exist', () => {
    useParams.mockReturnValueOnce({ category: 'chocolate' });

    render(<FoodTable {...props} />, context);

    expect(Redirect).toHaveBeenCalledWith({ to: '/not-found' }, expect.any(Object));
  });

  it.skip('should handle the category: all', () => {
    useParams.mockReturnValue({ category: 'all' });

    const { getByText, getByTestId } = render(<FoodTable {...props} />, context);

    getByText(context.fridge[0].name);
    getByText(context.fridge[1].name);
    getByTestId('foodTableCategoryColumn');
  });
});
