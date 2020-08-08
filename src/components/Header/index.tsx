import React, { FC, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { NotificationType, UserType } from '../../types';
import { mediaQuery } from '../../tokens';
import { AuthContext } from '../ProviderAuth';
import { Notifications } from '../Notifications';
import Icon from './icon.svg';
import Arrow from './arrow.svg';
import * as S from './styles';

type HeaderTypes = {
    page?: string;
};

export const Header: FC<HeaderTypes> = ({ page }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<NotificationType[]>();
    const { user } = useContext(AuthContext);

    const history = useHistory();
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const handleBack = (): void => history.goBack();

    const toggleNotifications = (): void => setShowNotifications(!showNotifications);
    const closeNotifications = (): void => setShowNotifications(false);

    useEffect(() => {
        if (user && !notifications) {
            setNotifications(user.notifications);
        }
    }, [notifications, user]);

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

            {isTabletOrLarger && (
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

                    <S.NavItem>
                        <S.NotificationsButton type="button" onClick={toggleNotifications}>
                            Notifications
                        </S.NotificationsButton>
                        {showNotifications && user && notifications && (
                            <Notifications
                                notifications={notifications}
                                onClose={closeNotifications}
                                user={user as UserType}
                            />
                        )}
                    </S.NavItem>

                    <S.NavItem>
                        <S.Link to="/settings">Settings</S.Link>
                    </S.NavItem>
                </S.NavList>
            )}
        </S.Wrapper>
    );
};
