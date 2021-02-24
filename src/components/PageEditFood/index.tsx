import React, { FC, useContext, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { titleCase } from 'title-case';
import { toast } from 'react-toastify';

import { convertBatchesArray, formatDropdownOptions, formatFoodDropdownOptions } from '../../utils';
import { FoodType, MetaDataType, TenantType } from '../../types';
import { addItemDeleteItem, addItem, addNewUnit } from '../../services/firestore';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import { init, initialState, itemReducer } from './itemReducer';
import * as S from './styles';

type PageEditFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
    metadata: MetaDataType;
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, tenants, metadata }) => {
    const { user } = useContext(AuthContext);
    const { name } = useParams<{ name: string }>();
    const [state, dispatch] = useReducer(itemReducer, initialState, (intialItemState) =>
        init(intialItemState, fridge, name)
    );
    const history = useHistory();

    const nonPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

    const handleSaveChanges = async () => {
        const { originalItem, editedItem } = state;
        const hasNameChanged = originalItem.name !== editedItem.name;

        dispatch({ type: 'TOGGLE_LOADING' });

        try {
            // name hasn't changed so update the existing item
            if (!hasNameChanged) {
                const convertedFoodItem = convertBatchesArray([editedItem])[0];
                await addItem(convertedFoodItem, user!.household!);
            } else {
                // name has changed so update new name and remove old name batches
                const existingItem = fridge.filter((item) => item.name === editedItem.name)[0];
                const mergedItem = {
                    ...existingItem,
                    ...editedItem,
                    batches: existingItem ? [...existingItem.batches, ...editedItem.batches] : editedItem.batches
                };
                const convertedMergedItem = convertBatchesArray([mergedItem])[0];

                await addItemDeleteItem(convertedMergedItem, originalItem.name, user!.household!);
            }

            if (!metadata.units.includes(editedItem.unit)) {
                const updatedUnits = [...metadata.units, editedItem.unit];

                await addNewUnit(updatedUnits, user!.household!);
            }

            history.push('/food');
        } catch (error) {
            dispatch({ type: 'TOGGLE_LOADING' });
            toast.error(error.message);
        }
    };

    return (
        <Layout isLoading={state.loading} hideTitle>
            {state.originalItem.name && (
                <S.Wrapper>
                    <S.Title>
                        Edit your <S.Span>{titleCase(state.originalItem.name)}</S.Span>:
                    </S.Title>

                    <S.Grid>
                        <S.Label htmlFor="editItemName">Change item name:</S.Label>
                        <S.CreatableDropdown
                            defaultValue={state.originalItem.name}
                            options={formatFoodDropdownOptions(fridge)}
                            setSelected={(name: string) => dispatch({ type: 'CHANGE_NAME', name })}
                            inputName="editItemName"
                        />

                        <S.Label htmlFor="editItemUnit">Change item unit:</S.Label>
                        <S.CreatableDropdown
                            defaultValue={state.originalItem.unit}
                            options={formatDropdownOptions(metadata.units)}
                            setSelected={(unit: string) => dispatch({ type: 'CHANGE_UNIT', unit })}
                            inputName="editItemUnit"
                        />

                        <S.Label column="1/2">Change category:</S.Label>
                        <S.CreatableDropdown
                            defaultValue={state.originalItem.category}
                            options={formatDropdownOptions(metadata.categories)}
                            setSelected={(category: string) => dispatch({ type: 'CHANGE_CATEGORY', category })}
                            inputName="editItemCategory"
                        />

                        <S.Label column="2/3" row="3/4">
                            Change date or owner:
                        </S.Label>
                        <EditFoodServings item={state.editedItem} tenants={nonPendingTenants} dispatch={dispatch} />

                        <S.ButtonWrapper>
                            <S.Button onClick={() => history.push('/food')} secondary>
                                Back
                            </S.Button>
                            <S.Button onClick={handleSaveChanges} disabled={!state.hasItemChanged}>
                                Save Changes
                            </S.Button>
                        </S.ButtonWrapper>
                    </S.Grid>
                </S.Wrapper>
            )}
        </Layout>
    );
};
