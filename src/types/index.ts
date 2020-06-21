export type BatchType = {
    expires: Date | any;
    owner: string;
    servings: number;
};

export type FoodType = {
    batches: BatchType[];
    category: string;
    name: string;
};

export type DropdownOptionType = {
    label: string;
    value: string;
};