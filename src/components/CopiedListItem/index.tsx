import {useAppTheme} from '~/container/AppThemeProvider';
import * as React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {TextProps, Text, List, ListItemProps} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import StyledText from '../Text';
import {moderateScale} from 'react-native-size-matters';
import {t} from 'i18next';

interface ListItemInfoProps extends ListItemProps {
  value: string | number | undefined;
  title: string;
  listItemStyle?: ViewStyle;
}

const CopiedListItem: React.FC<ListItemInfoProps> = ({
  title,
  value,
  listItemStyle,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const {colors} = useAppTheme();

  const copyToClipboard = React.useCallback(() => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [setCopied]);

  return (
    <>
      <List.Item
        testID="copied-list-item"
        title={`${title}: ${value}`}
        onPress={copyToClipboard}
        style={[styles.listContainer, listItemStyle]}
        left={() => <List.Icon color={colors.text} icon="content-copy" />}
        {...props}
      />
      {copied && (
        <View style={styles.successTextContainer}>
          <StyledText
            small
            textColor={colors.successText}
            style={styles.successText}>
            {t('common.textCopied', {
              title: title,
            })}
          </StyledText>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: moderateScale(16),
  },
  successTextContainer: {
    height: moderateScale(50),
  },
  successText: {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(80),
  },
});

export default React.memo(CopiedListItem);
