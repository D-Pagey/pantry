import React from 'react';

import { render } from '../../test-utils';
import { Tenant } from '../../fixtures';
import { ProfilePhoto } from '.';

const props = {
    fullName: Tenant.name,
    photoUrl: null
};

describe('ProfilePhoto component', () => {
    it('should render', () => {
        const { container } = render(<ProfilePhoto {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a photo if url provided', () => {
        const { getByTestId } = render(<ProfilePhoto {...props} photoUrl={Tenant.photo} />);
        getByTestId('photo');
    });
});
