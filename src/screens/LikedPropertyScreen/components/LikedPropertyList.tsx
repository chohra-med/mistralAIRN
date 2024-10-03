import React, {useCallback, useRef} from 'react';
import {FlatList, View, StyleSheet, Text, Animated} from 'react-native';
import {Property} from '~/api/types';
import {Divider} from 'react-native-paper';
import {t} from 'i18next';

import {useNavigation} from '@react-navigation/native';
import AppScreens from '~/navigation/AppNavigation/AppScreens';
import {OnAppScreenNavigationProps} from '~/navigation/types';
import {useSelector} from 'react-redux';
import {
  propertiesActions,
  propertiesSelectors,
} from '~/redux/properties/properties';
import useActions from '~/hooks/useActions';
import PropertyListItem from '~/screens/HomeScreen/components/PropertyListItem';
import StyledImage from '~/components/StyledImage';
import {EMPTY_LIST_IMAGE} from '~/api/constant';
import StyledText from '~/components/Text';

const LikedPropertyList: React.FC = () => {
  const likedProperties = useSelector(
    propertiesSelectors.selectLikedProperties,
  );

  const navigation = useNavigation<OnAppScreenNavigationProps>();

  const [onLikeProperty, onDislikeProperty] = useActions([
    propertiesActions.onLikeProperty,
    propertiesActions.onDislikeProperty,
  ]);

  const fadeAnim = useRef(new Map<string, Animated.Value>()).current;

  const onLikePropertyHandler = useCallback(
    (id: Property['id']) => {
      onLikeProperty(id);
    },
    [onLikeProperty],
  );

  const onDislikePropertyHandler = useCallback(
    (id: Property['id']) => {
      if (!fadeAnim.has(id)) {
        fadeAnim.set(id, new Animated.Value(1));
      }
      Animated.timing(fadeAnim.get(id)!, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onDislikeProperty(id);
      });
    },
    [onDislikeProperty, fadeAnim],
  );

  const onPressProperty = useCallback(
    (propertyID: Property['id']) => {
      navigation.navigate({
        name: AppScreens.PROPERTY_ITEM_SCREEN,
        params: {
          propertyID: propertyID,
        },
      });
    },
    [navigation],
  );

  const renderPropertyItem = useCallback(
    ({item}: {item: Property}) => {
      if (!fadeAnim.has(item.id)) {
        fadeAnim.set(item.id, new Animated.Value(1));
      }
      return (
        <Animated.View style={{opacity: fadeAnim.get(item.id)}}>
          <PropertyListItem
            onPress={onPressProperty}
            property={item}
            onDislikeProperty={onDislikePropertyHandler}
            onLikeProperty={onLikePropertyHandler}
          />
        </Animated.View>
      );
    },
    [
      onPressProperty,
      onDislikePropertyHandler,
      onLikePropertyHandler,
      fadeAnim,
    ],
  );

  if (likedProperties.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <StyledImage
          source={{uri: EMPTY_LIST_IMAGE}}
          style={styles.emptyImage}
        />
        <StyledText h3 style={styles.emptyText}>
          {t('likedPropertyScreen.noLikedProperties')}
        </StyledText>
        <Text style={styles.emptyText}>No liked properties yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider />}
      data={likedProperties}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      renderItem={renderPropertyItem}
      keyExtractor={(item: Property) => item?.id}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default React.memo(LikedPropertyList);
