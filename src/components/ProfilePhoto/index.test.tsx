import React from 'react';

import { render, screen } from '../../test-utils';
import { UserDan } from '../../fixtures';
import { ProfilePhoto } from '.';

const props = {
    name: UserDan.name,
    email: UserDan.email,
    photo: UserDan.photo
};

describe('ProfilePhoto component', () => {
    it('should render initials if photo not provided', () => {
        const noPhotoUser = {
            name: 'Dan Page',
            email: 'dan@google.com',
            photo: ''
        };

        const { container } = render(<ProfilePhoto {...props} {...noPhotoUser} />);
        expect(container.firstChild).toMatchSnapshot();
        screen.getByText('DP');
    });
});
