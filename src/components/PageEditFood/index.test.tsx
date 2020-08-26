import React from 'react';

import { render } from '../../test-utils';
import { Fridge } from '../../fixtures';
import { PageEditFood } from '.';

const props = {
    fridge: Fridge
};

describe('PageEditFood component', () => {
    it('should render', () => {
        const { container } = render(<PageEditFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
