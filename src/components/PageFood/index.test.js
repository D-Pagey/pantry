import React from 'react';
import { Categories } from '../../fixtures/categories';
import { Fridge } from '../../fixtures/fridge';
import { PageFood } from '.';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({
        category: 'meat'
    }))
}));

const context = {
    categories: Categories,
    fridge: Fridge,
    updateFridge: () => {}
};

describe('PageFood component', () => {
    it('should render', () => {
        const { container } = render(<PageFood />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a loading spinner initially', () => {
        const overrideContext = {
            fridge: [],
            categories: []
        };

        const { getByTestId } = render(<PageFood />, { ...context, ...overrideContext });
        getByTestId('loading');
    });

    it.todo('when the category is all, it should render all food');
    it.todo('when the category is all, it should render a column of category links');
    it.todo('when the category is not all, it should filter down fridge');
    it.todo('when the category doesnt exist, it should redirect');
    it.todo('should render a message when there is no data for a category');
});
