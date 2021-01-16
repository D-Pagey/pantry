import React, { FC } from 'react';

import { getInitials } from './utils';
import * as S from './styles';

type ProfilePhotoTypes = {
    photo: string;
    email: string;
    width?: string;
    name?: string;
    onClick?: () => void;
};

export const ProfilePhoto: FC<ProfilePhotoTypes> = ({ onClick, photo, width, email, name, ...props }) => {
    if (photo)
        return <S.Image onClick={onClick} src={photo} width={width} alt="profile" data-testid="photo" {...props} />;

    console.log({ photo, initials: getInitials({ name, email }), name, email });

    return (
        <S.Circle onClick={onClick} width={width} {...props}>
            <S.Initials>{getInitials({ name, email })}</S.Initials>
        </S.Circle>
    );
};
