export type DatabaseCategoryType = {
    colour: string;   
    id: string;
    name: string;
};

export interface CategoryType extends DatabaseCategoryType {
    count: number;
    label: string;
    value: string;
}

export type FoodTypes = {
    categories: string[];
    expires: Date;
    id: string;
    name: string;
    servings: number;
};