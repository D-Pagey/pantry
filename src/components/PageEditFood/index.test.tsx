import React from 'react';

import { render } from '../../test-utils';
import { UserDan, UserJoe } from '../../fixtures';
import { PageEditFood } from '.';

const props = {
    fridgeUsers: [UserDan, UserJoe],
    updateFridge: () => {}
};

describe('PageEditFood component', () => {
    // TODO: mock location state
    it('should render', () => {
        const { container } = render(<PageEditFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
