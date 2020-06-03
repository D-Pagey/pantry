import React, { FC } from 'react';
import { CategoryButton } from '../CategoryButton';
import * as S from './styles';

export const ChooseCategory: FC = () => {
    return (
        <div>
            <S.Title>What type of food?</S.Title>

            <S.Grid>
                <CategoryButton name="vegetables" onClick={() => alert('vegetables')} />
                <CategoryButton name="fruit" onClick={() => alert('fruit')} />
                <CategoryButton name="dairy" onClick={() => alert('dairy')} />
                <CategoryButton name="meat" onClick={() => alert('meat')} />
                <CategoryButton name="fish" onClick={() => alert('fish')} />
                <CategoryButton name="[opened tin]" onClick={() => alert('opened tin')} />
            </S.Grid>
        </div>
    );
};
