import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { titleCase } from 'title-case';

import { convertBatchesArray, formatFoodDropdownOptions } from '../../utils';
import { FoodType, TenantType } from '../../types';
import { addItemDeleteItem, updateItemField } from '../../services/firestore';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import { sortBatches } from '../FoodCard/utils';
import * as S from './styles';

type PageEditFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, tenants }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState<FoodType>();
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const { user } = useContext(AuthContext);
    const { name } = useParams<{ name: string }>();
    const history = useHistory();

    const nonPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

    useEffect(() => {
        const editingItem = fridge.filter((food) => food.name === name)[0];

        if (editingItem) {
            const sortedBatches = sortBatches(editingItem.batches);

            setItem({ ...editingItem, batches: sortedBatches });
            setNewName(editingItem.name);
            setNewCategory(editingItem.category);
        }
    }, [fridge, name]);

    const handleEdit = async () => {
        setIsLoading(true);

        if (item && user?.household) {
            const hasNameChanged = newName !== item.name;
            const hasCategoryChanged = newCategory !== item.category;
            // check if any items with live batches exists with changed name
            const existingItems = fridge.filter((item) => item.batches.length > 0 && item.name === newName);

            // if no newName or newCategory disable button
            // if (!hasNameChanged && !hasCategoryChanged) console.log('nothing changed');

            // if newName but no new category, specifically update name
            if (hasNameChanged && !hasCategoryChanged) {
                let converted;

                if (existingItems.length > 0) {
                    // merge batches of current item and existing item
                    const mergedBatches = [...existingItems[0].batches, ...item.batches];
                    const mergedItem = { ...existingItems[0], batches: mergedBatches };
                    converted = convertBatchesArray([mergedItem]);
                } else {
                    // create a new database food type for current item with new name
                    converted = convertBatchesArray([{ ...item, name: newName.toLowerCase() }]);
                }

                await addItemDeleteItem(converted[0], item.name, user.household);
            }

            // if new category but no new name, specifically update category
            if (!hasNameChanged && hasCategoryChanged) {
                await updateItemField(item.name, 'category', newCategory, user.household);
            }

            // if both updated, update both without deleting batches
            if (hasNameChanged && hasCategoryChanged) {
                let converted;

                if (existingItems.length > 0) {
                    // merge batches of current item and existing item
                    const mergedBatches = [...existingItems[0].batches, ...item.batches];
                    const mergedItem = {
                        batches: mergedBatches,
                        category: newCategory,
                        name: newName,
                        unit: 'servings'
                    };

                    converted = convertBatchesArray([mergedItem]);
                } else {
                    // create a new database food type for current item with new name
                    converted = convertBatchesArray([
                        { ...item, name: newName.toLowerCase(), category: newCategory.toLowerCase() }
                    ]);
                }
                await addItemDeleteItem(converted[0], item.name, user.household);
            }
        }

        history.push('/food');
    };

    return (
        <Layout title={`Edit ${item ? item.name : ''}`} isLoading={isLoading} hideTitle>
            {item && (
                <>
                    <S.Title>
                        Edit your <S.Span>{titleCase(item.name)}</S.Span>:
                    </S.Title>

                    <S.Wrapper>
                        <S.Label htmlFor="editItemName">Change item name:</S.Label>
                        <S.CreatableDropdown
                            defaultValue={item.name}
                            options={formatFoodDropdownOptions(fridge)}
                            setSelected={setNewName}
                            inputName="editItemName"
                        />

                        <S.Label column="1/2">Change category:</S.Label>
                        <S.ChooseCategory handleClick={setNewCategory} selected={newCategory} hideTitle />

                        <S.Label column="2/3" row="3/4">
                            Change date or owner:
                        </S.Label>
                        <EditFoodServings item={item} tenants={nonPendingTenants} />

                        <S.Button onClick={handleEdit}>Save Changes</S.Button>
                    </S.Wrapper>
                </>
            )}
        </Layout>
    );
};
