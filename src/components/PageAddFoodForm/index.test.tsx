import React from 'react';
import { addDays } from 'date-fns';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import { addItem } from '../../services/firestore';
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

const mockToastInfo = jest.fn();
const mockToastError = jest.fn();

jest.mock('react-toastify', () => ({
    toast: {
        info: (text: string) => mockToastInfo(text),
        error: (text: string) => mockToastError(text)
    }
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

    it('should submit correct values for new item and redirect', async () => {
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
        userEvent.click(screen.getAllByText('29')[0]);
        userEvent.click(screen.getByText('Add to pantry'));

        await waitFor(() =>
            expect(addItem).toHaveBeenCalledWith(
                {
                    name,
                    category: 'meat',
                    unit: props.metaData.units[1],
                    batches: {
                        uuid: {
                            expires: addDays(new Date(), -3),
                            id: 'uuid',
                            ownerId: UserDan.uid,
                            quantity: parseInt(quantity, 10)
                        }
                    }
                },
                UserDan.household
            )
        );

        expect(mockHistoryPush).toHaveBeenCalledWith('/food');
    });

    it.skip('should submit correct values for existing item', async () => {
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
            expect(addItem).toHaveBeenCalledWith(
                {
                    name: 'broccoli',
                    category: 'meat',
                    unit: props.metaData.units[1],
                    batches: {
                        uuid: {
                            expires: addDays(new Date(), -3),
                            id: 'uuid',
                            ownerId: UserDan.uid,
                            quantity: parseInt(quantity, 10)
                        }
                    }
                },
                UserDan.household
            )
        );
    });

    it('next and back buttons should navigate the right steps of the form', async () => {
        render(<PageAddFoodForm {...props} />, context);

        // Step 1
        await selectEvent.create(screen.getByLabelText('What is the food called?'), 'chicken');
        await selectEvent.select(screen.getByLabelText('Quantity'), '1');
        await selectEvent.select(screen.getByLabelText('Unit'), props.metaData.units[2]);
        userEvent.click(screen.getByText('Next'));

        // Step 2
        screen.getByText('What type of food?');
        userEvent.click(screen.getByText('Back'));

        // Step 1
        await screen.findByText('What is the food called?');
        userEvent.click(screen.getByText('Next'));

        // Step 2
        screen.getByText('What type of food?');
        userEvent.click(screen.getByText('Next'));

        // Step 3
        screen.getByText('When is it going to expire?');
        userEvent.click(screen.getByText('Back'));

        // Step 2
        screen.getByText('What type of food?');
        userEvent.click(screen.getByText('Next'));

        // Step 3
        screen.getByText('When is it going to expire?');
    });

    it('should call toast notification if no name', () => {
        render(<PageAddFoodForm {...props} />, context);

        userEvent.click(screen.getByText('Next'));

        expect(mockToastInfo).toHaveBeenCalledWith('Please enter a name for the food item');
    });

    it('should call toast notification if no unit', async () => {
        render(<PageAddFoodForm {...props} />, context);

        await selectEvent.select(screen.getByLabelText('What is the food called?'), 'Broccoli (7 servings)');
        await selectEvent.select(screen.getByLabelText('Quantity'), '1');
        userEvent.click(screen.getByText('Next'));

        expect(mockToastInfo).toHaveBeenCalledWith('Please enter a unit for the food item');
    });

    it('should call toast notification if quantity is not a number', async () => {
        render(<PageAddFoodForm {...props} />, context);

        await selectEvent.select(screen.getByLabelText('What is the food called?'), 'Broccoli (7 servings)');
        await selectEvent.create(screen.getByLabelText('Quantity'), 'hello-world');
        userEvent.click(screen.getByText('Next'));

        expect(mockToastError).toHaveBeenCalledWith('Please enter a number for the quantity');
    });

    it('should call toast notification if quantity is not entered', async () => {
        render(<PageAddFoodForm {...props} />, context);

        await selectEvent.select(screen.getByLabelText('What is the food called?'), 'Broccoli (7 servings)');
        userEvent.click(screen.getByText('Next'));

        expect(mockToastError).toHaveBeenCalledWith('Please enter a number for the quantity');
    });
});
