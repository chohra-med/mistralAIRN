import React from 'react';
import {useSelector} from 'react-redux';

import AppScreens, {
  AppScreenProps,
} from '~/navigation/AppNavigation/AppScreens';
import {useRoute} from '@react-navigation/native';
import {transactionsSelectors} from '~/redux/transactions/transactions';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppTheme} from '~/container/AppThemeProvider';
import {containerStyle} from '~/theme/globalStyling/cards';
import {List} from 'react-native-paper';
import {t} from 'i18next';
import {moderateScale} from 'react-native-size-matters';
import {convertTimeStamp} from '~/utils/helpers/timeUtils';
import ListItemInfo from '~/components/ListItemInfo';
import TopHeaderCloseIcon from '~/components/TopHeaderCloseIcon';
import CopiedListItem from '~/components/CopiedListItem';

type TransactionItemScreenRouteType =
  AppScreenProps<AppScreens.TRANSACTION_ITEM_SCREEN>['route'];

const TransactionItemScreen = () => {
  const route = useRoute<TransactionItemScreenRouteType>();
  const {transactionID} = route.params || {};

  const transaction = useSelector(
    transactionsSelectors.selectTransactionById(transactionID),
  );

  const {colors} = useAppTheme();

  if (!transaction) {
    return <></>;
  }

  return (
    <View
      testID={`screen.TransactionItemScreen.${transactionID}`}
      style={[styles.container, {borderTopColor: colors.onBackground}]}>
      <TopHeaderCloseIcon />
      <ScrollView>
        <List.Section title={t('transactionsScreen.transactionTitle')}>
          <CopiedListItem title={'transactionID'} value={transactionID} />

          <ListItemInfo
            isVisible
            title={t('transactionsScreen.transactionInfo')}
            iconName={'information'}
            infos={[
              {
                title: t('transactionsScreen.feeAmount'),
                value: transaction?.fee,
              },
              {
                title: t('transactionsScreen.minFee'),
                value: transaction?.minFee,
              },
              {
                title: t('transactionsScreen.sizeBlock'),
                value: transaction?.size,
              },
            ]}
          />
          <ListItemInfo
            isVisible={!!transaction?.block?.id}
            title={t('transactionsScreen.blockId')}
            iconName={'code-array'}
            infos={[
              {
                title: t('transactionsScreen.blockId'),
                value: transaction?.block?.id,
                isCopied: true,
              },
              {
                title: t('transactionsScreen.blockTimestamp'),
                value: convertTimeStamp(transaction?.block?.timestamp),
              },
              {
                title: t('transactionsScreen.blockHeight'),
                value: transaction?.block?.height,
              },
            ]}
          />
          <ListItemInfo
            isVisible={!!transaction?.meta?.amount}
            title={t('transactionsScreen.metaInfo')}
            iconName={'send-circle'}
            infos={[
              {
                title: t('transactionsScreen.metaAmount'),
                value: transaction?.meta?.amount,
              },
              {
                title: t('transactionsScreen.metaRecipientAddress'),
                value: transaction?.meta?.recipientAddress,
                isCopied: true,
              },
              {
                title: t('transactionsScreen.metaTokenId'),
                value: transaction?.meta?.tokenID,
              },
              {
                title: t('transactionsScreen.metaData'),
                value: transaction?.meta?.data,
              },
            ]}
          />
          <ListItemInfo
            isVisible={!!transaction?.sender?.address}
            title={t('transactionsScreen.sendInformation')}
            iconName={'send-circle'}
            infos={[
              {
                title: t('transactionsScreen.transactionAddress'),
                value: transaction?.sender?.address,
                isCopied: true,
              },
              {
                title: t('transactionsScreen.transactionName'),
                value: transaction?.sender?.name,
              },
              {
                title: t('transactionsScreen.transactionPublicKey'),
                value: transaction?.sender?.publicKey,
                isCopied: true,
              },
            ]}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containerStyle.container,
    borderTopWidth: 4,
    borderTopRadius: 8,
  },
  successTextContainer: {
    height: moderateScale(50),
  },
  successText: {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(80),
  },
});

export default React.memo(TransactionItemScreen);
