import React, { FC } from 'react';
import * as S from './styles';

type ProfilePhotoTypes = {
    photoUrl: string | null;
    fullName: string;
};

export const ProfilePhoto: FC<ProfilePhotoTypes> = ({ photoUrl, fullName }) => {
    if (photoUrl) return <S.Image src={photoUrl} alt="profile" data-testid="photo" />;

    const initials = fullName.split(' ').map(word => word[0]).join('');

    return (
        <S.Circle>
            <S.Initials>{initials}</S.Initials>
        </S.Circle>
    );
};
