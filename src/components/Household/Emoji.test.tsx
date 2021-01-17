import React from 'react';
import { render, screen } from '../../test-utils';
import { HouseRoleType } from '../../types';
import { Emoji } from './Emoji';

const props = {
    houseRole: 'admin' as HouseRoleType
};

describe('Emoji component', () => {
    it('should render', () => {
        const { container } = render(<Emoji {...props} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        houseRole    | emoji
        ${'admin'}   | ${'🥑'}
        ${'tenant'}  | ${'🥕'}
        ${'alexa'}   | ${'🤖'}
        ${'pending'} | ${'🥔'}
    `('should render $emoji for $houseRole', ({ emoji, houseRole }) => {
        render(<Emoji {...props} houseRole={houseRole} />);

        screen.getByText(emoji);
    });
});
