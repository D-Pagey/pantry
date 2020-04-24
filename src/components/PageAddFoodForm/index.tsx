/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { CategoryType, DatabaseCategoryType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import { DialDatePicker } from '../DialDatePicker';
import { SingleSelect } from '../SingleSelect';
import { Input } from '../Input';
import { Button } from '../Button';

// TODO: move
const servingsOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4+', value: 4 }
];

// TODO: move
const baseValues = {
    categories: [] as CategoryType[],
    expires: new Date(),
    id: '',
    name: '',
    servings: servingsOptions[1].value
};

// TODO: move
const formatCategories = (categories: CategoryType[]): CategoryType[] => {
    return categories.map((category: CategoryType) => {
        return {
            ...category,
            label: category.name,
            value: category.name
        };
    });
};

/** Edit Functionality
 * Initial values in state
 * Reinitialise the form
 * reset state from router state
 * track isEditMode in state
 * ensure editing food item and not creating new one as duplicate
 * go back to where you were after submit
 */

export const PageAddFoodForm = (): JSX.Element => {
    const { categories, updateFridge, addNewCategories } = useContext(FirebaseContext);

    return (
        <Formik
            initialValues={baseValues}
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
                    categories: valuesWithId.categories.map((category: CategoryType) => category.id)
                };

                if (newCategories.length > 0) addNewCategories(newCategories);
                updateFridge(withCategoryIds);

                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            {({ handleBlur, handleChange, setFieldValue, values }): JSX.Element => {
                return (
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
                );
            }}
        </Formik>
    );
};
