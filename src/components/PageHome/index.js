import 'react-datepicker/dist/react-datepicker.css';
import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import dateFns from 'date-fns';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { FirebaseContext } from '../ProviderFirebase';
import Grid from '../Grid';
import * as S from './styles';

const categoryOptions = [
    { value: 'meat', label: 'Meat' },
    { value: 'fish', label: 'Fish' },
    { value: 'vegetables', label: 'Vegetables' }
];

const PageHome = () => {
    const { updateFridge, value, loading } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {loading ? <p>Loading...</p> : <Grid data={value.fridge} />}

            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', servings: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.category) {
                        errors.category = 'Required';
                    }
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.servings) {
                        errors.servings = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    updateFridge(
                        values.map((item) => ({
                            ...item,
                            expires: dateFns.format(item.expires, 'MM/DD/YYYY'),
                            name: item.name.toLowerCase()
                        }))
                    );
                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
                render={({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <Select
                            name="category"
                            options={categoryOptions}
                            onChange={(item) => setFieldValue('category', item)}
                            value={values.category}
                        />
                        <ErrorMessage name="category" component="div" />

                        <DatePicker
                            name="expires"
                            onChange={(item) => setFieldValue('expires', item)}
                            selected={values.expires}
                        />
                        <ErrorMessage name="expires" component="div" />

                        <Field type="text" name="name" placeholder="name" />
                        <ErrorMessage name="name" component="div" />

                        <Field type="text" name="servings" placeholder="servings" />
                        <ErrorMessage name="servings" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            />
        </S.Wrapper>
    );
};

export default PageHome;
