import React, { FC } from 'react';

import tick from './tick.svg';
import close from './close.svg';
import * as S from './styles';

export type NotificationButtonProps = {
    secondary?: boolean;
};

export const NotificationButton: FC<NotificationButtonProps> = ({ secondary, ...props }) => {
    if (secondary) {
        return (
            <S.SecondaryButton {...props}>
                <S.Image src={close} alt="dismiss" />
            </S.SecondaryButton>
        );
    }

    return (
        <S.Button {...props}>
            <S.Image src={tick} alt="accept" />
        </S.Button>
    );
};
