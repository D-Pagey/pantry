import React from 'react';
import App from '.';

describe('App component', (): void => {
  it('should render', (): void => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
