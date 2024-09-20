import React, {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import AppScreens, {
  AppScreenProps,
} from '~/navigation/AppNavigation/AppScreens';
import {useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppTheme} from '~/container/AppThemeProvider';
import {containerStyle} from '~/theme/globalStyling/cards';
import {List} from 'react-native-paper';
import {t} from 'i18next';
import {moderateScale} from 'react-native-size-matters';
import TopHeaderCloseIcon from '~/components/TopHeaderCloseIcon';
import {propertiesSelectors} from '~/redux/properties/properties';
import StyledImage from '~/components/StyledImage';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type BlockItemScreenRouteType =
  AppScreenProps<AppScreens.PROPERTY_ITEM_SCREEN>['route'];

const PropertyItemScreen = () => {
  const [isFullScreenImage, setIsFullScreenImage] = React.useState(false);

  const {colors} = useAppTheme();

  const route = useRoute<BlockItemScreenRouteType>();
  const {propertyID} = route.params || {};

  const property = useSelector(
    propertiesSelectors.selectPropertyById(propertyID),
  );

  const handleImagePress = useCallback(() => {
    setIsFullScreenImage(true);
  }, [setIsFullScreenImage]);

  const handleCloseFullScreenImage = useCallback(() => {
    setIsFullScreenImage(false);
  }, [setIsFullScreenImage]);

  const renderFullScreenImage = useMemo(() => {
    return (
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseFullScreenImage}>
          <Icon name="close" size={24} color={colors.primary} />
        </TouchableOpacity>
        <StyledImage
          source={{uri: property?.imageUrl}}
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
      </View>
    );
  }, [
    isFullScreenImage,
    handleCloseFullScreenImage,
    colors.primary,
    property?.imageUrl,
  ]);

  if (!property) {
    return <></>;
  }

  return (
    <>
      {!isFullScreenImage ? (
        <ScrollView
          testID={`screen.PropertyItemScreen.${property.id}`}
          style={styles.container}>
          <TouchableOpacity onPress={handleImagePress}>
            <StyledImage
              source={{uri: property.imageUrl}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <List.Section>
              <List.Subheader>
                {t('propertyScreen.property.details')}
              </List.Subheader>
              <List.Item
                title={t('propertyScreen.property.title')}
                description={property.title}
              />
              <List.Item
                title={t('propertyScreen.property.price')}
                description={`$${property.price.toLocaleString()}`}
              />
              <List.Item
                title={t('propertyScreen.property.address')}
                description={property.address}
              />
              <List.Item
                title={t('propertyScreen.property.bedrooms')}
                description={property.bedrooms.toString()}
              />
              <List.Item
                title={t('propertyScreen.property.bathrooms')}
                description={property.bathrooms.toString()}
              />
              <List.Item
                title={t('propertyScreen.property.size')}
                description={`${property.size} sq ft`}
              />
              <List.Item
                title={t('propertyScreen.property.status')}
                description={property.status}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>
                {t('propertyScreen.property.description')}
              </List.Subheader>
              <List.Item title={property.description} />
            </List.Section>
          </View>
        </ScrollView>
      ) : (
        renderFullScreenImage
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containerStyle.container,
  },
  successTextContainer: {
    height: moderateScale(50),
  },
  successText: {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(80),
  },
  image: {
    width: '100%',
    height: moderateScale(200),
  },
  contentContainer: {
    padding: moderateScale(16),
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(16),
    right: moderateScale(16),
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default React.memo(PropertyItemScreen);
