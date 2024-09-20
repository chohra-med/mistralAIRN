import React, {useCallback, useRef} from 'react';
import {FlatList, View, Animated} from 'react-native';
import {Property} from '~/api/types';
import {Divider} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import AppScreens from '~/navigation/AppNavigation/AppScreens';
import {OnAppScreenNavigationProps} from '~/navigation/types';
import {useSelector} from 'react-redux';
import {
  propertiesActions,
  propertiesSelectors,
} from '~/redux/properties/properties';
import useActions from '~/hooks/useActions';
import PropertyListItem from '~/screens/PropertyScreen/components/PropertyListItem';

const LikedPropertyList: React.FC = () => {
  const likedProperties = useSelector(
    propertiesSelectors.selectLikedProperties,
  );
  const navigation = useNavigation<OnAppScreenNavigationProps>();

  const [onLikeProperty, onDislikeProperty] = useActions([
    propertiesActions.onLikeProperty,
    propertiesActions.onDislikeProperty,
  ]);

  const animatedValues = useRef(
    new Map(likedProperties.map(item => [item.id, new Animated.Value(1)])),
  ).current;

  const onLikePropertyHandler = useCallback(
    (id: Property['id']) => {
      onLikeProperty(id);
    },
    [onLikeProperty],
  );

  const onDislikePropertyHandler = useCallback(
    (id: Property['id']) => {
      const animatedValue = animatedValues.get(id);
      if (animatedValue) {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onDislikeProperty(id);
        });
      }
    },
    [onDislikeProperty, animatedValues],
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
      const animatedStyle = {
        opacity: animatedValues.get(item.id) ?? 1,
        transform: [
          {
            scale: animatedValues.get(item.id) ?? 1,
          },
        ],
      };

      return (
        <Animated.View style={animatedStyle}>
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
      animatedValues,
    ],
  );

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

export default React.memo(LikedPropertyList);
