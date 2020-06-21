import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { Fridge } from '../../fixtures';
import { EditFoodItem } from '.';

const props = {
    item: Fridge[0]
};

describe('EditFoodItem component', () => {
    it('should render', () => {
        const { container } = render(<EditFoodItem {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should update remove correct servings amount', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<EditFoodItem {...props} />, { updateFridge });

        userEvent.click(getByTestId('2-0'));
        userEvent.click(getByTestId('3-0'));
        userEvent.click(getByTestId('editFoodItemSubmit'));

        expect(updateFridge).toHaveBeenCalledWith({
            batches: [
                { expires: expect.any(Date), owner: '1', servings: 1 },
                { expires: expect.any(Date), owner: '2', servings: 1 },
                { expires: expect.any(Date), owner: '3', servings: 3 }
            ],
            category: 'vegetables',
            name: 'carrots'
        });
    });

    it('should remove a batch if checked last serving', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<EditFoodItem {...props} />, { updateFridge });

        userEvent.click(getByTestId('1-0'));
        userEvent.click(getByTestId('editFoodItemSubmit'));

        expect(updateFridge).toHaveBeenCalledWith({
            batches: [
                { expires: expect.any(Date), owner: '2', servings: 2 },
                { expires: expect.any(Date), owner: '3', servings: 4 }
            ],
            category: 'vegetables',
            name: 'carrots'
        });
    });

    it('should update remove correct servings amount when checked and unchecked', () => {
        const updateFridge = jest.fn();
        const { getByTestId } = render(<EditFoodItem {...props} />, { updateFridge });

        userEvent.click(getByTestId('1-0'));
        userEvent.click(getByTestId('1-0'));

        userEvent.click(getByTestId('2-0'));
        userEvent.click(getByTestId('2-0'));

        userEvent.click(getByTestId('3-0'));
        userEvent.click(getByTestId('editFoodItemSubmit'));

        expect(updateFridge).toHaveBeenCalledWith({
            batches: [
                { expires: expect.any(Date), owner: '1', servings: 1 },
                { expires: expect.any(Date), owner: '2', servings: 2 },
                { expires: expect.any(Date), owner: '3', servings: 3 }
            ],
            category: 'vegetables',
            name: 'carrots'
        });
    });
});
