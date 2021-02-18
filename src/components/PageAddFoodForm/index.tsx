import React, { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

import { FoodType, MetaDataType } from '../../types';
import {
    formatDropdownOptions,
    formatFoodDropdownOptions,
    convertBatchesArray,
    checkExistingCategory,
    checkExistingItem
} from '../../utils';
import { addItem, addNewUnit } from '../../services/firestore';
import { Layout } from '../Layout';
import { ChooseCategory } from '../ChooseCategory';
import { CreatableDropdown } from '../CreatableDropdown';
import { Button } from '../Button';
import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

type PageAddFoodFormProps = {
    fridge: FoodType[];
    metaData: MetaDataType;
};

type StepOneValues = {
    name: string;
    quantity: string;
    unit: string;
};

export const PageAddFoodForm: FC<PageAddFoodFormProps> = ({ fridge, metaData }) => {
    const [step, setStep] = useState(1);
    const [existingItem, setExistingItem] = useState<FoodType>();
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const handleStepOneNext = (values: StepOneValues) => () => {
        if (values.name === '') {
            return toast.info('Please enter a name for the food item');
        }

        if (values.name.split('').includes('.')) {
            return toast.error('Item name should not contain a period');
        }

        if (isNaN(parseInt(values.quantity, 10))) {
            return toast.error('Please enter a number for the quantity');
        }

        if (values.unit === '') {
            return toast.info('Please enter a unit for the food item');
        }

        const doesItemExist = checkExistingItem(fridge, values.name);

        if (doesItemExist) {
            setStep(3);
            setExistingItem(doesItemExist);
        } else {
            setStep(2);
        }
    };

    return (
        <Layout title="Add food">
            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', quantity: '', unit: '' }}
                onSubmit={async (values, actions) => {
                    const newUnit = values.unit.toLowerCase();
                    const newBatchId = uuidv4();

                    const item: FoodType = {
                        name: values.name.toLowerCase(),
                        category: values.category || existingItem!.category,
                        unit: newUnit || existingItem!.unit,
                        batches: [
                            ...(existingItem ? existingItem.batches : []),
                            {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                ownerId: user!.uid!,
                                expires: values.expires,
                                quantity: parseInt(values.quantity, 10),
                                id: newBatchId
                            }
                        ]
                    };

                    try {
                        await addItem(convertBatchesArray([item])[0], user!.household!);
                    } catch {
                        toast.error('Something went wrong adding the item');
                    }

                    if (!metaData.units.includes(newUnit)) {
                        const updatedUnits = [...metaData.units, newUnit];

                        try {
                            await addNewUnit(updatedUnits, user!.household!);
                        } catch {
                            toast.error('something went wrong adding a new unit');
                        }
                    }
                    actions.setSubmitting(false);
                    actions.resetForm();

                    history.push('/food');
                }}
            >
                {({ setFieldValue, values }): JSX.Element => {
                    const handleCategoryClick = (category: string): void => {
                        setFieldValue('category', category);
                        setStep(3);
                    };

                    const handleNameSelect = (name: string) => {
                        setFieldValue('name', name);
                    };

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    // const onKeyDown = (keyEvent: any): void => {
                    //     if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                    //         keyEvent.preventDefault();
                    //         console.log('enter');
                    //     }
                    // };

                    return (
                        <S.Wrapper>
                            <S.Form>
                                {step === 1 && (
                                    <S.StepWrapper>
                                        <S.InputWrapper>
                                            <S.Label htmlFor="foodName">What is the food called?</S.Label>

                                            <CreatableDropdown
                                                options={formatFoodDropdownOptions(fridge)}
                                                setSelected={handleNameSelect}
                                                placeholder="e.g. Carrot"
                                                inputName="foodName"
                                            />

                                            <S.Grid>
                                                <S.SmallLabel htmlFor="foodQuantity">Quantity</S.SmallLabel>
                                                <CreatableDropdown
                                                    options={formatDropdownOptions(metaData.quantities)}
                                                    setSelected={(quantity: string) =>
                                                        setFieldValue('quantity', quantity)
                                                    }
                                                    placeholder="2"
                                                    inputName="foodQuantity"
                                                />

                                                <S.SmallLabel htmlFor="foodUnit">Unit</S.SmallLabel>
                                                <CreatableDropdown
                                                    options={formatDropdownOptions(metaData.units)}
                                                    setSelected={(unit: string) => setFieldValue('unit', unit)}
                                                    placeholder="cans"
                                                    inputName="foodUnit"
                                                />
                                            </S.Grid>
                                        </S.InputWrapper>

                                        <S.ButtonWrapper>
                                            <Button secondary onClick={() => history.push('/food')}>
                                                Back
                                            </Button>
                                            <Button onClick={handleStepOneNext(values)}>Next</Button>
                                        </S.ButtonWrapper>
                                    </S.StepWrapper>
                                )}

                                {step === 2 && (
                                    <S.StepWrapper>
                                        <ChooseCategory
                                            handleClick={handleCategoryClick}
                                            selected={checkExistingCategory(fridge, values.name) || values.category}
                                        />

                                        <S.ButtonWrapper>
                                            <Button secondary onClick={() => setStep(1)}>
                                                Back
                                            </Button>
                                            <Button onClick={() => setStep(3)}>Next</Button>
                                        </S.ButtonWrapper>
                                    </S.StepWrapper>
                                )}

                                {step === 3 && (
                                    <S.StepWrapper>
                                        <div>
                                            <p>When is it going to expire?</p>

                                            <DatePicker
                                                selected={values.expires}
                                                onChange={(date: Date) => setFieldValue('expires', date)}
                                                inline
                                            />
                                        </div>

                                        <S.ButtonWrapper>
                                            <Button secondary onClick={() => setStep(2)}>
                                                Back
                                            </Button>
                                            <Button type="submit">Add to pantry</Button>
                                        </S.ButtonWrapper>
                                    </S.StepWrapper>
                                )}
                            </S.Form>
                        </S.Wrapper>
                    );
                }}
            </Formik>
        </Layout>
    );
};
