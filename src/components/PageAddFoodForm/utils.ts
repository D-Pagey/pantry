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

/**
 * Take the category ids and exchanges for form values
 */
export const swapCategoryIdsForValues = (categoryIds: string[], categories: DatabaseCategoryWithCountsType[]): CategoryType[] => {
    const formattedCategories = formatCategories(categories);

    return categoryIds.reduce((acc, curr): CategoryType[] => {
        const category = formattedCategories.find((formatted) => formatted.id === curr);

        if (category) {
            return [...acc, category];
        }

        return acc;
    }, [] as CategoryType[]);
};