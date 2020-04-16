export interface DatabaseCategoryType {
    colour: string;   
    id: string;
    name: string;
}

export interface CategoryType extends DatabaseCategoryType {
    count: number;
    label: string;
    value: string;
}

export interface KeyedDatabaseCategoryType {
    [id: string]: CategoryType;
}

export type FoodTypes = {
    categories: string[];
    expires: Date;
    id: string;
    name: string;
    servings: number;
};

export type CategoryCountType = {
    [id: string]: number;
};