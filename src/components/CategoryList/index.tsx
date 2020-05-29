import React, { useContext } from 'react';
import arraySort from 'array-sort';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryCard } from '../CategoryCard';
import * as S from './styles';

type ItemType = {
    colour: string;
    count: number;
    name: string;
};

export const CategoryList = (): JSX.Element => {
    const { categories, fridge } = useContext(FirebaseContext);

    const alphabetical = arraySort([...categories], 'name');

    return (
        <S.Wrapper data-testid="categoryList">
            <CategoryCard name="all" colour="orange" quantity={fridge.length} />
            {alphabetical.map((item: ItemType) => {
                if (item.count > 0) {
                    return <CategoryCard name={item.name} colour={item.colour} quantity={item.count} key={item.name} />;
                }

                return <React.Fragment key={item.name} />;
            })}
        </S.Wrapper>
    );
};
