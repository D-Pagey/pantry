import React, { FC, useState } from 'react';
import { Header } from '../Header';
import { ChooseCategory } from '../ChooseCategory';
import * as S from './styles';

export const PageAddFoodForm2: FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [step, setStep] = useState(1);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setStep(2);
    };

    return (
        <>
            <Header />

            <S.Wrapper>
                {step === 1 && <ChooseCategory onClick={handleCategoryClick} selected={selectedCategory} />}
                {step === 2 && <p>Step 2</p>}
            </S.Wrapper>
        </>
    );
};
