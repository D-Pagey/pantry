/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { CategoryType, FoodTypes, EditFoodTypes } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import { DialDatePicker } from '../DialDatePicker';
import { Header } from '../Header';
import { SingleSelect } from '../SingleSelect';
import { Input } from '../Input';
import { Button } from '../Button';
import { formatCategories, swapCategoryIdsForValues } from './utils';
import * as S from './styles';

const servingsOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4+', value: 4 }
];

const baseValues = {
    categories: [] as CategoryType[],
    expires: new Date(),
    id: '',
    name: '',
    servings: servingsOptions[1].value,
    owner: ''
};

export const PageAddFoodForm = (): JSX.Element => {
    const [initialValues, setInitialValues] = useState<EditFoodTypes>(baseValues);
    const [usedEditValues, setHasUsedEditValues] = useState(false);
    const { state } = useLocation<FoodTypes>();
    const { categories, updateFridge, addNewCategories, user } = useContext(FirebaseContext);

    useEffect(() => {
        if (state && !usedEditValues) {
            const categoryValues = swapCategoryIdsForValues(state.categories, categories);

            setInitialValues({ ...state, categories: categoryValues });
            setHasUsedEditValues(true);
        }
    }, [categories, initialValues, state, usedEditValues]);

    return (
        <>
            <Header page="Add food" />
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions): void => {
                    const valuesWithId = values.id ? values : { ...values, id: uuidv4() };

                    const newCategories = valuesWithId.categories.reduce((acc, curr) => {
                        if (curr.__isNew__) {
                            const { __isNew__, ...restOfCategory } = curr;

                            return [...acc, restOfCategory];
                        }

                        return acc;
                    }, [] as CategoryType[]);

                    const withCategoryIds = {
                        ...valuesWithId,
                        owner: user.name,
                        categories: valuesWithId.categories.map((category: CategoryType) => category.id)
                    };

                    if (newCategories.length > 0) addNewCategories(newCategories);
                    updateFridge(withCategoryIds);

                    actions.setSubmitting(false);
                    actions.resetForm();
                    setInitialValues(baseValues);
                }}
            >
                {({ handleBlur, handleChange, setFieldValue, values }): JSX.Element => {
                    return (
                        <S.Wrapper>
                            <Form>
                                <MultiSelectDropdown
                                    label="What categories of food?"
                                    options={formatCategories(categories)}
                                    setValues={(category: any): void => setFieldValue('categories', category)}
                                    value={values.categories}
                                />

                                <Input
                                    label="What is the name of the food?"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="name"
                                    placeholder="Name..."
                                    testId="addFoodInput"
                                    value={values.name}
                                />

                                <DialDatePicker
                                    date={values.expires}
                                    label="When does it expire?"
                                    setDate={(date: Date): void => setFieldValue('expires', date)}
                                />

                                <SingleSelect
                                    label="How many servings?"
                                    options={servingsOptions}
                                    selected={values.servings}
                                    setSelected={(option: any): void => setFieldValue('servings', option.value)}
                                />

                                <Button variant="submit" testId="addFoodFormSubmit">
                                    Submit
                                </Button>
                            </Form>
                        </S.Wrapper>
                    );
                }}
            </Formik>
        </>
    );
};
