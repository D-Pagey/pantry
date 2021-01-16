import { getInitials } from './utils';

describe('getInitial function', () => {
    it.each`
        email
        ${'dan@google.com'}
        ${undefined}
    `('should return name initials if email = $email', ({ email }) => {
        const initials = getInitials({ name: 'Dan Page', email });

        expect(initials).toBe('DP');
    });

    it('should return first letter if only email provided', () => {
        const initials = getInitials({ name: undefined, email: 'dan@google.com' });

        expect(initials).toBe('D');
    });
});
