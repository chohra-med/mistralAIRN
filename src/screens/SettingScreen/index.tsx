import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {List, Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useAppTheme} from '~/container/AppThemeProvider';
import {appConfigActions} from '~/redux/appConfig/appConfig';
import {AppLanguageType} from '~/redux/appConfig/appConfigModel';
import appConfigSelectors from '~/redux/appConfig/appConfigSelectors';
import {containerStyle} from '~/theme/globalStyling/cards';

export const SettingScreen = (): JSX.Element => {
  const [isAccordionVisible, setAccordionVisible] = useState(false);

  const handleAccordionPress = () =>
    setAccordionVisible(prevState => !prevState);

  // Just adding the right hook to change translation, because we are using it on  LanguageHelper context
  const {t} = useTranslation('common');
  const isDarkMode = useSelector(appConfigSelectors.isDarkMode);

  const dispatch = useDispatch();
  const {colors} = useAppTheme();

  const onTogglePress = () => {
    dispatch(appConfigActions.toggleDarkMode());
  };
  return (
    <SafeAreaView
      testID="screen.settingScreen"
      style={containerStyle.container}>
      <List.Item
        style={[styles.listItem, {backgroundColor: colors.surface}]}
        titleStyle={{color: colors.text}}
        title={t('settingScreen.toggleTheme')}
        right={() => (
          <Switch value={isDarkMode} onValueChange={onTogglePress} />
        )}
      />

      <List.Accordion
        style={[styles.listItem, {backgroundColor: colors.surface}]}
        title={t('settingScreen.changeLanguage')}
        expanded={isAccordionVisible}
        onPress={handleAccordionPress}>
        <List.Item
          onPress={() => {
            dispatch(appConfigActions.changeLanguage(AppLanguageType.FRENCH));
            handleAccordionPress();
          }}
          title={t('settingScreen.frLanguage')}
        />
        <List.Item
          onPress={() => {
            dispatch(appConfigActions.changeLanguage(AppLanguageType.ENGLISH));
            handleAccordionPress();
          }}
          title={t('settingScreen.enLanguage')}
        />
        <List.Item
          onPress={() => {
            dispatch(appConfigActions.changeLanguage(AppLanguageType.ARABIC));
            handleAccordionPress();
          }}
          title={t('settingScreen.arLanguage')}
        />
      </List.Accordion>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
  },
});
export default SettingScreen;
