import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from './Dashboard';

describe('Dashboard Component Snapshots', () => {
  it('matches snapshot in loading state', () => {
    const tree = renderer.create(<Dashboard state="loading" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot in error state', () => {
    const tree = renderer.create(<Dashboard state="error" error="Failed to fetch data." />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot in empty state', () => {
    const tree = renderer.create(<Dashboard state="empty" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot in loaded state', () => {
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    const tree = renderer.create(<Dashboard state="loaded" data={mockData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});