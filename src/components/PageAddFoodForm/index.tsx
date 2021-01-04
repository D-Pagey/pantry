import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

import { BatchType, FoodType, MetaDataType, NewFoodType } from '../../types';
import { formatDropdownOptions, formatFoodDropdownOptions } from '../../utils';
import { Layout } from '../Layout';
import { ChooseCategory } from '../ChooseCategory';
import { CreatableDropdown } from '../CreatableDropdown';
import { Button } from '../Button';
import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

type PageAddFoodFormProps = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExistingProperties: ({ name, category, unit }: { name: string; category: string; unit: string }) => void;
    fridge?: FoodType[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBatch: ({ name, batch }: { name: string; batch: BatchType }) => void;
    metaData: MetaDataType;
};

export const PageAddFoodForm: FC<PageAddFoodFormProps> = ({
    fridge,
    updateExistingProperties,
    updateBatch,
    metaData
}) => {
    const [step, setStep] = useState(1);
    const [itemExists, setItemExists] = useState(false);
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const handleStepOneNext = (name: string) => () => {
        if (fridge) {
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
        }
    };

    return (
        <Layout title="Add food">
            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', quantity: '', unit: '' }}
                onSubmit={(values, actions): void => {
                    if (fridge && user) {
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

                        if (!itemExists) {
                            updateExistingProperties({
                                name: formattedValues.name,
                                category: formattedValues.category,
                                unit: formattedValues.unit
                            });
                        }

                        updateBatch({ name: formattedValues.name, batch: formattedValues.batch });
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

                    const checkExistingCategory = () => {
                        if (fridge) {
                            return fridge.reduce((acc, curr: FoodType) => {
                                if (curr.name === values.name.toLowerCase()) {
                                    return curr.category;
                                }

                                return acc;
                            }, '');
                        }

                        return undefined;
                    };

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const onKeyDown = (keyEvent: any): void => {
                        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                            keyEvent.preventDefault();
                        }
                    };

                    return (
                        <S.Wrapper>
                            <S.Form onKeyDown={onKeyDown}>
                                {step === 1 && (
                                    <S.StepWrapper>
                                        <S.InputWrapper>
                                            <S.Label htmlFor="foodName">What is the food called?</S.Label>

                                            <CreatableDropdown
                                                options={formatFoodDropdownOptions(fridge || [])}
                                                setSelected={(name: string) => setFieldValue('name', name)}
                                                placeholder="e.g. Carrot"
                                            />

                                            <S.Grid>
                                                <S.SmallLabel>Quantity</S.SmallLabel>
                                                <CreatableDropdown
                                                    options={formatDropdownOptions(metaData.quantities)}
                                                    setSelected={(quantity: string) =>
                                                        setFieldValue('quantity', quantity)
                                                    }
                                                    placeholder="2"
                                                />

                                                <S.SmallLabel>Unit</S.SmallLabel>
                                                <CreatableDropdown
                                                    options={formatDropdownOptions(metaData.units)}
                                                    setSelected={(unit: string) => setFieldValue('unit', unit)}
                                                    placeholder="cans"
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
                                            selected={checkExistingCategory()}
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
