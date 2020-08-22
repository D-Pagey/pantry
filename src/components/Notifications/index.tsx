import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { db, firebase } from '../../services';
import { NotificationType, UserType, TenantType } from '../../types';
import { Button } from '../Button';
import * as S from './styles';

type NotificationsProps = {
    notifications: NotificationType[];
    onClose: () => void;
    user: UserType;
};

export const Notifications: FC<NotificationsProps> = ({ notifications, onClose, user }) => {
    const history = useHistory();

    const dismissNotification = (notificationId: string) => {
        db.collection('users')
            .doc(user.uid)
            .update({
                [`notifications.${notificationId}`]: firebase.firestore.FieldValue.delete()
            })
            .then(() => toast.info('Notification dismissed'))
            .catch(() => toast.error('Error dismissing notification'));
    };

    const handleDismissClick = (itemUid: string) => () => dismissNotification(itemUid);

    const handleInviteDecision = (item: NotificationType, didAccept: boolean) => () => {
        if (didAccept) {
            const acceptedUid = uuidv4();

            const acceptNotification: NotificationType = {
                createdAt: new Date(),
                description: `${user.name} has accepted your invitation`,
                type: 'text',
                uid: acceptedUid
            };

            const myTenant: TenantType = {
                email: user.email,
                name: user.name,
                photo: user.photo,
                uid: user.uid
            };

            // notify the inviter
            db.collection('users')
                .doc(item.inviteData?.inviterUserId)
                .update({
                    [`notifications.${acceptedUid}`]: acceptNotification
                })
                .then(() => {})
                .catch(() => toast.error('Error accepting invite'));

            // add your user id to new household users array
            db.collection('households')
                .doc(item.inviteData?.inviterHouseholdId)
                .update({
                    [`tenants.${user.uid}`]: myTenant
                })
                .then(() => console.log('added household users'))
                .catch(() => toast.error('Error adding user to household'));

            // remove your user id from your original household users array
            db.collection('households')
                .doc(user.household)
                .update({
                    [`tenants.${user.uid}`]: firebase.firestore.FieldValue.delete()
                })
                .then(() => console.log('removed from household users'))
                .catch(() => toast.error('Error adding user to household'));

            // change your own household
            db.collection('users')
                .doc(user.uid)
                .update({
                    household: item.inviteData?.inviterHouseholdId
                })
                .then(() => toast.success('You have joined another household'))
                .catch(() => toast.error('Error accepting invite'));

            history.push('/food');
        } else {
            const declinedUid = uuidv4();

            const declinedNotification: NotificationType = {
                createdAt: new Date(),
                description: `${user.name} has declined your invitation`,
                type: 'text',
                uid: declinedUid
            };
            // notify the inviter
            db.collection('users')
                .doc(item.inviteData?.inviterUserId)
                .update({
                    [`notifications.${declinedUid}`]: declinedNotification
                })
                .then(() => 'You have declined the invite')
                .catch(() => toast.error('Error accepting invite'));
        }
        // remove notification from your own notifications
        dismissNotification(item.uid);
    };

    return (
        <S.List>
            <S.Title>Your Notifications:</S.Title>

            {notifications.length === 0 && <p>You don&apos;t have any notifications</p>}

            {notifications.map((item) => (
                <S.Item key={item.uid}>
                    <S.Text>{item.description}</S.Text>

                    {item.type === 'invite' ? (
                        <>
                            <Button margin="0 1rem 0 0" onClick={handleInviteDecision(item, false)} secondary>
                                Decline
                            </Button>

                            <Button onClick={handleInviteDecision(item, true)}>Accept</Button>
                        </>
                    ) : (
                        <S.DismissButton secondary onClick={handleDismissClick(item.uid)}>
                            Dismiss
                        </S.DismissButton>
                    )}
                </S.Item>
            ))}

            <S.CloseButton secondary onClick={onClose}>
                Close
            </S.CloseButton>
        </S.List>
    );
};
