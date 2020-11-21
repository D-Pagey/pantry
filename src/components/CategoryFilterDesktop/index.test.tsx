import React from 'react';
import { render } from '../../test-utils';
import { CategoryFilterDesktop } from '.';

const props = {
    categories: { meat: 5, fish: 2, vegetables: 1, dairy: 1 },
    handleCategoryClick: (category: string) => console.log({ category }),
    selected: 'all'
};

describe('CategoryFilterDesktop component', () => {
    it('should render', () => {
        const { container } = render(<CategoryFilterDesktop {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
