import React, { useContext } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FirebaseContext } from '../ProviderFirebase';
import Grid from '../Grid';
import * as S from './styles';

const PageHome = () => {
    const { value } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {value && <Grid data={value.fridge} />}

            {/* <Formik
                initialValues={{ test: '' }}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    addDoc(values);
                    actions.resetForm();
                }}
                render={({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="test" />
                        <ErrorMessage name="test" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            /> */}
        </S.Wrapper>
    );
};

export default PageHome;
