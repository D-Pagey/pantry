import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import dateFns from 'date-fns';
import { FirebaseContext } from '../ProviderFirebase';
import Grid from '../Grid';
import * as S from './styles';

const PageHome = () => {
    const { addDoc, value } = useContext(FirebaseContext);

    const formattedData =
        value &&
        value.fridge.map((item) => ({
            ...item,
            expires: dateFns.format(item.expires.toDate(), 'MM/DD/YYYY')
        }));

    return (
        <S.Wrapper>
            {formattedData && <Grid data={formattedData} />}

            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', servings: '' }}
                onSubmit={(values, actions) => {
                    const immutable = { ...value, fridge: [...value.fridge, values] };

                    addDoc(immutable);
                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
                render={({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="category" placeholder="category" />
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
