/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddFoodForm } from '.';

jest.mock('react-select/creatable', () => ({ options, value, onChange }) => {
  const handleChange = (event) => {
    const option = options.find((item) => item.value === event.currentTarget.value);
    onChange(option);
  };

  return (
    <select data-testid="select" value={value || ''} onChange={handleChange}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
});

const props = {};

const context = {
  fridge: [],
  categories: [
    { label: 'Meat', color: 'red' },
    { label: 'fish', color: 'blue' },
  ],
  updateFridge: () => {},
};

describe('AddFoodForm component', () => {
  it.skip('should handle form submit', async () => {
    const updateFridge = jest.fn();
    const name = 'Chicken';
    const { getByTestId, queryAllByText } = render(<AddFoodForm {...props} />, context);

    fireEvent.change(getByTestId('select'), { target: { value: 'vegetables' } });
    userEvent.type(getByTestId('addFoodFoodNameInput'), name);
    userEvent.click(queryAllByText('Up')[0]);
    userEvent.click(getByTestId('singleSelectButton0'));
    userEvent.click(getByTestId('addFoodFormButton'));

    await wait(() => expect(updateFridge).toHaveBeenCalledWith([
      expect.objectContaining({
        category: 'vegetables',
        expires: expect.any(Date),
        name: name.toLowerCase(),
        servings: 1,
      }),
    ]));
  });

  it.skip('should show errors for required fields if no value', async () => {
    const { getByText, findAllByText } = render(<AddFoodForm {...props} />, context);

    userEvent.click(getByText('Submit'));

    await wait(() => findAllByText('Required'));
  });
});
