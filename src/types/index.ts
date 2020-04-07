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