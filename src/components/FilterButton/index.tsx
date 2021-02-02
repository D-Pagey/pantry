import { FC } from 'react';
import * as S from './styles';

export type FilterButtonProps = {
    children: string;
    onClick?: () => void;
};

export const FilterButton: FC<FilterButtonProps> = ({ children, onClick }) => (
    <S.Wrapper>
        <S.Span fullBorderRadius={onClick === undefined}>{children}</S.Span>
        {onClick !== undefined && <S.Button onClick={onClick}>X</S.Button>}
    </S.Wrapper>
);
