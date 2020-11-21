import React, { FC } from 'react';

import { CloseIcon } from './CloseIcon';
import { TickIcon } from './TickIcon';
import * as S from './styles';

export type NotificationButtonProps = {
    dismiss?: boolean;
    disabled?: boolean;
};

export const NotificationButton: FC<NotificationButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    dismiss,
    disabled,
    ...props
}) => {
    if (disabled) {
        return <S.DisabledButton {...props}>{dismiss ? <CloseIcon disabled /> : <TickIcon />}</S.DisabledButton>;
    }

    if (dismiss) {
        return (
            <S.DismissButton {...props}>
                <CloseIcon />
            </S.DismissButton>
        );
    }

    return (
        <S.AcceptButton {...props}>
            <TickIcon />
        </S.AcceptButton>
    );
};
