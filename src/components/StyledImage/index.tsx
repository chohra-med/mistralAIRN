import React, {useState} from 'react';
import {ImageProps, ActivityIndicator, View, StyleSheet} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {EMPTY_IMAGE_URI} from '~/api/constant';

type StyledImageProps = ImageProps & {
  style?: object;
  source: Source;
  placeholderSource?: Source;
  loaderColor?: string;
};

const StyledImage = ({
  style,
  source,
  placeholderSource,
  loaderColor = '#000',
  ...props
}: StyledImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Using an empty image from Unsplash as the default placeholder
  const defaultPlaceholder = {
    uri: EMPTY_IMAGE_URI,
  };

  function onLoadStart() {
    setIsLoading(true);
  }

  function onLoadEnd() {
    setIsLoading(false);
  }

  function onError() {
    console.log('onError');
    setImageError(true);
    setIsLoading(false);
  }

  const imageSource = imageError
    ? placeholderSource || defaultPlaceholder
    : source;

  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={StyleSheet.absoluteFill}
        source={imageSource}
        // @ts-ignore
        onError={onError}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        {...props}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={loaderColor} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default StyledImage;
