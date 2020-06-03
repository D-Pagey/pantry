import React from 'react';
import { CategoryButton } from '.';

export default { title: 'CategoryButton' };

export const meat = () => <CategoryButton name="meat" onClick={() => alert('meat')} />;
