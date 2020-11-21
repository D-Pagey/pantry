import React, { FC } from 'react';
import * as S from './styles';

type ExpiringPillProps = {
    handleClick: () => void;
    isEnabled?: boolean;
};

export const ExpiringPill: FC<ExpiringPillProps> = ({ handleClick, isEnabled, ...props }) => (
    <S.Wrapper onClick={handleClick} isEnabled={isEnabled} data-testid="expiringPill" {...props}>
        <S.Text>Expiring soon {isEnabled && 'x'}</S.Text>
    </S.Wrapper>
);
