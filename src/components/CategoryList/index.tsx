import React from 'react';
import CategoryCard from '../CategoryCard';
import { arrayOf, string, shape, number } from 'prop-types';
import * as S from './styles';

type ItemType = {
    label: string;
    colour: string;
    count: number;
};

type CategoryListTypes = {
    categoryCounts: ItemType[];
};

const CategoryList = ({ categoryCounts }: CategoryListTypes): JSX.Element => {
    return (
        <S.Wrapper data-testid="categoryList">
            {categoryCounts.map((item: ItemType) => (
                <CategoryCard
                    label={item.label}
                    colour={item.colour}
                    quantity={item.count}
                    key={item.label}
                />
            ))}
        </S.Wrapper>
    );
};

CategoryList.propTypes = {
    categoryCounts: arrayOf(shape({ category: string, colour: string, count: number })).isRequired
};

export default CategoryList;
