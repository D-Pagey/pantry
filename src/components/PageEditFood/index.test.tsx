import React from 'react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../../test-utils';
import { Fridge, MetaData, TenantDan, TenantHeidi, TenantJoe, UserDan } from '../../fixtures';
import { PageEditFood } from '.';

const mockAddItemDeleteItem = jest.fn();
const mockAddItem = jest.fn();
const mockAddNewUnit = jest.fn();

jest.mock('../../services/firestore', () => ({
    addItem: (item: any, household: string) => mockAddItem(item, household),
    addItemDeleteItem: (item: any, name: string, household: string) => mockAddItemDeleteItem(item, name, household),
    addNewUnit: (units: string[], household: string) => mockAddNewUnit(units, household)
}));

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        name: 'broccoli'
    })
}));

const mockToastError = jest.fn();

jest.mock('react-toastify', () => ({
    toast: {
        error: (text: string) => mockToastError(text)
    }
}));

const props = {
    fridge: Fridge.filter((item) => item.batches.length > 0),
    tenants: [TenantHeidi, TenantDan, { ...TenantJoe, houseRole: 'tenant' as const }],
    metadata: MetaData
};

const context = {
    user: UserDan
};

const batchesObject = {
    '1111111': {
        expires: expect.any(Date),
        id: '1111111',
        ownerId: 'fghij',
        quantity: 1
    },
    '22222222': {
        expires: expect.any(Date),
        id: '22222222',
        ownerId: 'abcde',
        quantity: 2
    },
    '3333333': {
        expires: expect.any(Date),
        id: '3333333',
        ownerId: 'zxwy',
        quantity: 4
    }
};

describe('PageEditFood component', () => {
    it('should render', () => {
        const { container } = render(<PageEditFood {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('should call addItem when name has not changed', async () => {
        const newCategory = 'Dairy';
        const newUnit = 'kilograms';

        render(<PageEditFood {...props} />, context);

        await selectEvent.select(screen.getByLabelText('Change item unit:'), newUnit);
        userEvent.click(screen.getByText(newCategory));
        userEvent.click(screen.getByText('Save Changes'));

        screen.getByTestId('loading');

        expect(mockAddItem).toHaveBeenCalledWith(
            {
                batches: batchesObject,
                category: newCategory.toLowerCase(),
                name: 'broccoli',
                unit: newUnit
            },
            UserDan.household
        );
    });

    it.skip('should call addItemDeleteItem when name changes to a new name', async () => {
        const newName = 'editing-item-name';

        render(<PageEditFood {...props} />, context);

        await selectEvent.create(screen.getByLabelText('Change item name:'), newName);

        userEvent.click(screen.getByText('Save Changes'));

        expect(mockAddItemDeleteItem).toHaveBeenCalledWith(
            {
                batches: batchesObject,
                category: 'vegetables',
                name: newName,
                unit: 'servings'
            },
            'broccoli',
            UserDan.household
        );
    });

    it.skip('should call addItemDeleteItem when name changes to an existing name', async () => {
        const newCategory = 'Meat';

        render(<PageEditFood {...props} />, context);

        await selectEvent.select(screen.getByLabelText('Change item name:'), 'Steak (7 servings)');
        userEvent.click(screen.getByText(newCategory));

        userEvent.click(screen.getByText('Save Changes'));

        screen.getByTestId('loading');

        expect(mockAddItemDeleteItem).toHaveBeenCalledWith(
            {
                batches: batchesObject,
                category: newCategory.toLowerCase(),
                name: 'steak',
                unit: 'servings'
            },
            'broccoli',
            UserDan.household
        );
    });

    it('should render toast notification if API errors', async () => {
        const message = 'error message';

        mockAddItem.mockRejectedValueOnce({ message });

        render(<PageEditFood {...props} />, context);

        await selectEvent.select(screen.getByLabelText('Change item unit:'), 'kilograms');
        userEvent.click(screen.getAllByText('Save Changes')[0]);

        screen.getByTestId('loading');

        await waitFor(() => expect(mockToastError).toHaveBeenCalledWith(message));
    });

    it('should call addNewUnit if a new unit does not exist', async () => {
        const newUnit = 'brand-new-unit';

        render(<PageEditFood {...props} />, context);

        await selectEvent.create(screen.getByLabelText('Change item unit:'), newUnit);
        userEvent.click(screen.getAllByText('Save Changes')[0]);

        await waitFor(() =>
            expect(mockAddNewUnit).toHaveBeenCalledWith([...props.metadata.units, newUnit], UserDan.household)
        );
    });
});
