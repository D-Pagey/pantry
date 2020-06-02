import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from '.';

storiesOf('Header', module).add('default', () => <Header />).add('on add page', () => <Header page="Add an item"/>);
