type getInitialProps = {
    email: string;
    name?: string;
};

export const getInitials = ({ email, name }: getInitialProps): string => {
    let nameOrEmail = '';

    if (name) {
        nameOrEmail = name;
    } else if (email) {
        nameOrEmail = email;
    }

    return nameOrEmail
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
};
