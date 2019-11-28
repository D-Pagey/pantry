import React from 'react';
import { bool, string } from 'prop-types';
import Media from 'react-media';
import * as S from './styles';

type HeaderProps = {
    isAuthed: boolean;
    name: string;
};

const Header = ({ isAuthed, name }: HeaderProps): JSX.Element => (
    <S.Header>
        <S.Link to="/">
            <S.Title>Pantry</S.Title>
        </S.Link>

        <Media
            query="(min-width: 476px)"
            render={(): JSX.Element => (
                <S.List data-testid="desktopNavList">
                    <S.Item>
                        <S.StyledNavLink to="/" exact>
                            Check Fridge
                        </S.StyledNavLink>
                    </S.Item>
                    <S.Item>
                        <S.StyledNavLink to="/add">Add Food</S.StyledNavLink>
                    </S.Item>
                    {isAuthed ? (
                        <S.Item>
                            <S.StyledNavLink to="/profile">{name}</S.StyledNavLink>
                        </S.Item>
                    ) : (
                        <S.Item>
                            <S.StyledNavLink to="/sign-in">Sign In</S.StyledNavLink>
                        </S.Item>
                    )}
                </S.List>
            )}
        />
    </S.Header>
);

Header.propTypes = {
    isAuthed: bool.isRequired,
    name: string.isRequired
};

export default Header;
