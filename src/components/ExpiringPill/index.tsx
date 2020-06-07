import React, { FC } from 'react';
import * as S from './styles';

type ExpiringPillProps = {
    handleClick: Function;
    isEnabled?: boolean;
};

export const ExpiringPill: FC<ExpiringPillProps> = ({ handleClick, isEnabled }) => (
    <S.Wrapper onClick={handleClick} isEnabled={isEnabled} data-testid="expiringPill">
        <S.Text>Expiring soon {isEnabled && 'x'}</S.Text>
    </S.Wrapper>
);
