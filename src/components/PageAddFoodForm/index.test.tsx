import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import { updateExistingProperties, updateBatch } from '../../services/firestore';
import { render, screen } from '../../test-utils';
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

jest.mock('../../services/firestore');

const context = {
    user: UserDan
};

const props = {
    fridge: Fridge,
    metaData: { quantities: [1, 2, 3, 4, 5], units: ['servings', 'kilograms', 'grams'] }
};

describe('PageAddFoodForm component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should submit correct values for item that does not exist', async () => {
        const name = 'unique-food';
        const quantity = '3';
        const unit = props.metaData.units[1];

        render(<PageAddFoodForm {...props} />, context);

        // Step 1
        await selectEvent.create(screen.getByLabelText('What is the food called?'), name);
        await selectEvent.select(screen.getByLabelText('Quantity'), quantity);
        await selectEvent.select(screen.getByLabelText('Unit'), unit);
        userEvent.click(screen.getByText('Next'));

        // Step 2
        screen.getByText('What type of food?');
        userEvent.click(screen.getByText('Meat'));

        // Step 3
        screen.getByText('When is it going to expire?');
        userEvent.click(screen.getByText('Add to pantry'));

        await waitFor(() =>
            expect(updateBatch).toHaveBeenCalledWith({
                name,
                userHousehold: UserDan.household,
                batch: {
                    expires: expect.any(Date),
                    id: expect.any(String),
                    ownerId: UserDan.uid,
                    quantity: 3
                }
            })
        );

        expect(updateExistingProperties).not.toHaveBeenCalled();
    });

    it('should submit correct values for item that does exist', async () => {
        const quantity = '4';
        const unit = props.metaData.units[2];

        render(<PageAddFoodForm {...props} />, context);

        // Step 1
        // use an item from the fridge fixtures
        await selectEvent.select(screen.getByLabelText('What is the food called?'), 'Broccoli (7 servings)');
        await selectEvent.select(screen.getByLabelText('Quantity'), quantity);
        await selectEvent.select(screen.getByLabelText('Unit'), unit);
        userEvent.click(screen.getByText('Next'));

        // Step 2 - skipped because item exists

        // Step 3
        screen.getByText('When is it going to expire?');
        userEvent.click(screen.getByText('Add to pantry'));

        await waitFor(() =>
            expect(updateExistingProperties).toHaveBeenCalledWith({
                category: '',
                name: 'broccoli',
                unit,
                userHousehold: '123'
            })
        );

        expect(updateBatch).toHaveBeenCalledWith({
            name: props.fridge[1].name,
            userHousehold: UserDan.household,
            batch: {
                expires: expect.any(Date),
                id: expect.any(String),
                ownerId: UserDan.uid,
                quantity: 4
            }
        });
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
