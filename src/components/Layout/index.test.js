import React from 'react';
import { Layout } from '.';

describe('Layout component', () => {
    it('should render', () => {
        const { container } = render(<Layout>Chicken</Layout>);
        expect(container.firstChild).toMatchSnapshot();
    });
});