import React from 'react';
import { ChooseCategory, ChooseCategoryTypes } from '.';

export default { title: 'ChooseCategory' };

const props: ChooseCategoryTypes = {
    onClick: (category) => console.log(category)
};

export const normal = () => <ChooseCategory {...props} />;
export const selected = () => (
    <ChooseCategory
        {...props}
        selected={{
            count: 1,
            label: 'vegetables',
            value: 'vegetables',
            colour: 'green',
            id: '1111',
            name: 'vegetables'
        }}
    />
);
