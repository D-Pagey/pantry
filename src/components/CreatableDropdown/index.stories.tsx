import React from 'react';
import { Fridge } from '../../fixtures';
import { CreatableDropdown } from '.';

export default { title: 'CreatableDropdown' };

const names = Fridge.map((item) => item.name);

export const normal = () => <CreatableDropdown options={names} setSelected={(e) => console.log({ e })} />;
