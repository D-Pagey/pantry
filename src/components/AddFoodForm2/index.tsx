import React, { useContext } from 'react';
import { Form, Formik } from 'formik';

import { FirebaseContext } from '../ProviderFirebase';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import { DialDatePicker } from '../DialDatePicker';
import { SingleSelect } from '../SingleSelect';
import { Input } from '../Input';
import { Button } from '../Button';

const servingsOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4+', value: 4 }
];

const baseValues = {
    categories: [],
    expires: new Date(),
    name: '',
    servings: servingsOptions[1].value
};

export const AddFoodForm2 = (): JSX.Element => {
    const { categories, updateHousehold2 } = useContext(FirebaseContext);

    return (
        <Formik
            initialValues={baseValues}
            onSubmit={(values, actions): void => {
                updateHousehold2(values);

                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            {({ handleBlur, handleChange, setFieldValue, values }): JSX.Element => {
                return (
                    <Form>
                        <MultiSelectDropdown
                            label="What categories of food?"
                            options={categories}
                            setValues={(category: any): void => setFieldValue('categories', category)}
                            value={values.categories}
                        />

                        <Input
                            label="What is the name of the food?"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="name"
                            placeholder="Name..."
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

                        <Button variant="submit">Submit</Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
