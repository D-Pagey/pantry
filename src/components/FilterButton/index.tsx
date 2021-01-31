import { FC } from 'react';
import * as S from './styles';

export type FilterButtonProps = {
    onClick: () => void;
    children: string;
};

export const FilterButton: FC<FilterButtonProps> = ({ children, onClick }) => (
    <S.Wrapper>
        <S.Span>{children}</S.Span>
        <S.Button onClick={onClick}>X</S.Button>
    </S.Wrapper>
);
