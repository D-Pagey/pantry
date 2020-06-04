import React, { FC, useState } from 'react';
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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [servings, setServings] = useState();

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setStep(2);
    };

    return (
        <>
            <Header />

            <S.Wrapper>
                {step === 1 && <ChooseCategory onClick={handleCategoryClick} selected={selectedCategory} />}
                {step === 2 && (
                    <>
                        <Input
                            label={`What type of ${selectedCategory} is it?`}
                            onChange={(e: any) => setName(e.target.value)}
                            placeholder="e.g. Carrot"
                            value={name}
                        />

                        <SingleSelect
                            label="How many servings?"
                            options={options}
                            setSelected={(option: any) => setServings(option.value)}
                            selected={servings}
                        />
                    </>
                )}
            </S.Wrapper>
        </>
    );
};
