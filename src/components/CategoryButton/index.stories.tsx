import React from 'react';
import { CategoryButton } from '.';

export default { title: 'CategoryButton' };

const handleClick = (): void => alert('meat');

export const unselected = (): JSX.Element => <CategoryButton name="meat" handleClick={handleClick} />;

export const selected = (): JSX.Element => <CategoryButton isSelected name="meat" handleClick={handleClick} />;
