import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageAddFoodForm } from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush
    })
  }));

jest.mock('uuid', () => ({
    v4: () => '5'
}));

  const context = {
    updateFridge: () => {},
    user: {
        name: 'Dan Page'
    }
};

describe.skip('PageAddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render step 2 of the form once category is clicked', async () => {
        const { getByTestId, getByText, getByLabelText } = render(<PageAddFoodForm />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));
    });

    it('should render step 3 of the form once hit next on step 2', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));
        
        await waitFor(() => getByText('When is it going to expire?'));
    });

    it('should redirect to food page once submitted', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm />, context);
        
        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));
        
        await waitFor(() => getByText('When is it going to expire?'));
            
        userEvent.click(getByText('Add to pantry'));

        await waitFor(() => expect(mockHistoryPush).toBeCalledWith('/food/all'));
    });

    it('should call updateFridge with the right values', async () => {
        const updatedContext = {...context, updateFridge: jest.fn()};
        const name = 'chicken';

        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm />, updatedContext);
        
        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));
        
        await waitFor(() => getByText('When is it going to expire?'));
            
        userEvent.click(getByText('Add to pantry'));

        await waitFor(() => expect(updatedContext.updateFridge).toBeCalledWith({
            // categories: [CategoriesArray[0].id],
            expires: expect.any(Date),
            id: '5',
            name,
            owner: updatedContext.user.name,
            servings: 1
        }));
    });
});
