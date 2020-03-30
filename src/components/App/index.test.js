import React from 'react';
import { App } from '.';

describe('App component', () => {
  it('should render', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
