import React from 'react';

import { render } from '../../test-utils';
import { UserDan } from '../../fixtures';
import { ProfilePhoto } from '.';

const props = {
    owner: UserDan
};

describe('ProfilePhoto component', () => {
    it('should render initials if photo not provided', () => {
        const noPhotoUser = {
            name: 'Dan Page',
            email: 'dan@google.com'
        };

        const { container, getByText } = render(<ProfilePhoto {...props} owner={noPhotoUser} />);
        expect(container.firstChild).toMatchSnapshot();
        getByText('DP');
    });

    it('should render a photo if url provided', () => {
        const { getByTestId } = render(<ProfilePhoto {...props} />);
        getByTestId('photo');
    });
});
