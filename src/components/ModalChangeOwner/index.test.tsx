import React from 'react';

import { render } from '../../test-utils';
import { TenantDan, TenantJoe, UserDan } from '../../fixtures';
import { ModalChangeOwner } from '.';

const props = {
    closeModal: () => () => null,
    handleChangeOwnerClick: () => () => null,
    ownerId: UserDan.uid,
    tenants: [TenantDan, TenantJoe]
};

describe('ModalChangeOwner component', () => {
    it('should render', () => {
        const { container } = render(<ModalChangeOwner {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
