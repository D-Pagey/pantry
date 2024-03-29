import 'react-datepicker/dist/react-datepicker.css';
import { FC, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';

import { mediaQuery } from '../../tokens';
import { FoodType, MetaDataType } from '../../types';
import { addItem, addNewUnit } from '../../services/firestore';
import { analytics } from '../../services';
import { convertBatchesArray, formatFoodDropdownOptions, formatDropdownOptions } from '../../utils';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Button } from '../Button';
import * as S from './styles';

type PageAddFoodProps = {
    fridge: FoodType[];
    metaData?: MetaDataType;
};

type Inputs = {
    category: string;
    date: Date;
    name: string;
    quantity: string;
    unit: string;
};

export const PageAddFood: FC<PageAddFoodProps> = ({ fridge, metaData }) => {
    const {
        handleSubmit,
        setValue,
        control,

        formState: { errors }
    } = useForm<Inputs>();
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

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

        if (!metaData!.units.includes(unit)) {
            const updatedUnits = [...metaData!.units, unit];

            try {
                await addNewUnit(updatedUnits, user!.household!);
            } catch {
                toast.error('something went wrong adding a new unit');
            }
        }

        analytics.logEvent('added_item');
        history.push('/food');
    };

    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    return (
        <Layout title="Add Food">
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                {isTabletOrLarger && <S.Subtitle>Required:</S.Subtitle>}

                <S.Label htmlFor="name" column="1" row="2">
                    What is the food called?
                    <Controller
                        control={control}
                        name="name"
                        defaultValue=""
                        rules={{ required: true }}
                        render={() => (
                            <S.Dropdown
                                inputName="name"
                                placeholder="Enter a name..."
                                options={formatFoodDropdownOptions(fridge)}
                                setSelected={(option: string) => setValue('name', option, { shouldValidate: true })}
                                error={errors.name && 'A name is required'}
                            />
                        )}
                    />
                </S.Label>

                <S.Label htmlFor="quantity" column="1" row="3">
                    How many?
                    <Controller
                        control={control}
                        name="quantity"
                        defaultValue="2"
                        rules={{ required: true }}
                        render={() => (
                            <S.Dropdown
                                inputName="quantity"
                                defaultValue="2"
                                options={formatDropdownOptions(metaData!.quantities)}
                                setSelected={(quantity: string) => setValue('quantity', quantity)}
                                error={errors.quantity && 'A quantity is required'}
                            />
                        )}
                    />
                </S.Label>

                <S.DatePickerWrapper>
                    What&apos; the expiry date?
                    <Controller
                        control={control}
                        name="date"
                        defaultValue={new Date()}
                        render={({ field }) => (
                            <S.DatePicker
                                {...field}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                selected={field.value}
                                dateFormat="do MMMM yyyy"
                            />
                        )}
                    />
                </S.DatePickerWrapper>

                <S.Subtitle>Optional:</S.Subtitle>

                <S.Label htmlFor="category" column="2" row="2">
                    What category for this item?
                    <Controller
                        control={control}
                        name="category"
                        defaultValue="other"
                        rules={{ required: true }}
                        render={() => (
                            <S.Dropdown
                                inputName="category"
                                defaultValue="other"
                                options={formatDropdownOptions(metaData!.categories)}
                                setSelected={(category: string) =>
                                    setValue('category', category, { shouldValidate: true })
                                }
                                error={errors.category && 'A category is required'}
                            />
                        )}
                    />
                </S.Label>

                <S.Label htmlFor="unit" column="2">
                    What unit?
                    <Controller
                        control={control}
                        name="unit"
                        defaultValue="servings"
                        rules={{ required: true }}
                        render={() => (
                            <S.Dropdown
                                inputName="unit"
                                defaultValue="servings"
                                options={formatDropdownOptions(metaData!.units)}
                                setSelected={(unit: string) => setValue('unit', unit)}
                                error={errors.unit && 'A unit is required'}
                            />
                        )}
                    />
                </S.Label>

                <S.ButtonWrapper>
                    <Button secondary onClick={() => history.push('/food')}>
                        Back
                    </Button>
                    <Button type="submit">Add item</Button>
                </S.ButtonWrapper>
            </S.Form>
        </Layout>
    );
};
