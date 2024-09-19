import React from 'react';
import {useSelector} from 'react-redux';

import AppScreens, {
  AppScreenProps,
} from '~/navigation/AppNavigation/AppScreens';
import {useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppTheme} from '~/container/AppThemeProvider';
import {containerStyle} from '~/theme/globalStyling/cards';
import {List} from 'react-native-paper';
import {t} from 'i18next';
import {moderateScale} from 'react-native-size-matters';
import {convertTimeStamp} from '~/utils/helpers/timeUtils';
import ListItemInfo from '~/components/ListItemInfo';
import TopHeaderCloseIcon from '~/components/TopHeaderCloseIcon';
import {blocksSelectors} from '~/redux/blocks/blocks';
import CopiedListItem from '~/components/CopiedListItem';

type BlockItemScreenRouteType =
  AppScreenProps<AppScreens.BLOCK_ITEM_SCREEN>['route'];

const BlockItemScreen = () => {
  const route = useRoute<BlockItemScreenRouteType>();
  const {blockID} = route.params || {};

  const block = useSelector(blocksSelectors.selectBlockById(blockID));

  const {colors} = useAppTheme();

  if (!block) {
    return <></>;
  }

  return (
    <View
      testID={`screen.BlockItemScreen.${blockID}`}
      style={[styles.container, {borderTopColor: colors.onBackground}]}>
      <TopHeaderCloseIcon />
      <ScrollView>
        <List.Section title={t('blockScreen.blockTitle')}>
          <CopiedListItem title={t('blockScreen.blockId')} value={blockID} />
          <ListItemInfo
            key={'blockScreen.blockInfo'}
            isVisible
            title={t('blockScreen.blockInfo')}
            iconName={'information'}
            infos={[
              {
                title: t('blockScreen.blockHeight'),
                value: block?.height,
              },
              {
                title: t('blockScreen.blockVersion'),
                value: block?.version,
              },
              {
                title: t('blockScreen.blockTransactionRoot'),
                value: block?.transactionRoot,
              },
              {
                title: t('blockScreen.blockAssertRoot'),
                value: block?.assetRoot,
              },
              {
                title: t('blockScreen.previousBlockId'),
                value: block?.previousBlockID,
                isCopied: true,
              },
              {
                title: t('blockScreen.blockTransactionNumber'),
                value: block?.numberOfTransactions,
              },
              {
                title: t('blockScreen.blockNumberOfAssets'),
                value: block?.numberOfAssets,
              },
              {
                title: t('blockScreen.blockNumberOfEvents'),
                value: block?.numberOfEvents,
              },
              {
                title: t('blockScreen.blockTime'),
                value: convertTimeStamp(block?.timestamp),
              },
              {
                title: t('blockScreen.blockSignature'),
                value: block?.signature,
                isCopied: true,
              },
            ]}
          />

          <ListItemInfo
            key={'blockScreen.blockGenerator'}
            isVisible={!!block.generator.address}
            title={t('blockScreen.blockGenerator')}
            iconName={'send-circle'}
            infos={[
              {
                title: t('blockScreen.blockGeneratorAddress'),
                value: block?.generator?.address,
                isCopied: true,
              },
              {
                title: t('blockScreen.blockGeneratorName'),
                value: block?.generator?.name,
              },
              {
                title: t('blockScreen.blockGeneratorPublicKey'),
                value: block?.generator?.publicKey,
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

export default React.memo(BlockItemScreen);
