import React from 'react';
import { ChooseCategory, ChooseCategoryTypes } from '.';

export default { title: 'ChooseCategory' };

const props: ChooseCategoryTypes = {
    handleClick: (category) => console.log(category)
};

export const normal = (): JSX.Element => <ChooseCategory {...props} />;
export const selected = (): JSX.Element => <ChooseCategory {...props} selected="meat" />;
