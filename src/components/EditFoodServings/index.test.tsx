import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Fridge, ExpiredPhotoBatch } from '../../fixtures';
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
    item: { ...Fridge[0], batches: [ExpiredPhotoBatch] },
    updateFridge: () => {}
};

describe('EditFoodServings component', () => {
    it('should render', () => {
        const { container } = render(<EditFoodServings {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should update remove correct servings amount', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<EditFoodServings {...props} updateFridge={updateFridge} />);

        userEvent.click(getByTestId('2-0'));
        userEvent.click(getByTestId('3-0'));
        userEvent.click(getByTestId('EditFoodServingsSubmit'));

        expect(updateFridge).toHaveBeenCalledWith({
            batches: [
                { expires: expect.any(Date), ownerId: '1', servings: 1 },
                { expires: expect.any(Date), ownerId: '2', servings: 1 },
                { expires: expect.any(Date), ownerId: '3', servings: 3 }
            ],
            category: 'vegetables',
            name: 'carrot'
        });
    });

    it('should redirect once updatedFridge', () => {
        const { getByTestId } = render(<EditFoodServings {...props} />);

        userEvent.click(getByTestId('2-0'));
        userEvent.click(getByTestId('3-0'));
        userEvent.click(getByTestId('EditFoodServingsSubmit'));

        expect(mockHistoryPush).toHaveBeenCalledWith('/food');
    });

    it('should redirect if cancelled', () => {
        const { getByText } = render(<EditFoodServings {...props} />);

        userEvent.click(getByText('Cancel'));

        expect(mockHistoryBack).toHaveBeenCalled();
    });

    it('should remove a batch if checked last serving', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<EditFoodServings {...props} updateFridge={updateFridge} />);

        userEvent.click(getByTestId('1-0'));
        userEvent.click(getByTestId('EditFoodServingsSubmit'));

        expect(updateFridge).toHaveBeenCalledWith({
            batches: [
                { expires: expect.any(Date), ownerId: '2', servings: 2 },
                { expires: expect.any(Date), ownerId: '3', servings: 4 }
            ],
            category: 'vegetables',
            name: 'carrot'
        });
    });

    it('should update remove correct servings amount when checked and unchecked', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<EditFoodServings {...props} updateFridge={updateFridge} />);

        userEvent.click(getByTestId('1-0'));
        userEvent.click(getByTestId('1-0'));

        userEvent.click(getByTestId('2-0'));
        userEvent.click(getByTestId('2-0'));

        userEvent.click(getByTestId('3-0'));
        userEvent.click(getByTestId('EditFoodServingsSubmit'));

        expect(updateFridge).toHaveBeenCalledWith({
            batches: [
                { expires: expect.any(Date), ownerId: '1', servings: 1 },
                { expires: expect.any(Date), ownerId: '2', servings: 2 },
                { expires: expect.any(Date), ownerId: '3', servings: 3 }
            ],
            category: 'vegetables',
            name: 'carrot'
        });
    });
});
