import {useAppTheme} from '~/container/AppThemeProvider';
import * as React from 'react';
import {ColorValue, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {TextProps, Text, List, ListItemProps} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import CopiedListItem from '../CopiedListItem';

export type InfoList = {
  title: string;
  value: string | number | undefined;
  isCopied?: boolean;
}[];

interface ListItemInfoProps extends ListItemProps {
  title: string;
  infos: InfoList;
  iconName: IconSource;
  isVisible: boolean;
}

const ListItemInfo: React.FC<ListItemInfoProps> = ({
  title,
  infos,
  iconName,
  isVisible = true,
}) => {
  if (!isVisible) {
    return <></>;
  }
  return (
    <List.Accordion
      testID="list-item"
      title={title}
      left={props => <List.Icon {...props} icon={iconName} />}>
      {infos.map((item, index) => {
        if (!item.value) {
          return <></>;
        }
        return item.isCopied ? (
          <CopiedListItem key={index} title={item.title} value={item.value} />
        ) : (
          <List.Item
            style={styles.listItemContainer}
            key={index}
            title={`${item.title}: ${item.value}`}
          />
        );
      })}
    </List.Accordion>
  );
};
const styles = StyleSheet.create({
  listItemContainer: {
    marginLeft: -50,
  },
});

export default React.memo(ListItemInfo);
