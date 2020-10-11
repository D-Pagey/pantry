import React from 'react';
import { render } from '../../test-utils';
import { ModalHousehold } from '.';

const props = {
    isCurrentUser: false,
    handleLeaveHousehold: () => null,
    onModalClose: () => null
};

describe('ModalHousehold component', () => {
    it('should render', () => {
        const { container } = render(<ModalHousehold {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
