import { LinkingOptions } from '@react-navigation/native';
import AppScreens from './AppNavigation/AppScreens';

const LinkingConfiguration: LinkingOptions<{}> = {
  // we use our Link here
  prefixes: ['lightCurve://'],
  config: {
    screens: {
      initialRouteName: 'blocks',
      [AppScreens.BLOCK_SCREEN]: {
        path: 'blocks',
      },
      [AppScreens.TRANSACTION_SCREEN]: {
        path: 'transactions'
      },
      [AppScreens.TRANSACTION_ITEM_SCREEN]: {
        path: 'transactions/:transactionID'
      },
    },
  },
};
export default LinkingConfiguration;
