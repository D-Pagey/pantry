import React, { FC } from 'react';

import { UserType } from '../../types';
import * as S from './styles';

type FriendsProps = {
    friends: UserType[];
};

export const Friends: FC<FriendsProps> = ({ friends }) => (
    <S.List>
        {friends.map((friend) => (
            <S.Item>
                <S.Span>{friend.name}</S.Span>
                <S.Span>{friend.email}</S.Span>
                <S.Image src={friend.photo} alt="user" />
            </S.Item>
        ))}
    </S.List>
);
