import React from 'react';
import { ChooseCategory, ChooseCategoryTypes } from '.';

export default { title: 'ChooseCategory' };

const props: ChooseCategoryTypes = {
    onClick: (category) => console.log(category)
};

export const normal = () => <ChooseCategory {...props} />;
export const selected = () => <ChooseCategory {...props} selected="vegetables" />;
