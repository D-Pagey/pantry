import { CategoryType, DatabaseCategoryWithCountsType } from '../../types';

export const formatCategories = (categories: DatabaseCategoryWithCountsType[]): CategoryType[] => {
    return categories.reduce((acc, curr) => {
        if (curr.name === 'expiring') return acc;

        return [
            ...acc,
            {
                ...curr,
                label: curr.name,
                value: curr.name
            }
        ];
    }, [] as CategoryType[]);
};