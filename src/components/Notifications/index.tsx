import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { db, firebase } from '../../services';
import { NotificationType } from '../../types';
import { AuthContext } from '../ProviderAuth';
import { Button } from '../Button';
import * as S from './styles';

export const Notifications: FC = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const dismissNotification = (notificationId: string) => {
        db.collection('users')
            .doc(user?.uid)
            .update({
                [`notifications.${notificationId}`]: firebase.firestore.FieldValue.delete()
            })
            .then(() => toast.info('Notification dismissed'))
            .catch(() => toast.error('Error dismissing notification'));
    };

    const handleDismissClick = (itemUid: string) => () => dismissNotification(itemUid);

    const handleInviteClick = (item: NotificationType, didAccept: boolean) => () => {
        if (didAccept) {
            const acceptedUid = uuidv4();

            const acceptNotification: NotificationType = {
                createdAt: new Date(),
                description: `${user?.name} has accepted your invitation`,
                type: 'text',
                uid: acceptedUid
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
                    users: firebase.firestore.FieldValue.arrayUnion(user?.uid)
                })
                .then(() => console.log('added household users'))
                .catch(() => toast.error('Error adding user to household'));

            // remove your user id from your original household users array
            db.collection('households')
                .doc(user?.household)
                .update({
                    users: firebase.firestore.FieldValue.arrayRemove(user?.uid)
                })
                .then(() => console.log('removed from household users'))
                .catch(() => toast.error('Error adding user to household'));

            // change your own household
            db.collection('users')
                .doc(user?.uid)
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
                description: `${user?.name} has declined your invitation`,
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
        <S.Wrapper>
            <S.Title>Notifications:</S.Title>

            <S.List>
                {user?.notifications!.length === 0 && <p>No notifications</p>}

                {user?.notifications!.map((item) => (
                    <S.Item key={item.uid}>
                        <S.Text>{item.description}</S.Text>

                        {item.type === 'invite' ? (
                            <>
                                <Button margin="0 1rem 0 0" onClick={handleInviteClick(item, true)}>
                                    Accept
                                </Button>

                                <Button onClick={handleInviteClick(item, false)} secondary>
                                    Decline
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleDismissClick(item.uid)}>Dismiss</Button>
                        )}
                    </S.Item>
                ))}
            </S.List>
        </S.Wrapper>
    );
};
