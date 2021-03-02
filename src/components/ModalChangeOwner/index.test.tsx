import { addDays } from 'date-fns';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../test-utils';
import { ExpiredBatch, TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';
import { ModalChangeOwner } from '.';

const props = {
    handleModalClose: () => null,
    handleOwnerChange: () => null,
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

    it('should call handleOwnerChange when clicking a profile photo', () => {
        const handleOwnerChange = jest.fn();
        const batch = {
            ownerId: TenantDan.uid,
            expires: new Date(),
            quantity: 2,
            id: 'hello'
        };

        render(
            <ModalChangeOwner
                {...props}
                handleOwnerChange={handleOwnerChange}
                selectedBatch={batch}
                tenants={[TenantDan, TenantHeidi]}
            />
        );

        userEvent.click(screen.getByTestId(TenantHeidi.uid));

        expect(handleOwnerChange).toHaveBeenCalledWith(TenantHeidi.uid, batch.id);
    });

    it('should render no tenants message when a household of 1 tenant', () => {
        const batch = {
            expires: addDays(new Date(), 5),
            id: 'batchId',
            ownerId: TenantJoe.uid,
            quantity: 5
        };

        render(<ModalChangeOwner {...props} selectedBatch={batch} tenants={[TenantJoe]} />);

        screen.getByText(
            'There is no one else in your household to change to. You can invite friends via the Settings page.'
        );
    });
});
