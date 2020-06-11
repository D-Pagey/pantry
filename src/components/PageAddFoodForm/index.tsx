import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
// import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import { FirebaseContext } from '../ProviderFirebase';
import { Layout } from '../Layout';
// import { ChooseCategory } from '../ChooseCategory';
import { Input } from '../Input';
import { SingleSelect } from '../SingleSelect';
import { Button } from '../Button';
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

// TODO: Once I deleted V1, then change value to be category not categories
export const PageAddFoodForm: FC = () => {
    const [step, setStep] = useState(1);
    // const { updateFridge, user } = useContext(FirebaseContext);
    const history = useHistory();

    return (
        <Layout title="Add food">
            <Formik
                initialValues={{ category: '', expires: new Date(), name: '', servings: 1 }}
                onSubmit={(values, actions): void => {
                    // const formattedValues = {
                    //     ...values,
                    //     name: values.name || values.categories.name,
                    //     id: uuidv4(),
                    //     owner: user.name,
                    //     categories: [values.categories.id]
                    // };

                    // updateFridge(formattedValues);

                    actions.setSubmitting(false);
                    actions.resetForm();

                    history.push('/food/all');
                }}
            >
                {({ handleBlur, handleChange, setFieldValue, values }): JSX.Element => {
                    // const handleCategoryClick = (category: CategoryType) => {
                    //     setFieldValue('categories', category);
                    //     setStep(3);
                    // };

                    return (
                        <S.Wrapper>
                            <S.Form>
                                {step === 1 && (
                                    <S.StepWrapper>
                                        <S.InputWrapper>
                                            <S.Label htmlFor="foodName">What is the food called?</S.Label>

                                            <Input
                                                margin="0 0 3rem"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="e.g. Carrot"
                                                testId="foodName"
                                                value={values.name}
                                            />

                                            <S.Label>How many servings?</S.Label>

                                            <SingleSelect
                                                options={options}
                                                setSelected={(option: any) => setFieldValue('servings', option.value)}
                                                selected={values.servings}
                                            />
                                        </S.InputWrapper>

                                        <Button onClick={() => setStep(2)}>Next</Button>
                                    </S.StepWrapper>
                                )}

                                {/* {step === 2 && (
                                    <ChooseCategory onClick={handleCategoryClick} selected={values.categories} />
                                )} */}

                                {step === 3 && (
                                    <S.StepWrapper>
                                        <div>
                                            <p>When is it going to expire?</p>

                                            <DatePicker
                                                selected={values.expires}
                                                onChange={(date: Date) => setFieldValue('expires', date)}
                                                inline
                                            />
                                        </div>

                                        <Button type="submit">Add to pantry</Button>
                                    </S.StepWrapper>
                                )}
                            </S.Form>
                        </S.Wrapper>
                    );
                }}
            </Formik>
        </Layout>
    );
};
