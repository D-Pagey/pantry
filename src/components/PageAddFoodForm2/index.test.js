import React from 'react';
import userEvent from '@testing-library/user-event';
import { PageAddFoodForm2 } from '.';

describe('PageAddFoodForm2 component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFoodForm2 />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render step 2 of the form once category is clicked', () => {
        const { getByTestId, getByText } = render(<PageAddFoodForm2 />);

        userEvent.click(getByTestId('meatCategoryButton'));

        getByText('Step 2');
    });
});