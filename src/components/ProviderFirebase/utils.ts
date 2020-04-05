import { differenceInDays } from 'date-fns';
import { CategoryType } from '../../types';

interface FoodType {
  categories: string[];
  expires: Date;
  id: string;
  name: string;
  servings: number;
}

interface FoodWithExpiringType extends FoodType {
  isExpiringSoon: boolean;
}

export const indexOfLabel = (arrayOfLabels: string[], label: string): number => arrayOfLabels.reduce((acc, cur, index) => {
  if (cur === label) return index;
  return acc;
}, -1);

// TODO: Delete this
export const calculateExpiringSoon = (food: FoodType[]): FoodWithExpiringType[] => food.map((item) => {
  const difference = differenceInDays(item.expires, new Date());

  return {
    ...item,
    isExpiringSoon: difference <= 2,
  };
});

export const updateCategories = (allCategories: CategoryType[], itemCategoryIds: string[]): CategoryType[] => {
  return allCategories.reduce((acc, curr) => {
    // when the selected categories are in the total categories
    // increment the count
    if (itemCategoryIds.includes(curr.id)) {
        const incrementedCount = {...curr, count: curr.count + 1};
        return [...acc, incrementedCount];
      }

      return [...acc, curr];
  }, [] as CategoryType[]);
};