import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Fridge, TenantHeidi, UserDan } from '../../fixtures';
import { EditFoodServings } from '.';

const props = {
    item: Fridge[0],
    tenants: [TenantHeidi],
    updateBatch: () => null
};

const context = {
    user: UserDan
};

describe('EditFoodServings component', () => {
    it('should render', () => {
        const { container } = render(<EditFoodServings {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call updateBatch if deleting and new servings are not 0', () => {
        const item = Fridge[1];
        const updateBatch = jest.fn();

        const { getAllByTestId } = render(
            <EditFoodServings {...props} item={item} updateBatch={updateBatch} />,
            context
        );
        const allDeleteButtons = getAllByTestId('deleteServing');

        // click the first batch that has servings > 1
        userEvent.click(allDeleteButtons[1]);

        expect(updateBatch).toHaveBeenCalledWith({
            batch: {
                expires: expect.any(Date),
                id: '22222222',
                ownerId: 'abcde',
                quantity: 1
            },
            name: 'broccoli'
        });
    });
});
