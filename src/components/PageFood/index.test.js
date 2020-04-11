import React from 'react';
import { PageFood } from '.';

describe('PageFood component', () => {
    it('should render', () => {
        const { container } = render(<PageFood />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should render a loading spinner initially');
    it.todo('when the category is all, it should render all food');
    it.todo('when the category is all, it should render a column of category links');
    it.todo('when the category is not all, it should filter down fridge');
    it.todo('when the category doesnt exist, it should redirect');
    it.todo('should render a message when there is no data for a category');
});