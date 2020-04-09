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

export interface FoodTypes {
    categories: string[];
    expires: Date;
    id: string;
    name: string;
    servings: number;
}