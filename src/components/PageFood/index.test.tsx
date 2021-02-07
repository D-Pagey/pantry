import React from 'react';
import { titleCase } from 'title-case';
import userEvent from '@testing-library/user-event';

import { render, waitFor } from '../../test-utils';
import { Fridge, ExpiredBatch, FreshBatch, UserDan, TenantHeidi, TenantDan, TenantJoe } from '../../fixtures';
import { PageFood } from '.';

const context = {
    user: UserDan
};

const emptyProps = {
    fridge: [],
    tenants: []
};

const props = {
    fridge: Fridge,
    tenants: [TenantHeidi, TenantJoe, TenantDan]
};

describe('PageFood component', () => {
    it('should render', () => {
        const { container } = render(<PageFood {...emptyProps} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('when the category is all, it should render all food', () => {
        const { getByText } = render(<PageFood {...props} fridge={Fridge} />, context);

        userEvent.click(getByText('All'));

        Fridge.forEach((item) => {
            if (item.batches.length > 0) {
                getByText(titleCase(item.name));
            }
        });
    });

    it('should render a message when no data for category all', () => {
        const { getByText } = render(<PageFood {...props} fridge={[]} />, context);
        getByText('No food for the above filters, click the X to remove a filter');
    });

    it.skip('should render a message when there is no data for a category', async () => {
        const overrideprops = {
            fridge: Fridge.filter((item) => item.category === 'meat')
        };

        const { getByText, findByTestId } = render(<PageFood {...props} {...overrideprops} />, context);

        userEvent.click(getByText('Veg'));

        await findByTestId('pageFoodNoDatavegetables');
    });

    it.skip.each`
        categoryName    | categoryLabel
        ${'dairy'}      | ${'Dairy'}
        ${'fruit'}      | ${'Fruit'}
        ${'meat'}       | ${'Meat'}
        ${'vegetables'} | ${'Veg'}
    `('when the category is $categoryName, it should filter down fridge', async ({ categoryName, categoryLabel }) => {
        const { getByText, queryByText, findByText } = render(<PageFood {...props} fridge={Fridge} />, context);

        userEvent.click(getByText(categoryLabel));

        Fridge.forEach(async (item) => {
            if (item.batches.length === 0) return null;

            if (item.category === categoryName) {
                return await findByText(titleCase(item.name));
            }

            return await waitFor(() => expect(queryByText(titleCase(item.name))).toBe(null));
        });
    });

    it.skip('should show only expiring items when clicked on expiring button', async () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrot',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                category: 'meat',
                name: 'steak',
                unit: 'servings'
            }
        ];

        const { getByText, queryByText, findByText } = render(<PageFood {...props} fridge={ExpiringFridge} />, context);

        userEvent.click(getByText('Expiring soon'));

        findByText(titleCase(ExpiringFridge[0].name));
        await waitFor(() => expect(queryByText(titleCase(ExpiringFridge[1].name))).toBe(null));
    });

    it.skip('should show all items if click expiring toggle on then off again', async () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrot',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                category: 'meat',
                name: 'steak',
                unit: 'servings'
            }
        ];

        const { getByText, queryByText, findByText } = render(<PageFood {...props} fridge={ExpiringFridge} />, context);

        userEvent.click(getByText('Expiring soon'));

        findByText(titleCase(ExpiringFridge[0].name));
        expect(queryByText(titleCase(ExpiringFridge[1].name))).toBe(null);

        userEvent.click(getByText('Expiring soon x'));

        ExpiringFridge.map((item) => {
            return getByText(titleCase(item.name));
        });
    });

    it.skip('should handle expiring toggle when filtered down', () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrot',
                unit: 'servings'
            },
            {
                batches: [ExpiredBatch],
                category: 'meat',
                name: 'steak',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                category: 'vegetables',
                name: 'broccoli',
                unit: 'servings'
            }
        ];

        const { getByText, queryByText } = render(<PageFood {...props} fridge={ExpiringFridge} />, context);

        // filter to just vegetables
        userEvent.click(getByText('Veg'));

        // check only vegetables are rendering
        Fridge.map((item) => {
            if (item.category === 'vegetables') {
                return getByText(titleCase(item.name));
            }

            return expect(queryByText(titleCase(item.name))).toBe(null);
        });

        // filter down to expiring items
        userEvent.click(getByText('Expiring soon'));

        // check there are expiring vegetables
        getByText('Carrot');
        expect(queryByText('Broccoli')).toBe(null);
        expect(queryByText('Steak')).toBe(null);
    });

    it.skip('should handle expiring on then off when filtered down', () => {
        const ExpiringFridge = [
            {
                batches: [ExpiredBatch],
                category: 'vegetables',
                name: 'carrot',
                unit: 'servings'
            },
            {
                batches: [ExpiredBatch],
                category: 'meat',
                name: 'steak',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                category: 'vegetables',
                name: 'broccoli',
                unit: 'servings'
            }
        ];

        const { getByText, queryByText } = render(<PageFood {...props} fridge={ExpiringFridge} />, context);

        // filter above fridge down to vegetables
        userEvent.click(getByText('Veg'));

        // check that only vegetables are rendered
        Fridge.map((item) => {
            if (item.category === 'vegetables') {
                return getByText(titleCase(item.name));
            }

            return expect(queryByText(titleCase(item.name))).toBe(null);
        });

        // toggle on expiring item
        userEvent.click(getByText('Expiring soon'));

        // expect an expiring item to be there
        getByText('Carrot');
        // expect a non-expiring vegetable to render
        expect(queryByText('Broccoli')).toBe(null);
        // expect a non-vegetable to render
        expect(queryByText('Steak')).toBe(null);

        // toggle off expiring, show all fridge options
        userEvent.click(getByText('Expiring soon x'));

        // expect all vegetables to render
        getByText('Carrot');
        getByText('Broccoli');
    });

    it.skip('should render a message if no items in that category', () => {
        const { getByText, getByTestId } = render(<PageFood {...props} fridge={Fridge} />, context);

        userEvent.click(getByText('Fish'));

        getByTestId('pageFoodNoDatafish');
    });

    it.skip('should render a message if no expiring items in that category', () => {
        const { getByText } = render(<PageFood {...props} fridge={Fridge} />, context);

        userEvent.click(getByText('Fish'));
        userEvent.click(getByText('Expiring soon'));

        getByText('There is no expiring food that falls under the category of fish');
    });

    it.skip('should not render food card if no batches on Fridge item', () => {
        const overrideProps = {
            fridge: [
                {
                    batches: [],
                    category: 'vegetables',
                    name: 'carrot',
                    unit: 'servings'
                },
                {
                    batches: [FreshBatch],
                    category: 'meat',
                    name: 'steak',
                    unit: 'servings'
                }
            ]
        };

        const { queryByText, getByText } = render(<PageFood {...props} {...overrideProps} />, context);

        expect(queryByText(titleCase(overrideProps.fridge[0].name))).toBe(null);
        getByText(titleCase(overrideProps.fridge[1].name));
    });

    it.skip('should render foodOptions component', () => {
        const { getByText, getByTestId } = render(<PageFood {...props} fridge={Fridge} />, context);

        userEvent.click(getByText(titleCase(Fridge[0].name)));

        getByTestId('foodOptions');
    });

    it.skip('if showing, should remove FoodOptions component if clicked again', () => {
        const { getByText, getByTestId, queryByText } = render(<PageFood {...props} fridge={Fridge} />, context);

        const itemName = Fridge[0].name;

        userEvent.click(getByText(titleCase(itemName)));

        getByTestId('foodOptions');

        userEvent.click(getByText(titleCase(itemName)));

        expect(queryByText('foodOptions')).toBe(null);
    });

    it.skip('should handle delete', () => {
        const contextOveride = {
            ...context,
            deleteFoodItem: jest.fn()
        };

        const itemName = Fridge[0].name;

        const { getByText, getByTestId } = render(<PageFood {...props} />, contextOveride);

        userEvent.click(getByText(titleCase(itemName)));

        getByTestId('foodOptions');

        userEvent.click(getByText(`Eat all ${itemName}'s`));

        expect(contextOveride.deleteFoodItem).toHaveBeenCalledWith(itemName);
    });
});
