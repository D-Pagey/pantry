import React, { FC } from 'react';
import * as S from './styles';

type ExpiringPillProps = {
    handleClick: () => void;
    isEnabled?: boolean;
    margin?: string;
};

export const ExpiringPill: FC<ExpiringPillProps> = ({ handleClick, isEnabled, margin }) => (
    <S.Wrapper onClick={handleClick} isEnabled={isEnabled} margin={margin} data-testid="expiringPill">
        <S.Text>Expiring soon {isEnabled && 'x'}</S.Text>
    </S.Wrapper>
);
