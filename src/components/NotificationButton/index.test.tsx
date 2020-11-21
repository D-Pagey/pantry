import React from 'react';
import { render } from '../../test-utils';
import { NotificationButton } from '.';

describe('Button component', () => {
    it('should render', () => {
        const { container } = render(<NotificationButton>X</NotificationButton>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
