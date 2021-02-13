import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../Button';
import editImage from './edit.svg';
import deleteImage from './delete.svg';
import filterImage from './filter.svg';
import * as S from './styles';

export type MobileFoodMenuProps = {
    handleFoodDelete: () => void;
    handleFoodEdit: () => void;
    openModal: () => void;
    showItemMenu: boolean;
};

export const MobileFoodMenu: FC<MobileFoodMenuProps> = ({
    handleFoodEdit,
    handleFoodDelete,
    openModal,
    showItemMenu
}) => {
    const history = useHistory();

    const handleAddClick = () => history.push('/add');

    return (
        <S.Wrapper>
            {showItemMenu && (
                <>
                    <S.FilterButton onClick={handleFoodDelete} data-testid="mobileFoodMenuDeleteButton">
                        <S.FilterImage src={deleteImage} alt="filter menu" />
                    </S.FilterButton>

                    <S.FilterButton onClick={handleFoodEdit} data-testid="mobileFoodMenuEditButton">
                        <S.FilterImage src={editImage} alt="filter menu" />
                    </S.FilterButton>
                </>
            )}

            <S.FilterButton onClick={openModal} data-testid="filterMenuButton">
                <S.FilterImage src={filterImage} alt="filter menu" />
            </S.FilterButton>

            <Button onClick={handleAddClick}>Add Item</Button>
        </S.Wrapper>
    );
};
