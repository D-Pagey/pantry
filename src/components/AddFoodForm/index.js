import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import arraySort from 'array-sort';

import { getIndexOfId } from '../../utils';
import { FirebaseContext } from '../ProviderFirebase';
import DialDatePicker from '../DialDatePicker';
import CreatableDropdown from '../CreatableDropdown';
import SingleSelect from '../SingleSelect';
import Input from '../Input';
import Button from '../Button';
import * as S from './styles';

const servingsOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4+', value: 4 }
];

const baseValues = {
    category: '',
    expires: new Date(),
    name: '',
    servings: servingsOptions[1].value
};

const addIdToFood = (values) => {
    if (values.id) return values;

    return { ...values, name: values.name.toLowerCase(), id: uuidv4() };
};

const AddFoodForm = () => {
    const [initialValues, setInitialValues] = useState(baseValues);
    const [isEditMode, setIsEditMode] = useState(false);
    const [categoryLabels, setCategoryLabels] = useState([]);
    const { state } = useLocation();
    const { categories, fridge, updateHousehold } = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        // TODO: This may be unneccessary once refactor categories to be tags
        setCategoryLabels(
            arraySort(categories.map((item) => item.label).filter((item) => item !== 'expiring'))
        );
    }, [categories]);

    useEffect(() => {
        if (state) {
            setIsEditMode(true);
            setInitialValues({ ...state, category: state.category.label });
        }
    }, [state]);

    const addColourToCategory = (values) => {
        const indexOfCategory = categoryLabels.indexOf(values.category);

        if (indexOfCategory !== -1)
            return {
                ...values,
                category: { label: values.category, colour: categories[indexOfCategory].colour }
            };

        const newCategory = { label: values.category, colour: 'black' };

        updateHousehold({
            key: 'categories',
            values: [...categories, newCategory]
        });

        return { ...values, category: newCategory };
    };

    return (
        <S.Wrapper>
            <Formik
                enableReinitialize
                // handle how Formik resets forms - it uses the values it was initialised with
                initialValues={isEditMode ? initialValues : baseValues}
                validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.category) {
                        errors.category = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, actions) => {
                    const indexOfFoodId = getIndexOfId(values.id, fridge);

                    if (indexOfFoodId === -1) {
                        updateHousehold({
                            isEditMode,
                            key: 'fridge',
                            values: [...fridge, addColourToCategory(addIdToFood(values))]
                        });
                    } else {
                        const fridgeCopy = [...fridge];
                        fridgeCopy[indexOfFoodId] = {
                            ...addColourToCategory(values),
                            name: values.name.toLowerCase()
                        };
                        updateHousehold({ isEditMode, key: 'fridge', values: fridgeCopy });
                    }

                    actions.setSubmitting(false);
                    actions.resetForm();
                    setIsEditMode(false);
                    history.goBack();
                }}
            >
                {({ errors, handleBlur, handleChange, setFieldValue, values }) => {
                    return (
                        <Form>
                            <CreatableDropdown
                                error={errors.category}
                                label="What category of food?"
                                options={categoryLabels}
                                setSelected={(category) =>
                                    setFieldValue('category', category.value)
                                }
                                value={values.category}
                            />

                            <Input
                                error={errors.name}
                                label="What is the name of the food?"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name"
                                placeholder="Name..."
                                testId="addFoodFoodNameInput"
                                value={values.name}
                            />

                            <DialDatePicker
                                date={values.expires}
                                label="When does it expire?"
                                setDate={(date) => setFieldValue('expires', date)}
                            />

                            <SingleSelect
                                label="How many servings?"
                                options={servingsOptions}
                                selected={values.servings}
                                setSelected={(option) => setFieldValue('servings', option.value)}
                                testId="addFoodFormServings"
                            />

                            <Button testId="addFoodFormButton" variant="submit">
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </S.Wrapper>
    );
};

export default AddFoodForm;
