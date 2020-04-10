import React from 'react';
import { toast } from 'react-toastify';
import { PageHome } from '.';

const props = {};

const context = {
  isAuthed: false,
  isCheckingAuth: true,
};

describe('PageHome component', () => {
  it('should render', () => {
    const { container } = render(<PageHome {...props} />, context);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render loading spinner if checking auth', () => {
    const { queryByTestId } = render(<PageHome {...props} />, context);
    expect(queryByTestId('pageHome')).toBeNull();
  });

  it('should render category list if authed', () => {
    const { getByTestId } = render(<PageHome {...props} />, {
      ...context,
      isAuthed: true,
      isCheckingAuth: false,
    });
    getByTestId('categoryList');
  });
});
