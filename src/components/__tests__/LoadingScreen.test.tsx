import * as React from 'react';
import {render} from '@testing-library/react-native';
import LoadingComponent from '../LoadingComponent';

describe('LoadingComponent', () => {
  it('renders null when loading prop is false', () => {
    const {container} = render(<LoadingComponent loading={false} />);
    expect(container.children.length).toBe(0);
  });

  it('renders null when loading prop is not provided', () => {
    const {container} = render(<LoadingComponent />);
    expect(container.children.length).toBe(0);
  });

  it('renders ActivityIndicator when loading prop is true', () => {
    const {getByTestId} = render(<LoadingComponent loading={true} />);
    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});
