import React, { FC, useState } from 'react';
import { CategoryButton } from '../CategoryButton';
import * as S from './styles';

const categories = ['vegetables', 'fruit', 'dairy', 'meat', 'fish', '[opened tin]'];

export const ChooseCategory: FC = () => {
    const [selected, setSelected] = useState('');

    const handleClick = (category: string) => () => setSelected(category);

    return (
        <div>
            <S.Title>What type of food?</S.Title>

            <S.Grid>
                {categories.map((category) => (
                    <CategoryButton
                        isSelected={selected === category}
                        name={category}
                        onClick={handleClick(category)}
                    />
                ))}
            </S.Grid>
        </div>
    );
};
