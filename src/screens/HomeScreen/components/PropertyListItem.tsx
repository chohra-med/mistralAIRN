import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Property} from '~/api/types';
import StyledText from '~/components/Text';
import {useAppTheme} from '~/container/AppThemeProvider';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Paragraph, Title} from 'react-native-paper';
import {propertiesSelectors} from '~/redux/properties/properties';
import {useSelector} from 'react-redux';
import StyledImage from '~/components/StyledImage';

interface PropertyListItemProps {
  onPress: (propertyID: Property['id']) => void;
  onLikeProperty: (propertyID: Property['id']) => void;
  onDislikeProperty: (propertyID: Property['id']) => void;
  property: Property;
}

export const ITEM_HEIGHT = verticalScale(55);

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  onPress,
  onLikeProperty,
  onDislikeProperty,
  property,
}) => {
  const isLiked = useSelector(
    propertiesSelectors.selectIsPropertyLiked(property.id),
  );
  const {colors} = useAppTheme();

  const handleOnPress = useCallback(() => {
    onPress(property?.id);
  }, [onPress]);

  const handleOnIconPress = useCallback(() => {
    console.log('handleOnIconPress', isLiked, property?.id);
    if (isLiked) {
      onDislikeProperty(property?.id);
    } else {
      onLikeProperty(property?.id);
    }
  }, [isLiked, onDislikeProperty, onLikeProperty, property?.id]);

  const renderPropertyDetails = useMemo(
    () => (
      <View style={styles.detailsContainer}>
        <Icon name="bed" size={16} color={colors.primary} />
        <StyledText p style={styles.detailText}>
          {property.bedrooms} Beds
        </StyledText>
        <Icon name="bathtub" size={16} color={colors.primary} />
        <StyledText p style={styles.detailText}>
          {property.bathrooms} Baths
        </StyledText>
        <Icon name="ruler" size={16} color={colors.primary} />
        <StyledText p style={styles.detailText}>
          {property.size} sq ft
        </StyledText>
      </View>
    ),
    [property.bedrooms, property.bathrooms, property.size, colors.primary],
  );

  return (
    <Card
      style={styles.card}
      onPress={handleOnPress}
      testID={`propertyListItem.${property.id}`}>
      <StyledImage source={{uri: property.imageUrl}} style={styles.image} />
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title>{property.title}</Title>
          <TouchableOpacity onPress={handleOnIconPress}>
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? colors.error : colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Paragraph numberOfLines={2} style={styles.description}>
          {property.description}
        </Paragraph>
        {renderPropertyDetails}
        <View style={styles.footerContainer}>
          <StyledText h3 style={styles.price}>
            ${property.price.toLocaleString()}
          </StyledText>
          <StyledText p style={styles.address} numberOfLines={1}>
            {property.address}
          </StyledText>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    maxHeight: ITEM_HEIGHT,
  },
  titleStyle: {
    maxWidth: moderateScale(250),
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  image: {
    height: verticalScale(150),
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 4,
    marginRight: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
  },
  address: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
});
export default React.memo(PropertyListItem);
