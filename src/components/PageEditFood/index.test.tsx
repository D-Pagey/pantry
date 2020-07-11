import React from 'react';
import { render } from '../../test-utils';
import { PageEditFood } from '.';

const props = {
    updateFridge: () => {}
};

describe('PageEditFood component', () => {
    // TODO: mock location state
    it('should render', () => {
        const { container } = render(<PageEditFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
