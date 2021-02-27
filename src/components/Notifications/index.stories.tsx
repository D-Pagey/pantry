import { UnreadNotification, UserDan, WelcomeNotification, RejectedNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    notifications: [WelcomeNotification, UnreadNotification, RejectedNotification],
    onClose: () => null,
    user: UserDan
};

export default { title: 'Notifications' };

export const normal = (): JSX.Element => (
    <div style={{ width: 50, position: 'relative', right: '-210px' }}>
        <Notifications {...props} />
    </div>
);
