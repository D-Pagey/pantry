import React, { FC } from 'react';

import { NotificationType } from '../../types';
import { Button } from '../Button';
import * as S from './styles';

type NotificationsProps = {
    handleClick: (itemUid: string, didAccept: boolean) => void;
    notifications: NotificationType[];
};

export const Notifications: FC<NotificationsProps> = ({ handleClick, notifications }) => {
    const handleDecisionClick = (itemUid: string, didAccept: boolean) => () => handleClick(itemUid, didAccept);

    return (
        <S.Wrapper>
            <S.Title>Notifications:</S.Title>

            <S.List>
                {notifications.map((item) => (
                    <S.Item key={item.uid}>
                        <S.Text>{item.description}</S.Text>

                        <Button margin="0 1rem 0 0" onClick={handleDecisionClick(item.uid, true)}>
                            Accept
                        </Button>

                        <Button onClick={handleDecisionClick(item.uid, false)} secondary>
                            Decline
                        </Button>
                    </S.Item>
                ))}
            </S.List>
        </S.Wrapper>
    );
};
