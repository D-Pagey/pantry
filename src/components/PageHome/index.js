import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const PageHome = () => {
    const { addDoc, deleteDoc, value } = useContext(FirebaseContext);

    const dataIds = value && value.docs.map((doc) => doc.id);

    const handleDelete = () => {
        if (dataIds.length === 0) return;
        deleteDoc(dataIds[0]);
    };

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
            <button type="button" onClick={handleDelete}>
                Delete first entry
            </button>
        </S.Wrapper>
    );
};

export default PageHome;
