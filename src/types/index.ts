export type BatchType = {
    expires: Date | any;
    owner: string;
    servings: number;
};

export type FoodType = {
    category: string;
    name: string;
    batches: BatchType[];
};

export type DropdownOptionType = {
    label: string;
    value: string;
};