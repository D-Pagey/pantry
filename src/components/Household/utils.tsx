import { HouseRoleType } from '../../types';
import * as S from './styles';

export const getEmoji = (houseRole: HouseRoleType) => {
    if (houseRole === 'admin') {
        return (
            // eslint-disable-next-line
            <S.Span role="img" aria-label="avocado">
                🥑
            </S.Span>
        );
    }

    if (houseRole === 'tenant') {
        return (
            // eslint-disable-next-line
            <S.Span role="img" aria-label="carrot">
                🥕
            </S.Span>
        );
    }

    if (houseRole === 'alexa') {
        return (
            // eslint-disable-next-line
            <S.Span role="img" aria-label="robot">
                🤖
            </S.Span>
        );
    }

    // pending
    return (
        // eslint-disable-next-line
        <S.Span role="img" aria-label="potato">
            🥔
        </S.Span>
    );
};
