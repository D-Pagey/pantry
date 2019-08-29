import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileNavbar from '.';

const props = {};

storiesOf('MobileNavbar', module).add('default', () => <MobileNavbar {...props} />);
