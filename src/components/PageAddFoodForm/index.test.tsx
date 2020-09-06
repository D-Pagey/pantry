import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import { render } from '../../test-utils';
import { Fridge, UserDan } from '../../fixtures';
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
    user: UserDan
};

const props = {
    addItem: () => {},
    updateItemBatch: () => {}
};

describe('PageAddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render step 2 of the form once category is clicked', async () => {
        const { getByTestId, getByText, getByLabelText } = render(<PageAddFoodForm {...props} />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));
    });

    it('should render step 3 of the form once hit next on step 2', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm {...props} />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));
    });

    it('should render step 1 of the form once hit back on step 2', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm {...props} />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByText('Back'));

        await waitFor(() => getByText('What is the food called?'));
    });

    it('should render step 2 of the form once hit back on step 3', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm {...props} />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));

        userEvent.click(getByText('Back'));

        await waitFor(() => getByTestId('chooseCategory'));
    });

    it('should redirect to food page once submitted', async () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm {...props} />, context);

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() => expect(mockHistoryPush).toBeCalledWith('/food'));
    });

    it('should call addItem with the right values if new fridge item', async () => {
        const updatedProps = { ...props, fridge: Fridge, addItem: jest.fn() };

        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm {...updatedProps} />, context);

        await selectEvent.create(getByLabelText('What is the food called?'), 'Avocado');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() =>
            expect(updatedProps.addItem).toBeCalledWith({
                batch: {
                    expires: expect.any(Date),
                    id: expect.any(String),
                    ownerId: context.user.uid,
                    servings: 1
                },
                category: 'meat',
                name: 'avocado'
            })
        );
    });

    it('should call updateItemBatch with correct values if already exists', async () => {
        const updatedProps = {
            ...props,
            fridge: Fridge,
            updateItemBatch: jest.fn()
        };
        const name = 'steak';

        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm {...updatedProps} />, context);

        await selectEvent.select(getByLabelText('What is the food called?'), 'Steak');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await waitFor(() => getByTestId('chooseCategory'));

        userEvent.click(getByTestId('meatCategoryButton'));

        await waitFor(() => getByText('When is it going to expire?'));

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() =>
            expect(updatedProps.updateItemBatch).toBeCalledWith({
                batch: {
                    expires: expect.any(Date),
                    id: expect.any(String),
                    ownerId: context.user.uid,
                    servings: 1
                },
                category: 'meat',
                name
            })
        );
    });
});
