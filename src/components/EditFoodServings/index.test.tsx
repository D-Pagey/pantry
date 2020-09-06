import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Fridge, TenantHeidi } from '../../fixtures';
import { EditFoodServings } from '.';

const mockHistoryPush = jest.fn();
const mockHistoryBack = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
        goBack: mockHistoryBack
    })
}));

const props = {
    item: Fridge[0],
    tenants: [TenantHeidi]
};

describe('EditFoodServings component', () => {
    it('should render', () => {
        const { container } = render(<EditFoodServings {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should redirect if cancelled', () => {
        const { getByText } = render(<EditFoodServings {...props} />);

        userEvent.click(getByText('Cancel'));

        expect(mockHistoryBack).toHaveBeenCalled();
    });

    it.todo('should redirect once updatedFridge');
    it.todo('should update remove correct servings amount');
    it.todo('should remove a batch if checked last serving');
    it.todo('should update remove correct servings amount when checked and unchecked');
});
