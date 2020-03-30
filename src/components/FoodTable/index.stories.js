/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import FoodTable from '.';

const props = {
  match: {
    params: {
      category: 'meat',
    },
  },
};

const firebaseContext = {
  fridge: [
    {
      category: 'meat',
      expires: new Date(2019, 9, 12),
      name: 'chicken',
      servings: 2,
    },
    {
      category: 'fish',
      expires: new Date(2019, 3, 9),
      name: 'salmon',
      servings: 1,
    },
  ],
  updateFridge: () => {},
};

storiesOf('FoodTable', module)
  .addDecorator((storyFn) => (
    <FirebaseContext.Provider value={{ ...firebaseContext }}>{storyFn()}</FirebaseContext.Provider>
  ))
  .add('meat', () => <FoodTable {...props} />)
  .add('all', () => <FoodTable {...props} match={{ params: { category: 'all' } }} />);
