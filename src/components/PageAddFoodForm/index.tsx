import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

import { FoodType, NewFoodType } from '../../types';
import { Layout } from '../Layout';
import { ChooseCategory } from '../ChooseCategory';
import { CreatableDropdown } from '../CreatableDropdown';
import { SingleSelect } from '../SingleSelect';
import { Button } from '../Button';
import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

const options = [
    {
        label: '1',
        value: 1
    },
    {
        label: '2',
        value: 2
    },
    {
        label: '3',
        value: 3
    },
    {
        label: '4',
        value: 4
    }
];

type PageAddFoodFormProps = {
    addItem: (values: NewFoodType) => void;
    fridge?: FoodType[];
    updateItemBatch: (values: NewFoodType) => void;
};

export const PageAddFoodForm: FC<PageAddFoodFormProps> = ({ fridge, addItem, updateItemBatch }) => {
    const [step, setStep] = useState(1);
    const { user } = useContext(AuthContext);
    const history = useHistory();

    return (
        <Layout title="Add food">
            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', servings: 1 }}
                onSubmit={(values, actions): void => {
                    if (fridge && user) {
                        const newBatchId = uuidv4();
                        const doesItemExist = fridge.reduce((acc, curr) => {
                            if (curr.name === values.name) return true;

                            return acc;
                        }, false);

                        const formattedValues: NewFoodType = {
                            category: values.category,
                            name: values.name.toLowerCase() || values.category,
                            batch: {
                                ownerId: user.uid!,
                                expires: values.expires,
                                servings: values.servings,
                                id: newBatchId
                            }
                        };

                        if (doesItemExist) {
                            updateItemBatch(formattedValues);
                        } else {
                            addItem(formattedValues);
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

                    const onKeyDown = (keyEvent: any): void => {
                        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                            keyEvent.preventDefault();
                        }
                    };

                    const getDropdownOptions = () => {
                        if (fridge) {
                            return fridge.map((item: FoodType) => item.name);
                        }

                        return [];
                    };

                    return (
                        <S.Wrapper>
                            <S.Form onKeyDown={onKeyDown}>
                                {step === 1 && (
                                    <S.StepWrapper>
                                        <S.InputWrapper>
                                            <S.Label htmlFor="foodName">What is the food called?</S.Label>

                                            <CreatableDropdown
                                                options={getDropdownOptions()}
                                                setSelected={(name: string) => setFieldValue('name', name)}
                                                placeholder="e.g. Carrot"
                                            />

                                            <S.Label>How many servings?</S.Label>

                                            <SingleSelect
                                                options={options}
                                                setSelected={(option: any) => setFieldValue('servings', option.value)}
                                                selected={values.servings}
                                            />
                                        </S.InputWrapper>

                                        <Button onClick={() => setStep(2)}>Next</Button>
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
