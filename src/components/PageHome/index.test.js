import React from 'react';
import { toast } from 'react-toastify';
import PageHome from '.';

const props = {};

const context = {
    categoryCounts: [{ label: 'Meat', colour: 'red', count: 1 }],
    isAuthed: false,
    isCheckingAuth: true
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading spinner if checking auth', () => {
        const { queryByTestId } = render(<PageHome {...props} />, context);
        expect(queryByTestId('pageHome')).toBeNull();
    });

    it('should render category list if authed', () => {
        const { getByTestId } = render(<PageHome {...props} />, {
            ...context,
            isAuthed: true,
            isCheckingAuth: false
        });
        getByTestId('categoryList');
    });

    it('should render a notification with the amount to expiring items', async () => {
        const mockToast = jest.spyOn(toast, 'warn');

        const updatedContext = {
            ...context,
            isAuthed: true,
            isCheckingAuth: false,
            expiringFood: ['fake A', 'fake B', 'fake C']
        };

        render(<PageHome {...props} />, updatedContext);

        expect(
            mockToast
        ).toHaveBeenCalledWith(
            `You have ${updatedContext.expiringFood.length} items expiring in the next 2 days!`,
            { onClick: expect.any(Function) }
        );
    });

    it.todo('should redirect to /expiring on click');
});
