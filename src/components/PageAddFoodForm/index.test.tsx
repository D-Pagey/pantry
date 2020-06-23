import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { render } from '../../test-utils';
import { Fridge, Batches } from '../../fixtures';
import { PageAddFoodForm } from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

const context = {
    fridge: [],
    updateFridge: () => {},
    user: {
        email: 'dan.page91@gmail.com'
    }
};

describe('PageAddFoodForm component', () => {
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

        await waitFor(() => expect(mockHistoryPush).toBeCalledWith('/food'));
    });

    it('should call updateFridge with the right values if new fridge item', async () => {
        const updatedContext = { ...context, updateFridge: jest.fn() };

        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm />, updatedContext);

        await selectEvent.create(getByLabelText('What is the food called?'), 'Avocado');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() =>
            expect(updatedContext.updateFridge).toBeCalledWith({
                batches: [
                    {
                        expires: expect.any(Date),
                        owner: updatedContext.user.email,
                        servings: 1
                    }
                ],
                category: 'meat',
                name: 'avocado'
            })
        );
    });

    it('should update a fridge item if already exists', async () => {
        const updatedContext = { ...context, fridge: Fridge, updateFridge: jest.fn() };
        const name = 'steak';

        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm />, updatedContext);

        await selectEvent.select(getByLabelText('What is the food called?'), 'Steak');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() =>
            expect(updatedContext.updateFridge).toBeCalledWith({
                batches: [
                    ...Batches,
                    {
                        expires: expect.any(Date),
                        owner: updatedContext.user.email,
                        servings: 1
                    }
                ],
                category: 'meat',
                name
            })
        );
    });
});
