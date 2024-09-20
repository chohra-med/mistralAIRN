import {useAppTheme} from '~/container/AppThemeProvider';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {OnAppScreenNavigationProps} from '~/navigation/types';

const TopHeaderCloseIcon: React.FC = () => {
  const navigation = useNavigation<OnAppScreenNavigationProps>();
  const {colors} = useAppTheme();

  const closeScreen = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.closeIconStyle}>
      <IconButton
        icon="close"
        iconColor={colors.text}
        size={moderateScale(24)}
        onPress={closeScreen}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  closeIconStyle: {
    position: 'absolute',
    right: moderateScale(16),
    top: 0,
    zIndex: 1,
  },
});

export default React.memo(TopHeaderCloseIcon);
