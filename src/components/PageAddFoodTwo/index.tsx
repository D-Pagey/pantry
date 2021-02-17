import 'react-datepicker/dist/react-datepicker.css';
import { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { FoodType, MetaDataType } from '../../types';
import { formatFoodDropdownOptions, formatDropdownOptions } from '../../utils';
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
    quantity: number;
    unit: string;
};

export const PageAddFood: FC<PageAddFoodProps> = ({ fridge, metaData }) => {
    const [existingItem, setExistingItem] = useState<FoodType>();
    const { handleSubmit, errors, setValue, control, watch } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => console.log({ data });
    const watchName = watch('name');

    console.log(watch('unit'));

    useEffect(() => {
        if (watchName) {
            console.log({ watchName });
            const fridgeItem = fridge.filter((item) => item.name === watchName)[0];

            if (fridgeItem) {
                setValue('unit', fridgeItem.unit);
            }
        }
    }, [watchName]);

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
                    rules={{ required: true }}
                    defaultValue="vegetables"
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
