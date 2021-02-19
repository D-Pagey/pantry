import React from 'react';
import { render } from '../../test-utils';
import { TenantDan } from '../../fixtures';
import { ModalHousehold } from '.';

const props = {
    handleCancelInvite: () => null,
    handleClose: () => null,
    handleLeaveHousehold: () => null,
    handlePromoteUser: () => null,
    handleRemoveUser: () => null,
    loading: false,
    currentTenant: TenantDan
};

describe('ModalHousehold component', () => {
    it('should render', () => {
        const { container } = render(<ModalHousehold {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
