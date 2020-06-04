import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Header } from '../Header';
import { ChooseCategory } from '../ChooseCategory';
import { Input } from '../Input';
import { SingleSelect } from '../SingleSelect';
import * as S from './styles';

const options = [
    {
        label: '1',
        value: 1
    },
    {
        label: '2',
        value: 2
    },
    {
        label: '3',
        value: 3
    },
    {
        label: '4',
        value: 4
    }
];

export const PageAddFoodForm2: FC = () => {
    const [step, setStep] = useState(1);

    return (
        <>
            <Header />

            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', servings: '' }}
                onSubmit={(values, actions): void => {
                    console.log({ values });

                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
            >
                {({ handleBlur, handleChange, setFieldValue, values }): JSX.Element => {
                    const handleCategoryClick = (category: string) => {
                        setFieldValue('category', category);
                        setStep(2);
                    };

                    return (
                        <S.Wrapper>
                            <Form>
                                {step === 1 && (
                                    <ChooseCategory onClick={handleCategoryClick} selected={values.category} />
                                )}

                                {step === 2 && (
                                    <S.Step2Wrapper>
                                        <Input
                                            label={`What type of ${values.category} is it?`}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="e.g. Carrot"
                                            value={values.name}
                                        />

                                        <SingleSelect
                                            label="How many servings?"
                                            options={options}
                                            setSelected={(option: any) => setFieldValue('servings', option.value)}
                                            selected={values.servings}
                                        />

                                        <S.Button type="button" onClick={() => setStep(3)}>
                                            Next
                                        </S.Button>
                                    </S.Step2Wrapper>
                                )}

                                {step === 3 && (
                                    <S.Step2Wrapper>
                                        <p>When is it going to expire?</p>

                                        <DatePicker
                                            selected={values.expires}
                                            onChange={(date: Date) => setFieldValue('expires', date)}
                                            inline
                                        />

                                        <S.SubmitButton>Add to pantry</S.SubmitButton>
                                    </S.Step2Wrapper>
                                )}
                            </Form>
                        </S.Wrapper>
                    );
                }}
            </Formik>
        </>
    );
};
