import { FC, useContext, useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { deleteItemBatches } from '../../services/firestore';
import { FoodType, TenantType } from '../../types';
import { mediaQuery } from '../../tokens';
import { Layout } from '../Layout';
import { FoodCard } from '../FoodCard';
import { AuthContext } from '../ProviderAuth';
import { FilterButton } from '../FilterButton';
import { MobileFoodMenu } from '../MobileFoodMenu';
import { ModalFoodFilters } from '../ModalFoodFilters';
import { Button } from '../Button';
import { foodReducer, initialFoodState, init } from './foodReducer';
import { getOwnersButtonText } from './utils';
import * as S from './styles';

type PageFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
    categories: string[];
};

export const PageFood: FC<PageFoodProps> = ({ categories, fridge, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FoodType | undefined>();
    const [state, dispatch] = useReducer(foodReducer, initialFoodState, (initialFoodState) =>
        init(initialFoodState, tenants, fridge)
    );
    const { food, appliedFilters, pendingFilters } = state;
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'UPDATE_FRIDGE', fridge });
    }, [fridge]);

    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const handleFoodClick = (item: FoodType) => (): void => {
        if (!editingItem || editingItem.name !== item.name) setEditingItem(item);
        if (editingItem?.name === item.name) setEditingItem(undefined);
    };

    const handleFoodDelete = async () => {
        if (editingItem) {
            try {
                await deleteItemBatches(editingItem.name, user!.household!);
            } catch (error) {
                toast.error(`Something went wrong deleting ${editingItem.name}`);
            }
            setEditingItem(undefined);
        }
    };

    const handleApplyFiltersClick = () => {
        dispatch({ type: 'APPLY_FILTERS', fridge: food });
        setIsModalOpen(false);
    };

    const handleCancelClick = () => {
        dispatch({ type: 'RESET' });

        setIsModalOpen(false);
    };

    const handleFoodEdit = (): void => {
        if (editingItem) {
            history.push(`/${editingItem.name}/edit`);
        }
    };

    return (
        <Layout>
            <S.Wrapper>
                <ModalFoodFilters
                    categories={categories}
                    dispatch={dispatch}
                    filters={pendingFilters}
                    handleCancelClick={handleCancelClick}
                    handleApplyFiltersClick={handleApplyFiltersClick}
                    isModalOpen={isModalOpen}
                    tenants={tenants}
                />

                <S.TopButtonsWrapper>
                    <S.FilterButtonsWrapper>
                        <FilterButton>Sorted by {appliedFilters.sortBy}</FilterButton>
                        {appliedFilters.showOnlyExpiring && (
                            <FilterButton onClick={() => dispatch({ type: 'REMOVE_EXPIRING_FILTER', fridge })}>
                                Expiring Soon
                            </FilterButton>
                        )}
                        {appliedFilters.selectedOwners.length > 0 &&
                            appliedFilters.selectedOwners.length !== tenants.length && (
                                <FilterButton
                                    onClick={() => dispatch({ type: 'REMOVE_SELECTED_OWNERS', fridge, tenants })}
                                >
                                    {getOwnersButtonText(appliedFilters.selectedOwners, tenants)}
                                </FilterButton>
                            )}

                        {appliedFilters.category && (
                            <FilterButton onClick={() => dispatch({ type: 'REMOVE_CATEGORY', fridge })}>
                                {appliedFilters.category}
                            </FilterButton>
                        )}
                    </S.FilterButtonsWrapper>

                    {isTabletOrLarger && (
                        <S.ModifyButtonsWrapper>
                            {editingItem && (
                                <>
                                    <Button colour="red" onClick={handleFoodDelete} secondary>
                                        Delete
                                    </Button>
                                    <Button colour="blue" onClick={handleFoodEdit} secondary>
                                        Edit
                                    </Button>
                                </>
                            )}
                            <Button onClick={() => setIsModalOpen(true)} secondary>
                                Filters
                            </Button>

                            <Button onClick={() => history.push('/add')}>Add Item</Button>
                        </S.ModifyButtonsWrapper>
                    )}
                </S.TopButtonsWrapper>

                {food.length === 0 ? (
                    <p>No food for the above filters, click the X to remove a filter</p>
                ) : (
                    <S.FoodCardGrid>
                        {food.map((item: FoodType) => (
                            <FoodCard
                                handleClick={handleFoodClick(item)}
                                isSelected={item.name === editingItem?.name}
                                item={item}
                                key={item.name}
                                tenants={tenants}
                            />
                        ))}
                    </S.FoodCardGrid>
                )}
            </S.Wrapper>

            {!isTabletOrLarger && (
                <MobileFoodMenu
                    handleFoodDelete={handleFoodDelete}
                    handleFoodEdit={handleFoodEdit}
                    showItemMenu={!!editingItem?.name}
                    openModal={() => setIsModalOpen(true)}
                />
            )}
        </Layout>
    );
};
