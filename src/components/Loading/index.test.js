import React from 'react';
import { Loading } from '.';

const props = {
  isLoading: true
};

describe('Loading component', () => {
  it('should render', () => {
    const { container, getByTestId } = render(<Loading {...props} />);
    expect(container.firstChild).toMatchSnapshot();
    getByTestId('loading');
  });
});
