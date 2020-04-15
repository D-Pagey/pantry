import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { CategoriesArray, Fridge } from '../../fixtures';
import { PageFood } from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({
        category: 'meat'
    })),
    Redirect: jest.fn(() => null),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

const context = {
    categories: CategoriesArray,
    fridge: Fridge,
    deleteFoodItem: () => {}
};

describe('PageFood component', () => {
    it('should render', () => {
        const { container } = render(<PageFood />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a loading spinner initially', () => {
        const overrideContext = {
            categories: [],
            fridge: []
        };

        const { getByTestId } = render(<PageFood />, { ...context, ...overrideContext });
        getByTestId('loading');
    });

    it('when the category is all, it should render all food', () => {
        useParams.mockImplementation(() => ({
            category: 'all'
        }));

        const { getByText } = render(<PageFood />, context);
        Fridge.map((item) => getByText(item.name));
    });

    it('when the category is not all, it should filter down fridge', () => {
        useParams.mockImplementation(() => ({
            category: CategoriesArray[1].name
        }));

        const { getByText, queryByText } = render(<PageFood />, context);

        Fridge.map((item) => {
            if (item.categories.includes(CategoriesArray[1].id)) {
                return getByText(item.name);
            }

            return expect(queryByText(item.name)).toBe(null);
        });
    });

    it('when the category doesnt exist, it should redirect', () => {
        useParams.mockImplementationOnce(() => ({
            category: 'hello'
        }));

        render(<PageFood />, context);
        expect(Redirect).toHaveBeenCalledWith({ to: '/not-found' }, expect.any(Object));
    });

    it('should render a message when there is no data for a category', () => {
        useParams.mockImplementation(() => ({
            category: CategoriesArray[3].name
        }));

        const { getByTestId } = render(<PageFood />, context);
        getByTestId('pageFoodNoData');
    });

    it('should handle an edit food click', () => {
        useParams.mockImplementation(() => ({
            category: 'all'
        }));

        const updateFridge = jest.fn();
        const { getAllByTestId } = render(<PageFood />, { ...context, updateFridge });
        const button = getAllByTestId('editButton')[0];

        userEvent.click(button);

        expect(mockHistoryPush).toHaveBeenCalledWith('/add', Fridge[0]);
    });

    it.todo('should refilter if category changes');
});
