import React from 'react';
import Loading from '.';

describe('Loading component', () => {
    it('should render', () => {
        const { container } = render(<Loading />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
