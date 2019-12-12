import React from 'react';
import PageHome from '.';

const props = {
    categoryCounts: [{ category: 'Meat', count: 1 }]
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
