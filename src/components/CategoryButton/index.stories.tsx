import React from 'react';
import { CategoryButton } from '.';

export default { title: 'CategoryButton' };

export const unselected = () => <CategoryButton name="meat" onClick={() => alert('meat')} />;

export const selected = () => <CategoryButton isSelected name="meat" onClick={() => alert('meat')} />;
