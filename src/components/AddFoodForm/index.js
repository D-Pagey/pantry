import React, { useContext } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
// import dateFns from 'date-fns';
import { FirebaseContext } from '../ProviderFirebase';
import Dropdown from '../Dropdown';
import DialDatePicker from '../DialDatePicker';
import Input from '../Input';
import Button from '../Button';
import * as S from './styles';

const categoryOptions = [
    { label: 'Meat', value: 'meat' },
    { label: 'Fish', value: 'fish' },
    { label: 'Vegetables', value: 'vegetables' }
];

const AddFoodForm = () => {
    const { updateFridge } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            <Formik
                initialValues={{ category: null, date: new Date(), name: '' }}
                validate={(values) => {
                    const errors = {};

                    if (!values.category) {
                        errors.category = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, actions) => {
                    // const formatted = [
                    //     ...value.fridge,
                    //     {
                    //         ...values,
                    //         expires: dateFns.format(values.expires, 'MM/DD/YYYY'),
                    //         name: values.name.toLowerCase()
                    //     }
                    // ];

                    updateFridge(values.category);

                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
                render={({ handleBlur, handleChange, setFieldValue, values }) => {
                    console.log({ values });

                    return (
                        <Form>
                            <Dropdown
                                label="What category of food?"
                                options={categoryOptions}
                                selected={values.category}
                                setSelected={(category) => setFieldValue('category', category)}
                            />
                            <ErrorMessage name="category" component="div" />

                            <Input
                                label="What is the name of the food?"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name"
                                placeholder="Name..."
                                testId="addFoodFoodNameInput"
                                value={values.name}
                            />

                            <DialDatePicker
                                date={values.date}
                                label="When does it expire?"
                                setDate={(date) => setFieldValue('date', date)}
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
