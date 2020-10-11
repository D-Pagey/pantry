import React from 'react';
import { render } from '../../test-utils';
import { ModalHousehold } from '.';

const props = {
    isAdmin: false,
    onModalClose: () => null
};

describe('ModalHousehold component', () => {
    it('should render', () => {
        const { container } = render(<ModalHousehold {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
