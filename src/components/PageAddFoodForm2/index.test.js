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

        getByText('How many servings?');
    });

    it('should render step 3 of the form once hit next on step 2', () => {
        const { getByTestId, getByLabelText, getByText } = render(<PageAddFoodForm2 />);

        userEvent.click(getByTestId('meatCategoryButton'));
        userEvent.type(getByLabelText('What type of meat is it?'), 'chicken');
        userEvent.click(getByTestId('singleSelectButton0'));
        userEvent.click(getByText('Next'));
        
        getByText('When is it going to expire?');
    });
});
