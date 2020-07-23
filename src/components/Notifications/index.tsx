import React, { FC } from 'react';

import { NotificationType } from '../../types';
import { Button } from '../Button';
import * as S from './styles';

type NotificationsProps = {
    notifications: NotificationType[];
};

export const Notifications: FC<NotificationsProps> = ({ notifications }) => {
    return (
        <S.Wrapper>
            <S.Title>Notifications:</S.Title>

            <S.List>
                {notifications.map((item) => (
                    <S.Item>
                        {item.description}
                        <div>
                            <Button margin="0 1rem 0 0">Accept</Button> <Button secondary>Decline</Button>
                        </div>
                    </S.Item>
                ))}
            </S.List>
        </S.Wrapper>
    );
};
