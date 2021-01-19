import React from 'react';
import { render } from '../../test-utils';
import { ModalHousehold } from '.';

const props = {
    handleCancelInvite: () => null,
    handleClose: () => null,
    handleLeaveHousehold: () => null,
    handlePromoteUser: () => null,
    handleRemoveUser: () => null,
    loading: false,
    showCancelOption: true,
    showLeaveOption: true,
    showRemoveOptionts: true,
    showPromoteOption: true,
    showRemoveOption: true
};

describe('ModalHousehold component', () => {
    it('should render', () => {
        const { container } = render(<ModalHousehold {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
