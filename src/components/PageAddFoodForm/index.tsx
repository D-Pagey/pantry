import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

import { FoodType, MetaDataType, NewFoodType } from '../../types';
import { formatDropdownOptions, formatFoodDropdownOptions } from '../../utils';
import { updateExistingProperties, updateBatch } from '../../services/firestore';
import { Layout } from '../Layout';
import { ChooseCategory } from '../ChooseCategory';
import { CreatableDropdown } from '../CreatableDropdown';
import { Button } from '../Button';
import { AuthContext } from '../ProviderAuth';
import { checkExistingCategory } from './utils';
import * as S from './styles';

type PageAddFoodFormProps = {
    fridge: FoodType[];
    metaData: MetaDataType;
};

export const PageAddFoodForm: FC<PageAddFoodFormProps> = ({ fridge, metaData }) => {
    const [step, setStep] = useState(1);
    const [itemExists, setItemExists] = useState(false);
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const handleStepOneNext = (name: string) => () => {
        const doesItemExist = fridge.reduce((acc, curr) => {
            if (curr.name === name) return true;

            return acc;
        }, false);

        if (doesItemExist) {
            setStep(3);
            setItemExists(true);
        } else {
            setStep(2);
        }
    };

    return (
        <Layout title="Add food">
            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', quantity: '', unit: '' }}
                onSubmit={async (values, actions) => {
                    if (user) {
                        const newBatchId = uuidv4();

                        const formattedValues: NewFoodType = {
                            category: values.category,
                            name: values.name.toLowerCase() || values.category,
                            unit: values.unit,
                            batch: {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                ownerId: user.uid!,
                                expires: values.expires,
                                quantity: parseInt(values.quantity, 10),
                                id: newBatchId
                            }
                        };

                        if (itemExists) {
                            await updateExistingProperties({
                                name: formattedValues.name,
                                category: formattedValues.category,
                                unit: formattedValues.unit,
                                userHousehold: user.household!
                            });
                        }

                        await updateBatch({
                            name: formattedValues.name,
                            userHousehold: user.household!,
                            batch: formattedValues.batch
                        });
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
                                                setSelected={(name: string) => setFieldValue('name', name)}
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

                                        <Button onClick={handleStepOneNext(values.name)}>Next</Button>
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
