import { FC, useState, useReducer } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';

import { TenantType } from '../../types';
import { Button } from '../Button';
import { ProfilePhoto } from '../ProfilePhoto';
import editImage from './edit.svg';
import deleteImage from './delete.svg';
import filterImage from './filter.svg';
import { reducer, initialState, SortOptions } from './reducer';
import * as S from './styles';

export type MobileFoodMenuProps = {
    handleFoodDelete: () => void;
    tenants: TenantType[];
    editingItemName?: string;
};

export const MobileFoodMenu: FC<MobileFoodMenuProps> = ({ editingItemName, handleFoodDelete, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const handleSortByClick = (sortOption: SortOptions) => () => {
        dispatch({
            type: 'CHANGE_SORTED_BY',
            payload: sortOption
        });
    };

    const handleAddClick = () => history.push('/add');

    const handleFoodEdit = (): void => {
        history.push(`/${editingItemName}/edit`);
    };

    return (
        <>
            <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                <div>
                    <S.Title>Set Filters</S.Title>

                    <S.OptionWrapper>
                        <S.Subtitle>Owners:</S.Subtitle>
                        {tenants.map(({ uid, email, photo }) => (
                            <ProfilePhoto key={uid} photo={photo} email={email} />
                        ))}
                    </S.OptionWrapper>

                    <S.OptionWrapper>
                        <S.Subtitle>Sort By:</S.Subtitle>
                        <S.Button onClick={handleSortByClick('date')} selected={state.sortBy === 'date'}>
                            Date
                        </S.Button>
                        <S.Button onClick={handleSortByClick('name')} selected={state.sortBy === 'name'}>
                            Name
                        </S.Button>
                    </S.OptionWrapper>

                    <S.OptionWrapper>
                        <S.Subtitle>Show:</S.Subtitle>
                        <Button>Expiring Soon</Button>
                        <Button>All Items</Button>
                    </S.OptionWrapper>

                    <S.Subtitle>Categories:</S.Subtitle>
                    <p>Vegetables</p>

                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button>Apply Filters</Button>
                </div>
            </ReactModal>

            <S.Wrapper>
                {!!editingItemName && (
                    <>
                        <S.FilterButton onClick={handleFoodDelete} data-testid="filterMenuButton">
                            <S.FilterImage src={deleteImage} alt="filter menu" />
                        </S.FilterButton>

                        <S.FilterButton onClick={handleFoodEdit} data-testid="filterMenuButton">
                            <S.FilterImage src={editImage} alt="filter menu" />
                        </S.FilterButton>
                    </>
                )}

                <S.FilterButton onClick={() => setIsModalOpen(true)} data-testid="filterMenuButton">
                    <S.FilterImage src={filterImage} alt="filter menu" />
                </S.FilterButton>

                <Button onClick={handleAddClick}>Add Item</Button>
            </S.Wrapper>
        </>
    );
};
