import { render } from '../../test-utils';
import { ExpiredBatch, TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';
import { ModalChangeOwner } from '.';

const props = {
    handleModalClose: () => null,
    itemName: 'steak',
    selectedBatch: ExpiredBatch,
    tenants: [TenantDan, TenantHeidi, TenantJoe],
    unit: 'serving'
};

describe('ModalChangeOwner component', () => {
    it('should render', () => {
        const { container } = render(<ModalChangeOwner {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
