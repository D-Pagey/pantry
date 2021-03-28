import { FC } from 'react';

import { getInitials } from './utils';
import * as S from './styles';

type ProfilePhotoTypes = {
    photo: string;
    email: string;
    width?: string;
    name?: string;
    onClick?: () => void;
};

const ProfilePhotoCore: FC<ProfilePhotoTypes> = ({ name, email, photo, width, ...props }) => {
    if (photo) return <S.Image src={photo} width={width} alt="profile" {...props} />;

    return (
        <S.Circle width={width} {...props}>
            <S.Initials>{getInitials({ name, email })}</S.Initials>
        </S.Circle>
    );
};

export const ProfilePhoto: FC<ProfilePhotoTypes> = ({ onClick, photo, width, email, name, ...props }) => {
    if (onClick) {
        return (
            <S.Button onClick={onClick} type="button" {...props}>
                <ProfilePhotoCore photo={photo} width={width} email={email} name={name} />
            </S.Button>
        );
    }

    return <ProfilePhotoCore photo={photo} width={width} email={email} name={name} {...props} />;
};
