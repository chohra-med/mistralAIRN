import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Property} from '~/api/types';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {OnAppScreenNavigationProps} from '~/navigation/types';
import AppScreens from '~/navigation/AppNavigation/AppScreens';
import useActions from '~/hooks/useActions';
import {propertiesActions} from '~/redux/properties/properties';
import PropertyListItem, {ITEM_HEIGHT} from './PropertyListItem';
import {useProperties} from '~/hooks/useProperties';

const PropertyList: React.FC = () => {
  const {properties} = useProperties();

  const navigation = useNavigation<OnAppScreenNavigationProps>();

  const [onLikeProperty, onDislikeProperty] = useActions([
    propertiesActions.onLikeProperty,
    propertiesActions.onDislikeProperty,
  ]);

  const onLikePropertyHandler = useCallback(
    (id: Property['id']) => {
      onLikeProperty(id);
    },
    [onLikeProperty],
  );

  const onDislikePropertyHandler = useCallback(
    (id: Property['id']) => {
      onDislikeProperty(id);
    },
    [onDislikeProperty],
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

  const getItemLayout = useCallback(
    (data: Property[] | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderPropertyItem = useCallback(
    ({item}: {item: Property}) => {
      return (
        <PropertyListItem
          onPress={onPressProperty}
          property={item}
          onDislikeProperty={onDislikePropertyHandler}
          onLikeProperty={onLikePropertyHandler}
        />
      );
    },
    [onPressProperty, onDislikePropertyHandler, onLikePropertyHandler],
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider />}
      data={properties}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      renderItem={renderPropertyItem}
      keyExtractor={(item: Property) => item?.id}
      // @ts-ignore
      getItemLayout={getItemLayout}
    />
  );
};

export default React.memo(PropertyList);
