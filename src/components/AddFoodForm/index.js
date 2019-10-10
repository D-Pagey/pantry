import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { FirebaseContext } from '../ProviderFirebase';
import DialDatePicker from '../DialDatePicker';
import SingleSelect from '../SingleSelect';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Button from '../Button';
import * as S from './styles';

const servingsOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4+', value: '4+' }
];

const initialValues = {
    category: null,
    expires: new Date(),
    name: '',
    servings: servingsOptions[1]
};

const AddFoodForm = () => {
    const { foodCategories, fridge, updateFridge } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.category) {
                        errors.category = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, actions) => {
                    const formatted = [
                        ...fridge,
                        {
                            ...values,
                            name: values.name.toLowerCase()
                        }
                    ];

                    updateFridge(formatted);

                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
                render={({ errors, handleBlur, handleChange, setFieldValue, values }) => {
                    return (
                        <Form>
                            <Dropdown
                                error={errors.category}
                                label="What category of food?"
                                options={foodCategories}
                                selected={values.category}
                                setSelected={(category) => setFieldValue('category', category)}
                            />

                            <Input
                                error={errors.name}
                                label="What is the name of the food?"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name"
                                placeholder="Name..."
                                testId="addFoodFoodNameInput"
                                value={values.name}
                            />

                            <DialDatePicker
                                date={values.expires}
                                label="When does it expire?"
                                setDate={(date) => setFieldValue('expires', date)}
                            />

                            <SingleSelect
                                label="How many servings?"
                                options={servingsOptions}
                                selected={values.servings}
                                setSelected={(option) => setFieldValue('servings', option)}
                                testId="addFoodFormServings"
                            />

                            <Button variant="submit">Submit</Button>
                        </Form>
                    );
                }}
            />
        </S.Wrapper>
    );
};

export default AddFoodForm;
