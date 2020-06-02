import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from './icon.svg';
import Arrow from './arrow.svg';
import * as S from './styles';

type HeaderTypes = {
    page?: string;
};

export const Header: FC<HeaderTypes> = ({ page }) => {
    const history = useHistory();

    const handleBack = (): void => history.goBack();

    return (
        <S.Wrapper>
            {page ? (
                <S.Arrow src={Arrow} onClick={handleBack} alt="arrow" data-testid="headerBackArrow" />
            ) : (
                <S.Link to="/">
                    <S.Logo src={Icon} alt="icon" />
                </S.Link>
            )}

            <S.Title>{page || 'Pantry'}</S.Title>
        </S.Wrapper>
    );
};
