import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { db, firebase } from '../../services';
import { NotificationType, UserType, TenantType } from '../../types';
import { Button } from '../Button';
import * as S from './styles';

const acceptHouseholdInvite = firebase.functions().httpsCallable('acceptHouseholdInvite');
const declineHouseholdInvite = firebase.functions().httpsCallable('declineHouseholdInvite');

type NotificationsProps = {
    notifications: NotificationType[];
    onClose: () => void;
    user: UserType;
};

export const Notifications: FC<NotificationsProps> = ({ notifications, onClose, user }) => {
    const [isLoading, setIsLoading] = useState(false);
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

    const handleInviteDecision = (item: NotificationType, didAccept: boolean) => async () => {
        setIsLoading(true);

        if (didAccept) {
            const myTenant: TenantType = {
                email: user.email,
                name: user.name,
                photo: user.photo,
                uid: user.uid
            };

            try {
                await acceptHouseholdInvite({
                    notification: item,
                    tenant: myTenant,
                    currentHouseholdId: user.household
                });

                toast.success('You have joined another household');
                history.push('/food');
            } catch (error) {
                toast.error('Something went wrong joining another household');
            }
        } else {
            try {
                await declineHouseholdInvite({
                    inviterId: item.inviteData?.inviterUserId,
                    inviteeName: user.name,
                    inviteeId: user.uid,
                    inviteId: item.uid
                });

                toast.error('You have declined the invite');
            } catch (error) {
                toast.error('Something went wrong decline the invite');
            }
        }
        setIsLoading(false);
    };

    return (
        <S.List data-testid="notifications">
            <S.Title>Your Notifications:</S.Title>

            {notifications.length === 0 && <p>You don&apos;t have any notifications</p>}

            {notifications.map((item) => (
                <S.Item key={item.uid}>
                    <S.Text>{item.description}</S.Text>

                    {item.type === 'invite' && !isLoading && (
                        <>
                            <Button margin="0 1rem 0 0" onClick={handleInviteDecision(item, false)} secondary>
                                Decline
                            </Button>

                            <Button onClick={handleInviteDecision(item, true)}>Accept</Button>
                        </>
                    )}

                    {item.type === 'invite' && isLoading && <S.InviteButton isLoading={isLoading}>Responding</S.InviteButton>}

                    {item.type === 'text' && (
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
