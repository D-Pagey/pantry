import React from 'react';
import App from '.';

// TO DO: Test that mobile nav doesnt render on bigger viewports

describe('App component', () => {
  it('should render', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
