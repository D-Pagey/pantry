import React from 'react';
import { render } from '../../test-utils';
import { Donut } from '.';

const props = {
    date: new Date()
};

describe('Donut component', () => {
    it('should render', () => {
        const { container } = render(<Donut {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
