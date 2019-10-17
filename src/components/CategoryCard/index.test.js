import React from 'react';
import CategoryCard from '.';

const props = {
    category: 'meat',
    quantity: 2
};

describe('CategoryCard component', () => {
    it('should render', () => {
        const { container } = render(<CategoryCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        category        | colour
        ${'meat'}       | ${'red'}
        ${'fish'}       | ${'blue'}
        ${'vegetables'} | ${'green'}
        ${'other'}      | ${'purple'}
        ${'all'}        | ${'orange'}
    `('should have a $colour border for $category', ({ category, colour }) => {
        const { getByTestId } = render(<CategoryCard {...props} category={category} />);
        expect(getByTestId('categoryCard')).toHaveStyleRule('border', `3px solid ${colour}`);
    });
});
