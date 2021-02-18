import 'react-datepicker/dist/react-datepicker.css';
import { FC, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

import { FoodType, MetaDataType } from '../../types';
import { addItem, addNewUnit } from '../../services/firestore';
import { convertBatchesArray, formatFoodDropdownOptions, formatDropdownOptions } from '../../utils';
import { AuthContext } from '../ProviderAuth';
import { CreatableDropdown } from '../CreatableDropdown';
import { Layout } from '../Layout';
import * as S from './styles';

type PageAddFoodProps = {
    fridge: FoodType[];
    metaData: MetaDataType;
};

type Inputs = {
    category: string;
    date: Date;
    name: string;
    quantity: string;
    unit: string;
};

export const PageAddFood: FC<PageAddFoodProps> = ({ fridge, metaData }) => {
    const { handleSubmit, errors, setValue, control } = useForm<Inputs>();
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const onSubmit = async ({ name, category, unit, date, quantity }: Inputs) => {
        const lowercaseName = name.toLowerCase();

        const existingItem = fridge.reduce((acc, curr) => {
            if (curr.name === lowercaseName) return curr;

            return acc;
        }, null as FoodType | null);

        const newBatchId = uuidv4();

        const item: FoodType = {
            name: lowercaseName,
            category,
            unit,
            batches: [
                ...(existingItem ? existingItem.batches : []),
                {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    ownerId: user!.uid!,
                    expires: date,
                    quantity: parseInt(quantity, 10),
                    id: newBatchId
                }
            ]
        };

        try {
            await addItem(convertBatchesArray([item])[0], user!.household!);
        } catch {
            toast.error('Something went wrong adding the item');
        }

        if (!metaData.units.includes(unit)) {
            const updatedUnits = [...metaData.units, unit];

            try {
                await addNewUnit(updatedUnits, user!.household!);
            } catch {
                toast.error('something went wrong adding a new unit');
            }
        }

        history.push('/food');
    };

    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    return (
        <Layout title="Add Food">
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.Label htmlFor="name">What is the food called?</S.Label>
                <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    rules={{ required: true }}
                    render={() => (
                        <CreatableDropdown
                            inputName="name"
                            placeholder="Enter a name..."
                            options={formatFoodDropdownOptions(fridge)}
                            setSelected={(option) => setValue('name', option, { shouldValidate: true })}
                            error={errors.name && 'A name is required'}
                        />
                    )}
                />

                <S.Label htmlFor="quantity">How many?</S.Label>
                <Controller
                    control={control}
                    name="quantity"
                    defaultValue="2"
                    rules={{ required: true }}
                    render={() => (
                        <CreatableDropdown
                            inputName="quantity"
                            defaultValue="2"
                            options={formatDropdownOptions(metaData.quantities)}
                            setSelected={(quantity) => setValue('quantity', quantity)}
                            error={errors.quantity && 'A quantity is required'}
                        />
                    )}
                />

                <S.Label htmlFor="unit">What unit?</S.Label>
                <Controller
                    control={control}
                    name="unit"
                    defaultValue="servings"
                    rules={{ required: true }}
                    render={() => (
                        <CreatableDropdown
                            inputName="unit"
                            defaultValue="servings"
                            options={formatDropdownOptions(metaData.units)}
                            setSelected={(unit) => setValue('unit', unit)}
                            error={errors.unit && 'A unit is required'}
                        />
                    )}
                />

                <S.Label htmlFor="category">What category for this item?</S.Label>
                <Controller
                    control={control}
                    name="category"
                    defaultValue=""
                    rules={{ required: true }}
                    render={() => (
                        <CreatableDropdown
                            inputName="category"
                            options={formatDropdownOptions(metaData.categories)}
                            setSelected={(category) => setValue('category', category, { shouldValidate: true })}
                            error={errors.category && 'A category is required'}
                        />
                    )}
                />

                <S.Label>What&apos; the expiry date?</S.Label>
                <Controller
                    control={control}
                    name="date"
                    defaultValue={new Date()}
                    render={({ onChange, onBlur, value }) => (
                        <ReactDatePicker onChange={onChange} onBlur={onBlur} selected={value} />
                    )}
                />

                <S.Button type="submit">Add item</S.Button>
            </S.Form>
        </Layout>
    );
};
