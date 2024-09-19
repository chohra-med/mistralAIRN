import React from 'react';
import {customRender} from '../../../__tests__/testHelper';
import ListItemInfo from '../ListItemInfo';

describe('ListItemInfo component', () => {
  const infos = [
    {title: 'Info 1', value: 'Value 1', isCopied: false},
    {title: 'Info 2', value: 123, isCopied: true},
    {title: 'Info 3', value: undefined, isCopied: false},
  ];

  it('renders without crashing', () => {
    customRender(
      <ListItemInfo
        title="Test Title"
        infos={infos}
        iconName="test-icon"
        isVisible={true}
      />,
    );
  });

  it('renders correct number of List.Item components', () => {
    const {queryAllByTestId} = customRender(
      <ListItemInfo
        title="Test Title"
        infos={infos}
        iconName="test-icon"
        isVisible={true}
      />,
    );
    expect(queryAllByTestId('list-item')).toBeTrue();
  });

  it('renders correct number of CopiedListItem components', () => {
    const {queryAllByTestId} = customRender(
      <ListItemInfo
        title="Test Title"
        infos={infos}
        iconName="test-icon"
        isVisible={true}
      />,
    );
    expect(queryAllByTestId('copied-list-item')).toBeTrue();
  });

  it('renders no components when isVisible is false', () => {
    const {container} = customRender(
      <ListItemInfo
        title="Test Title"
        infos={infos}
        iconName="test-icon"
        isVisible={false}
      />,
    );
    expect(container).toBeNull();
  });
});
