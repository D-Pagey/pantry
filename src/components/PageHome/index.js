import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const PageHome = () => {
    const { addDoc, value } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {value &&
                value.docs.map((doc) => (
                    <React.Fragment key={doc.id}>{JSON.stringify(doc.data())}</React.Fragment>
                ))}
            <Formik
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
            />
        </S.Wrapper>
    );
};

export default PageHome;
