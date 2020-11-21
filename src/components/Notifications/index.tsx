import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { db, firebase } from '../../services';
import { NotificationType, UserType, TenantType } from '../../types';
import { NotificationButton } from '../NotificationButton';
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
                houseRole: 'tenant',
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
                    inviteId: item.uid,
                    inviterHousehold: item.inviteData?.inviterHouseholdId
                });

                toast.error('You have declined the invite');
            } catch (error) {
                toast.error('Something went wrong declining the invite');
            }
        }
        setIsLoading(false);
    };

    return (
        <S.List data-testid="notifications">
            <S.Title>Your Notifications:</S.Title>

            {notifications.map((item) => (
                <S.Item key={item.uid}>
                    <S.Text>{item.description}</S.Text>

                    {item.type === 'invite' ? (
                        <>
                            <S.NotificationButton disabled={isLoading} onClick={handleInviteDecision(item, true)} />
                            <NotificationButton
                                disabled={isLoading}
                                dismiss
                                onClick={handleInviteDecision(item, false)}
                            />
                        </>
                    ) : (
                        <NotificationButton disabled={isLoading} dismiss onClick={handleDismissClick(item.uid)} />
                    )}
                </S.Item>
            ))}

            <S.CloseWrapper>
                {notifications.length === 0 && <span>You don&apos;t have any notifications</span>}

                {isLoading ? (
                    <S.CloseButton isLoading={isLoading}>Responding</S.CloseButton>
                ) : (
                    <S.CloseButton secondary onClick={onClose}>
                        Close
                    </S.CloseButton>
                )}
            </S.CloseWrapper>
        </S.List>
    );
};
