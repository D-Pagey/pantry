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
    fridge: Fridge,
    updateExistingProperties: () => null,
    updateBatch: () => null,
    metaData: { quantities: [2], units: ['servings'] }
};

describe('PageAddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('should render step 2 of the form once category is clicked', async () => {
        const { getByTestId, getByText, getByLabelText, findByTestId } = render(
            <PageAddFoodForm {...props} />,
            context
        );

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');
    });

    it.skip('should render step 3 of the form once hit next on step 2', async () => {
        const { getByTestId, getByLabelText, getByText, findByTestId, findByText } = render(
            <PageAddFoodForm {...props} />,
            context
        );

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');

        userEvent.click(getByTestId('meatCategoryButton'));

        await findByText('When is it going to expire?');
    });

    it.skip('should render step 1 of the form once hit back on step 2', async () => {
        const { getByTestId, getByLabelText, getByText, findByTestId, findByText } = render(
            <PageAddFoodForm {...props} />,
            context
        );

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');

        userEvent.click(getByText('Back'));

        await findByText('What is the food called?');
    });

    it.skip('should render step 2 of the form once hit back on step 3', async () => {
        const { getByTestId, getByLabelText, getByText, findByTestId, findByText } = render(
            <PageAddFoodForm {...props} />,
            context
        );

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');

        userEvent.click(getByTestId('meatCategoryButton'));

        await findByText('When is it going to expire?');

        userEvent.click(getByText('Back'));

        await findByTestId('chooseCategory');
    });

    it.skip('should redirect to food page once submitted', async () => {
        const { getByTestId, getByLabelText, getByText, findByTestId, findByText } = render(
            <PageAddFoodForm {...props} />,
            context
        );

        await userEvent.type(getByLabelText('What is the food called?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');

        userEvent.click(getByTestId('meatCategoryButton'));

        await findByText('When is it going to expire?');

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() => expect(mockHistoryPush).toBeCalledWith('/food'));
    });

    it.skip('should call updateBatch with the right values', async () => {
        const updatedProps = { ...props, fridge: Fridge, updateBatch: jest.fn() };

        const { getByTestId, getByLabelText, getByText, findByTestId, findByText } = render(
            <PageAddFoodForm {...updatedProps} />,
            context
        );

        await selectEvent.create(getByLabelText('What is the food called?'), 'Avocado');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');

        userEvent.click(getByTestId('meatCategoryButton'));

        await findByText('When is it going to expire?');

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() =>
            expect(updatedProps.updateBatch).toBeCalledWith({
                batch: {
                    expires: expect.any(Date),
                    id: expect.any(String),
                    ownerId: context.user.uid,
                    quantity: 1,
                    unit: 'servings'
                },
                name: 'avocado'
            })
        );
    });

    it.skip('should call updateExistingProperties with correct values if does not already exist', async () => {
        const updatedProps = {
            ...props,
            fridge: Fridge,
            updateExistingProperties: jest.fn()
        };
        const name = 'salmon';

        const { getByTestId, getByLabelText, getByText, findByTestId, findByText } = render(
            <PageAddFoodForm {...updatedProps} />,
            context
        );

        await selectEvent.create(getByLabelText('What is the food called?'), 'Salmon');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));

        await findByTestId('chooseCategory');

        userEvent.click(getByTestId('meatCategoryButton'));

        await findByText('When is it going to expire?');

        userEvent.click(getByText('Add to pantry'));

        await waitFor(() =>
            expect(updatedProps.updateExistingProperties).toBeCalledWith({
                category: 'meat',
                name
            })
        );
    });
});
