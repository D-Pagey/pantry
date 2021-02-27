import { UserDan } from '../../fixtures';
import { ProfilePhoto } from '.';

export default {
    title: 'ProfilePhoto',
    component: ProfilePhoto
};

export const normal = (args: any): JSX.Element => (
    <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', gridGap: '1rem' }}>
        <ProfilePhoto {...args} />
        <ProfilePhoto {...args} name={null} email={UserDan.email} photo={null} />
    </div>
);

normal.args = {
    email: UserDan.email,
    name: UserDan.name,
    photo: UserDan.photo
};
