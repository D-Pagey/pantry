import React, { useContext } from 'react';
import arraySort from 'array-sort';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryButton } from '../CategoryButton';
import * as S from './styles';

type ItemType = {
    colour: string;
    count: number;
    name: string;
};

export const CategoryList = (): JSX.Element => {
    const { categories } = useContext(FirebaseContext);

    const alphabetical = arraySort([...categories], 'name');

    return (
        <S.Wrapper data-testid="categoryList">
            <CategoryButton name="all" onClick={() => alert('all')} />
            {alphabetical.map((item: ItemType) => {
                if (item.count > 0) {
                    return <CategoryButton name={item.name} onClick={() => alert(item.name)} key={item.name} />;
                }

                return <React.Fragment key={item.name} />;
            })}
        </S.Wrapper>
    );
};
