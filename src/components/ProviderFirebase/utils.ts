import { differenceInDays } from 'date-fns';

interface CategoryType {
  label: string;
  colour: string;
}

interface CategoryWithCountType extends CategoryType {
  count: number;
}

interface FoodType {
  category: {
    label: string;
    color: string;
  };
  expires: Date;
  id: string;
  name: string;
  servings: number;
}

interface FoodWithExpiringType extends FoodType {
  isExpiringSoon: boolean;
}

export const indexOfLabel = (arrayOfLabels: string[], label: string): number => {
  return arrayOfLabels.reduce((acc, cur, index) => {
    if (cur === label) return index;
    return acc;
  }, -1);
};

export const countCategories = (categories: CategoryType[]): CategoryWithCountType[] => {
  if (categories.length === 0) return [];

  const reducedCategories = categories.reduce((acc, curr): CategoryWithCountType[] => {
    const arrayOfLabels = acc.map((item) => item.label);
    const index = indexOfLabel(arrayOfLabels, curr.label);

    if (index === -1) {
      acc.push({ ...curr, count: 1 });
    } else {
      const newAcc = [...acc];
      newAcc[index].count += 1;
      return newAcc;
    }

    return acc;
  }, [] as CategoryWithCountType[]);

  reducedCategories.push({ label: 'all', colour: 'blue', count: categories.length });

  return reducedCategories;
};

export const calculateExpiringSoon = (food: FoodType[]): FoodWithExpiringType[] => {
  return food.map((item) => {
    const difference = differenceInDays(item.expires, new Date());

    return {
      ...item,
      isExpiringSoon: difference <= 2 ? true : false
    };
  });
};
