import React from 'react';
import Media from 'react-media';
import * as S from './styles';

const Header: React.FC = () => (
    <S.Header>
        <S.Link to="/">
            <S.Title>Pantry</S.Title>
        </S.Link>

        <Media
            query="(min-width: 476px)"
            render={(): JSX.Element => (
                <S.List data-testid="desktopNavList">
                    <S.Item>
                        <S.StyledNavLink to="/" exact>Check Fridge</S.StyledNavLink>
                    </S.Item>
                    <S.Item>
                        <S.StyledNavLink to="/add">Add Food</S.StyledNavLink>
                    </S.Item>
                </S.List>
            )}
        />
    </S.Header>
);

export default Header;
