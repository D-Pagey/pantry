import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';
import { TenantDan, TenantHeidi } from '../../fixtures';
import { OwnerFilter } from '.';

const props = {
    tenants: [TenantDan, TenantHeidi],
    setSelectedTenants: () => null,
    selectedTenants: []
};

describe('OwnerFilter component', () => {
    it('should render', () => {
        const { container } = render(<OwnerFilter {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call setSelectedTenants with selecting a tenant', () => {
        const setSelectedTenants = jest.fn();

        render(<OwnerFilter {...props} setSelectedTenants={setSelectedTenants} />);

        userEvent.click(screen.getByTestId(`ownerFilter${TenantDan.name}`));

        expect(setSelectedTenants).toHaveBeenCalledWith([TenantDan.uid]);
    });

    it('should call setSelectedTenants with correct values when deselecting a tenant', () => {
        const setSelectedTenants = jest.fn();
        const selectedTenants = [TenantDan.uid, TenantHeidi.uid];

        render(<OwnerFilter {...props} selectedTenants={selectedTenants} setSelectedTenants={setSelectedTenants} />);

        // deselect Dan
        userEvent.click(screen.getByTestId(`ownerFilter${TenantDan.name}`));

        expect(setSelectedTenants).toHaveBeenCalledWith([TenantHeidi.uid]);
    });

    it('should call setSelectedTenants with correct values when resetting', () => {
        const setSelectedTenants = jest.fn();
        const selectedTenants = [TenantDan.uid, TenantHeidi.uid];

        render(<OwnerFilter {...props} selectedTenants={selectedTenants} setSelectedTenants={setSelectedTenants} />);

        // deselect Dan
        userEvent.click(screen.getByText('Clear Filter'));

        expect(setSelectedTenants).toHaveBeenCalledWith([]);
    });
});
