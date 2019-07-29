import React, { useContext } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import dateFns from 'date-fns';
import { FirebaseContext } from '../ProviderFirebase';
import Dropdown from '../Dropdown';
import * as S from './styles';

const categoryOptions = [
    { label: 'Meat', value: 'meat' },
    { label: 'Fish', value: 'fish' },
    { label: 'Vegetables', value: 'vegetables' }
];

const AddFoodForm = () => {
    const { updateFridge, value } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            <Formik
                initialValues={{ category: null }}
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
                render={({ setFieldValue, values }) => {
                    // console.log({ values });

                    return (
                        <Form>
                            <Dropdown
                                label="What category of food?"
                                options={categoryOptions}
                                selected={values.category}
                                setSelected={(category) => setFieldValue('category', category)}
                            />
                            <ErrorMessage name="category" component="div" />

                            <button type="submit">Submit</button>
                        </Form>
                    );
                }}
            />
        </S.Wrapper>
    );
};

export default AddFoodForm;
