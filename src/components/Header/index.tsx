import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Icon from './icon.svg';
import Arrow from './arrow.svg';
import * as S from './styles';

type HeaderTypes = {
    page?: string;
};

export const Header: FC<HeaderTypes> = ({ page }) => {
    const history = useHistory();
    const isMobile = useMediaQuery({
        query: '(max-device-width: 760px)'
    });

    const handleBack = (): void => history.goBack();

    return (
        <S.Wrapper>
            <S.LogoWrapper>
                {page ? (
                    <S.Arrow src={Arrow} onClick={handleBack} alt="arrow" data-testid="headerBackArrow" />
                ) : (
                    <S.Link to="/">
                        <S.Logo src={Icon} alt="icon" />
                    </S.Link>
                )}

                {page ? (
                    <S.Title>{page}</S.Title>
                ) : (
                    <S.Link to="/">
                        <S.Title>Pantry</S.Title>
                    </S.Link>
                )}
            </S.LogoWrapper>

            {!isMobile && (
                <S.NavList>
                    <S.NavItem>
                        <S.Link to="/">Home</S.Link>
                    </S.NavItem>

                    <S.NavItem>
                        <S.Link to="/food">Your Food</S.Link>
                    </S.NavItem>

                    <S.NavItem>
                        <S.Link to="/add">Add Food</S.Link>
                    </S.NavItem>

                    {/* <S.NavItem>
                        <S.Link to="/">Notifications</S.Link>
                    </S.NavItem> */}

                    <S.NavItem>
                        <S.Link to="/settings">Settings</S.Link>
                    </S.NavItem>
                </S.NavList>
            )}
        </S.Wrapper>
    );
};
