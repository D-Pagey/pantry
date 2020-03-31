import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import { Button } from '.';

const variants = {
    'Default button': '',
    'Selected (selected)': 'selected',
    'UnSelected (unselected)': 'unselected',
    'Submit (submit)': 'submit'
};

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('default', () => {
        const width = `${number('width (px)', 150)}px`;

        return (
            <Button variant={select('type (style of button)', variants, '')} width={width}>
                {text('children', 'Click me')}
            </Button>
        );
    });
