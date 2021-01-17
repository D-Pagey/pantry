import React from 'react';
import selectEvent from 'react-select-event';
import { render, screen } from '../../test-utils';
import { Fridge, TenantHeidi, UserDan } from '../../fixtures';
import { addItemDeleteItem, updateItemField } from '../../services/firestore';
import { PageEditFood } from '.';
import userEvent from '@testing-library/user-event';

jest.mock('../../services/firestore');
jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        name: 'broccoli'
    })
}));

const props = {
    fridge: Fridge,
    tenants: [TenantHeidi]
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

    it('should call addItemDeleteItem when name changes to a new name', async () => {
        const newName = 'editing-item-name';

        render(<PageEditFood {...props} />, context);

        await selectEvent.create(screen.getByLabelText('Change item name:'), newName);

        userEvent.click(screen.getByText('Save Changes'));

        expect(addItemDeleteItem).toHaveBeenCalledWith(
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

    it('should call addItemDeleteItem when name changes to an existing name', async () => {
        render(<PageEditFood {...props} />, context);

        await selectEvent.select(screen.getByLabelText('Change item name:'), 'Steak (7 servings)');

        userEvent.click(screen.getByText('Save Changes'));

        expect(addItemDeleteItem).toHaveBeenCalledWith(
            {
                batches: batchesObject,
                category: 'meat',
                name: 'steak',
                unit: 'servings'
            },
            'broccoli',
            UserDan.household
        );
    });

    it('should call updateItemField if just the category changes', () => {
        const category = 'Dairy';

        render(<PageEditFood {...props} />, context);

        userEvent.click(screen.getByText(category));

        userEvent.click(screen.getByText('Save Changes'));

        expect(updateItemField).toHaveBeenCalledWith('broccoli', 'category', category.toLowerCase(), UserDan.household);
    });

    it('should call addItemDeleteItem when name and category changes to a new item name', async () => {
        const newName = 'new-name-and-category';
        const category = 'Dairy';

        render(<PageEditFood {...props} />, context);

        await selectEvent.create(screen.getByLabelText('Change item name:'), newName);
        userEvent.click(screen.getByText(category));

        userEvent.click(screen.getByText('Save Changes'));

        expect(addItemDeleteItem).toHaveBeenCalledWith(
            {
                batches: batchesObject,
                category: category.toLowerCase(),
                name: newName,
                unit: 'servings'
            },
            'broccoli',
            UserDan.household
        );
    });

    it('should call addItemDeleteItem when name and category changes to an existing name', async () => {
        const category = 'Dairy';

        render(<PageEditFood {...props} />, context);

        await selectEvent.select(screen.getByLabelText('Change item name:'), 'Steak (7 servings)');
        userEvent.click(screen.getByText(category));

        userEvent.click(screen.getByText('Save Changes'));

        expect(addItemDeleteItem).toHaveBeenCalledWith(
            {
                batches: batchesObject,
                category: category.toLowerCase(),
                name: 'steak',
                unit: 'servings'
            },
            'broccoli',
            UserDan.household
        );
    });
});
