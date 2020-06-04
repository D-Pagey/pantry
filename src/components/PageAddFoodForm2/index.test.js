import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoriesArray } from '../../fixtures/categories';
import { PageAddFoodForm2 } from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush
    })
  }));

  const context = {
    categories: CategoriesArray,
    addNewCategories: () => {},
    updateFridge: () => {}
};

describe('PageAddFoodForm2 component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm2 />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render step 2 of the form once category is clicked', async () => {
        const { getByTestId, getByText } = render(<PageAddFoodForm2 />, context);

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('How many servings?'));
    });

    it('should render step 3 of the form once hit next on step 2', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm2 />, context);

        userEvent.click(getByTestId('meatCategoryButton'));
        userEvent.type(getByLabelText('What type of meat is it?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));
        
        await waitFor(() => getByText('When is it going to expire?'));
    });

    it('should redirect to food page once submitted', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm2 />, context);
        
        userEvent.click(getByTestId('meatCategoryButton'));
        await userEvent.type(getByLabelText('What type of meat is it?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));
        
        await waitFor(() => getByText('When is it going to expire?'));
            
        userEvent.click(getByText('Add to pantry'));

        await waitFor(() => expect(mockHistoryPush).toBeCalledWith('/food/all'));
    });
});
