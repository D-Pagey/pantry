import React from 'react';
import { waitFor } from '@testing-library/react';
import { App } from '.';

describe('App component', () => {
  it('should render', async () => {
    const { container } = render(<App />);
    await waitFor(() => expect(container.firstChild).toMatchSnapshot());
  });
});
