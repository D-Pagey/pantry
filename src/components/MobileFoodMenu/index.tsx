import { FC } from 'react';
import { Button } from '../Button';
import filterLogo from './filter.svg';
import * as S from './styles';

export type MobileFoodMenuProps = {
    handleFilterClick: () => void;
};

export const MobileFoodMenu: FC<MobileFoodMenuProps> = ({ handleFilterClick }) => (
    <S.Wrapper>
        <S.FilterButton onClick={handleFilterClick} data-testid="filterMenuButton">
            <S.FilterImage src={filterLogo} alt="filter menu" />
        </S.FilterButton>

        <Button>Add Item</Button>
    </S.Wrapper>
);
