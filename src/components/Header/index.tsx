import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FeedbackFish } from '@feedback-fish/react';

import { UserType } from '../../types';
import { mediaQuery } from '../../tokens';
import { AuthContext } from '../ProviderAuth';
import { Notifications } from '../Notifications';
import Icon from './icon.svg';
import Arrow from './arrow.svg';
import { Bell } from './Bell';
import * as S from './styles';

type HeaderTypes = {
    page?: string;
};

export const Header: FC<HeaderTypes> = ({ page }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const hasNotifications = user?.notifications && user.notifications.length > 0;

    const handleBack = (): void => history.goBack();

    const toggleNotifications = (): void => setShowNotifications(!showNotifications);
    const closeNotifications = (): void => setShowNotifications(false);

    return (
        <S.Wrapper>
            <S.InnerWrapper>
                <S.LogoWrapper>
                    {page ? (
                        <>
                            <S.Arrow src={Arrow} onClick={handleBack} alt="arrow" data-testid="headerBackArrow" />
                            <S.Title>{page}</S.Title>
                        </>
                    ) : (
                        <>
                            <S.Link to="/">
                                <S.Logo src={Icon} alt="icon" />
                            </S.Link>
                            <S.Link to="/">
                                <S.Title>Pantry</S.Title>
                            </S.Link>
                        </>
                    )}
                </S.LogoWrapper>

                {user && !isTabletOrLarger && (
                    <S.BellWrapper>
                        <S.NotificationsButton
                            type="button"
                            onClick={toggleNotifications}
                            data-testid="header-notifications"
                        >
                            <Bell color={hasNotifications ? '#1976D2' : undefined} />
                        </S.NotificationsButton>

                        {showNotifications && user?.notifications && (
                            <Notifications
                                notifications={user.notifications}
                                onClose={closeNotifications}
                                user={user as UserType}
                            />
                        )}
                    </S.BellWrapper>
                )}

                {user && isTabletOrLarger && (
                    <S.NavList>
                        <S.NavItem>
                            <S.Link to="/food">Your Food</S.Link>
                        </S.NavItem>

                        <S.NavItem>
                            <S.Link to="/add">Add Food</S.Link>
                        </S.NavItem>

                        <S.NavItem>
                            <S.NotificationsButton
                                type="button"
                                onClick={toggleNotifications}
                                hasNotifications={hasNotifications}
                            >
                                Notifications
                            </S.NotificationsButton>
                            {showNotifications && user?.notifications && (
                                <Notifications
                                    notifications={user.notifications}
                                    onClose={closeNotifications}
                                    user={user as UserType}
                                />
                            )}
                        </S.NavItem>

                        <S.NavItem>
                            <FeedbackFish projectId="ebf44b54be5b15">
                                <span style={{ cursor: 'pointer' }}>Send feedback</span>
                            </FeedbackFish>
                        </S.NavItem>

                        <S.NavItem>
                            <S.Link to="/settings">Settings</S.Link>
                        </S.NavItem>
                    </S.NavList>
                )}

                {!user && isTabletOrLarger && (
                    <S.NavList>
                        <S.NavItem>
                            <FeedbackFish projectId="ebf44b54be5b15">
                                <span style={{ cursor: 'pointer' }}>Send feedback</span>
                            </FeedbackFish>
                        </S.NavItem>

                        <S.NavItem>
                            <S.Link to="/sign-in">Sign In / Sign Up</S.Link>
                        </S.NavItem>
                    </S.NavList>
                )}
            </S.InnerWrapper>
        </S.Wrapper>
    );
};
