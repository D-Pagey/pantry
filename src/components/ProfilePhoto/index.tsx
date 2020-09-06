import React, { FC } from 'react';

import { UserType } from '../../types';
import * as S from './styles';

type ProfilePhotoTypes = {
    owner: Partial<UserType>;
    width?: string;
};

export const ProfilePhoto: FC<ProfilePhotoTypes> = ({ owner, width, ...props }) => {
    if (owner) {
        const { photo, email, name } = owner;

        if (photo) return <S.Image src={photo} width={width} alt="profile" data-testid="photo" {...props} />;

        const getInitials = () => {
            let nameOrEmail = '';

            if (name) {
                nameOrEmail = name;
            } else if (email) {
                nameOrEmail = email;
            }

            return nameOrEmail
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase();
        };

        return (
            <S.Circle width={width} {...props}>
                <S.Initials>{getInitials()}</S.Initials>
            </S.Circle>
        );
    }

    return null;
};
