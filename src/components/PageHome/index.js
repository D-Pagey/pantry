import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import dateFns from 'date-fns';
import Select from 'react-select';
import { FirebaseContext } from '../ProviderFirebase';
import Grid from '../Grid';
import * as S from './styles';

const categoryOptions = [
    { value: 'meat', label: 'Meat' },
    { value: 'fish', label: 'Fish' },
    { value: 'vegetables', label: 'Vegetables' }
];

const PageHome = () => {
    const { addDoc, value } = useContext(FirebaseContext);

    // need to tidy this up
    const formattedData =
        value &&
        value.fridge &&
        value.fridge.map((item) => ({
            ...item,
            expires: dateFns.format(item.expires.toDate(), 'MM/DD/YYYY')
        }));

    return (
        <S.Wrapper>
            {/* need to tidy this up */}
            {formattedData && <Grid data={formattedData} />}

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
                    // need to tidy this up
                    const fridge = [...value.fridge, values].map((item) => ({
                        ...item,
                        name: item.name.toLowerCase()
                    }));
                    const immutable = { ...value, fridge };

                    addDoc(immutable);
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
