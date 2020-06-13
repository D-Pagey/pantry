import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { titleCase } from 'title-case';
import userEvent from '@testing-library/user-event';

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
    fridge: [],
};

describe.skip('PageFood component', () => {
    it('should render', () => {
        const { container } = render(<PageFood />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        category
        ${'all'}
        ${'meat'}
    `('should render a loading spinner initially when category = $category', ({ category }) => {
        // when fridge is undefined, loading spinner


        useParams.mockImplementation(() => ({
            category
        }));

        const { getByTestId } = render(<PageFood />, context);
        getByTestId('loading');
    });

    it.skip('when the category is all, it should render all food', () => {
        // useParams.mockImplementation(() => ({
        //     category: 'all'
        // }));

        // const overrideContext = {
        //     fridge: Fridge
        // };

        // const { getByText } = render(<PageFood />, { ...context, ...overrideContext });
        // Fridge.map((item) => getByText(titleCase(item.name)));
    });

    it.skip('when the category is not all, it should filter down fridge', () => {
        // useParams.mockImplementation(() => ({
        //     category: CategoriesArray[1].name
        // }));

        // const overrideContext = {
        //     categories: CategoriesArray,
        //     fridge: Fridge
        // };

        // const { getByText, queryByText } = render(<PageFood />, { ...context, ...overrideContext });

        // Fridge.map((item) => {
        //     if (item.categories.includes(CategoriesArray[1].id)) {
        //         return getByText(titleCase(item.name));
        //     }

        //     return expect(queryByText(item.name)).toBe(null);
        // });
    });

    it.skip('when the category doesnt exist, it should redirect', () => {
        useParams.mockImplementationOnce(() => ({
            category: 'hello'
        }));

        // const overrideContext = {
        //     categories: CategoriesArray,
        //     fridge: Fridge
        // };

        // render(<PageFood />, { ...context, ...overrideContext });
        expect(Redirect).toHaveBeenCalledWith({ to: '/not-found' }, expect.any(Object));
    });

    it.skip('should render a message when no data for category all', () => {
        useParams.mockImplementation(() => ({
            category: 'all'
        }));

        // const overrideContext = {
        //     categories: CategoriesArray,
        // };

        // const { getByTestId } = render(<PageFood />, { ...context, ...overrideContext });
        // getByTestId('pageFoodNoData');
    });

    it.skip('should render a message when there is no data for a category', () => {
        // useParams.mockImplementation(() => ({
        //     category: CategoriesArray[3].name
        // }));

        // const overrideContext = {
        //     categories: CategoriesArray,
        //     fridge: Fridge
        // };

        // const { getByTestId } = render(<PageFood />, { ...context, ...overrideContext });
        // getByTestId('pageFoodNoData');
    });

    it.skip('should handle an edit food click', () => {
        useParams.mockImplementation(() => ({
            category: 'all'
        }));

        // const overrideContext = {
        //     categories: CategoriesArray,
        //     fridge: Fridge,
        //     updateFridge: jest.fn()
        // };

        // const { getAllByTestId } = render(<PageFood />, { ...context, ...overrideContext });
        // const button = getAllByTestId('editButton')[0];

        // userEvent.click(button);

        // expect(mockHistoryPush).toHaveBeenCalledWith('/add', Fridge[0]);
    });
});
