import React from 'react';
import { storiesOf } from '@storybook/react';
import { CategoryButton } from '.';

storiesOf('CategoryButton', module).add('default', () => <CategoryButton name="meat" />);
