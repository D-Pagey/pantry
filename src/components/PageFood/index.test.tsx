import React from 'react';
import { titleCase } from 'title-case';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Fridge, ExpiredBatch, FreshBatch } from '../../fixtures';
import { PageFood } from '.';

const context = {
    deleteFoodItem: () => {},
    fridge: Fridge
};

describe('PageFood component', () => {
    it('should render', () => {
        const { container } = render(<PageFood />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a loading spinner', () => {
        const { getByTestId } = render(<PageFood />, { ...context, fridge: undefined });
        getByTestId('loading');
    });

    it('when the category is all, it should render all food', () => {
        const { getByText } = render(<PageFood />, context);

        userEvent.click(getByText('All'));

        Fridge.map((item) => getByText(titleCase(item.name)));
    });

    it('should render a message when no data for category all', () => {
        const { getByTestId } = render(<PageFood />, { ...context, fridge: [] });
        getByTestId('pageFoodNoData');
    });

    it('should render a message when there is no data for a category', () => {
        const overrideContext = {
            ...context,
            fridge: Fridge.filter((item) => item.category === 'meat')
        };

        const { getByTestId, getByText } = render(<PageFood />, overrideContext);

        userEvent.click(getByText('Veg'));

        getByTestId('pageFoodNoDatavegetables');
    });

    it.each`
        categoryName    | categoryLabel
        ${'dairy'}      | ${'Dairy'}
        ${'fruit'}      | ${'Fruit'}
        ${'meat'}       | ${'Meat'}
        ${'vegetables'} | ${'Veg'}
    `('when the category is $categoryName, it should filter down fridge', ({ categoryName, categoryLabel }) => {
        const { getByText, queryByText } = render(<PageFood />, context);

        userEvent.click(getByText(categoryLabel));

        Fridge.map((item) => {
            if (item.category === categoryName) {
                return getByText(titleCase(item.name));
            }

            return expect(queryByText(titleCase(item.name))).toBe(null);
        });
    });

    it('should show only expiring items when clicked on expiring button', () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrots'
            },
            {
                batches: [FreshBatch],
                category: 'meat',
                name: 'steak'
            }
        ];

        const { getByText, queryByText } = render(<PageFood />, { ...context, fridge: ExpiringFridge });

        userEvent.click(getByText('Expiring soon'));

        getByText(titleCase(ExpiringFridge[0].name));
        expect(queryByText(titleCase(ExpiringFridge[1].name))).toBe(null);
    });

    it('should show all items if click expiring toggle on then off again', () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrots'
            },
            {
                batches: [FreshBatch],
                category: 'meat',
                name: 'steak'
            }
        ];

        const { getByText, queryByText } = render(<PageFood />, { ...context, fridge: ExpiringFridge });

        userEvent.click(getByText('Expiring soon'));

        getByText(titleCase(ExpiringFridge[0].name));
        expect(queryByText(titleCase(ExpiringFridge[1].name))).toBe(null);

        userEvent.click(getByText('Expiring soon x'));

        ExpiringFridge.map((item) => {
            return getByText(titleCase(item.name));
        });
    });

    it('should handle expiring toggle when filtered down', () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrots'
            },
            {
                batches: [ExpiredBatch],
                category: 'meat',
                name: 'steak'
            },
            {
                batches: [FreshBatch],
                category: 'vegetables',
                name: 'broccoli'
            }
        ];

        const { getByText, queryByText } = render(<PageFood />, { ...context, fridge: ExpiringFridge });

        userEvent.click(getByText('Veg'));

        Fridge.map((item) => {
            if (item.category === 'vegetables') {
                return getByText(titleCase(item.name));
            }

            return expect(queryByText(titleCase(item.name))).toBe(null);
        });

        userEvent.click(getByText('Expiring soon'));

        getByText('Carrots');
        expect(queryByText('Broccoli')).toBe(null);
        expect(queryByText('Steak')).toBe(null);
    });

    it('should handle expiring on then off when filtered down', () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrots'
            },
            {
                batches: [ExpiredBatch],
                category: 'meat',
                name: 'steak'
            },
            {
                batches: [FreshBatch],
                category: 'vegetables',
                name: 'broccoli'
            }
        ];

        const { getByText, queryByText } = render(<PageFood />, { ...context, fridge: ExpiringFridge });

        userEvent.click(getByText('Veg'));

        Fridge.map((item) => {
            if (item.category === 'vegetables') {
                return getByText(titleCase(item.name));
            }

            return expect(queryByText(titleCase(item.name))).toBe(null);
        });

        userEvent.click(getByText('Expiring soon'));

        getByText('Carrots');
        expect(queryByText('Broccoli')).toBe(null);
        expect(queryByText('Steak')).toBe(null);

        userEvent.click(getByText('Expiring soon x'));

        getByText('Carrots');
        getByText('Broccoli');
    });

    it('should render a message if no items in that category', () => {
        const { getByText, getByTestId } = render(<PageFood />, context);

        userEvent.click(getByText('Fish'));

        getByTestId('pageFoodNoDatafish');
    });

    it('should render a message if no expiring items in that category', () => {
        const { getByText } = render(<PageFood />, context);

        userEvent.click(getByText('Fish'));
        userEvent.click(getByText('Expiring soon'));

        getByText('There is no expiring food that falls under the category of fish');
    });

    it('should not render food card if no batches on Fridge item', () => {
        const contextOveride = {
            ...context,
            fridge: [
                {
                    batches: [],
                    category: 'vegetables',
                    name: 'carrots'
                },
                {
                    batches: [FreshBatch],
                    category: 'meat',
                    name: 'steak'
                }
            ]
        };

        const { queryByText, getByText } = render(<PageFood />, contextOveride);

        expect(queryByText(titleCase(contextOveride.fridge[0].name))).toBe(null);
        getByText(titleCase(contextOveride.fridge[1].name));
    });

    it('should render disposeFood component', () => {
        const { getByText, getByTestId } = render(<PageFood />, context);

        userEvent.click(getByText(titleCase('carrots')));

        getByTestId('disposeFood');
    });

    it('if showing, should remove DisposeFood component if clicked again', () => {
        const { getByText, getByTestId, queryByText } = render(<PageFood />, context);

        userEvent.click(getByText(titleCase('carrots')));

        getByTestId('disposeFood');

        userEvent.click(getByText(titleCase('carrots')));

        expect(queryByText('disposeFood')).toBe(null);
    });

    it('should handle delete', () => {
        const contextOveride = {
            ...context,
            deleteFoodItem: jest.fn()
        };

        const name = 'carrots';

        const { getByText, getByTestId } = render(<PageFood />, contextOveride);

        userEvent.click(getByText(titleCase(name)));

        getByTestId('disposeFood');

        userEvent.click(getByText('Eat'));

        expect(contextOveride.deleteFoodItem).toHaveBeenCalledWith(name);
    });
});
