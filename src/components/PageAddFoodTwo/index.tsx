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
                <label htmlFor="name">What is the food called?</label>
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
                            setSelected={(option) => setValue('name', option)}
                        />
                    )}
                />
                {errors.name && <span>Name is required</span>}

                <label htmlFor="quantity">Quantity</label>
                <Controller
                    control={control}
                    name="quantity"
                    defaultValue="2"
                    rules={{ required: true }}
                    render={() => (
                        <CreatableDropdown
                            inputName="name"
                            defaultValue="2"
                            options={formatDropdownOptions(metaData.quantities)}
                            setSelected={(quantity) => setValue('quantity', quantity)}
                        />
                    )}
                />
                {errors.quantity && <span>Quantity is required</span>}

                <label htmlFor="unit">Unit</label>
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
                        />
                    )}
                />
                {errors.unit && <span>Unit is required</span>}

                <label htmlFor="category">Category</label>
                <Controller
                    control={control}
                    name="category"
                    defaultValue=""
                    rules={{ required: true }}
                    render={() => (
                        <CreatableDropdown
                            inputName="category"
                            options={formatDropdownOptions(metaData.categories)}
                            setSelected={(category) => setValue('category', category)}
                        />
                    )}
                />
                {errors.category && <span>Category is required</span>}

                <label>What&apos; the expiry date?</label>
                <Controller
                    control={control}
                    name="date"
                    defaultValue={new Date()}
                    render={({ onChange, onBlur, value }) => (
                        <ReactDatePicker onChange={onChange} onBlur={onBlur} selected={value} />
                    )}
                />
                {errors.date && <span>Date is required</span>}

                <input type="submit" />
            </S.Form>
        </Layout>
    );
};
