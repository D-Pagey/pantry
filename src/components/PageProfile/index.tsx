import React from 'react';
import { string } from 'prop-types';

type ProfileTypes = {
    email: string;
    name: string;
};

const PageProfile = ({ email, name }: ProfileTypes): JSX.Element => (
    <div>
        <p>Welcome {name}</p>
        <p>Your email is: {email}</p>
    </div>
);

PageProfile.propTypes = {
    email: string.isRequired,
    name: string.isRequired
};

export default PageProfile;
