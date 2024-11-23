import { LinkingOptions } from '@react-navigation/native';
import AppScreens from './AppNavigation/AppScreens';

const LinkingConfiguration: LinkingOptions<{}> = {
  // we use our Link here
  prefixes: ['mistralAiRNWrapper://'],
  config: {
    screens: {
      initialRouteName: 'blocks',
      [AppScreens.HOME_SCREEN]: {
        path: 'home',
      },
    },
  },
};
export default LinkingConfiguration;
