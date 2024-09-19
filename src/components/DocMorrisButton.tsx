import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Insets,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import useTraceUpdate from '~/hooks/useTraceUpdate';

export type ButtonComponentProps = {
  buttonKey?: string | number;
  variant?: any;
  textVariant?: any;
  iconLocation?: any;
  textColor?: any;
  textAlign?: TextStyle['textAlign'];
  iconSource?: ImageSourcePropType;
  iconColor?: any;
  style?: StyleProp<any>;
  containerStyle?: ViewStyle;
  iconStyle?: StyleProp<any>;
  onPress: (() => void) | any;
  text?: string;
  disabled?: boolean;
  onLayout?: (LayoutChangeEvent: any) => void;
  testID?: string;
  hitSlop?: Insets;
  accessibilityLabel?: string;
  translateY?: Animated.Value; // for animation cases
  isLoading?: boolean;
  isVisible?: boolean;
  children?: React.ReactNode;
  marginBottom?: number;
  marginTop?: number;
  isVariantDisabled?: any;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonKey,
  isVisible = true,
  variant = 'primary',
  textVariant = 'button-primary',
  textColor = 'white',
  textAlign = 'center',
  text,
  iconLocation,
  iconSource,
  iconStyle,
  iconColor,
  style,
  containerStyle,
  disabled,
  onPress,
  testID,
  hitSlop,
  accessibilityLabel,
  translateY,
  isLoading,
  marginBottom,
  marginTop,
  children,
  isVariantDisabled,
}): JSX.Element => {
  const [buttonOpacity, _setButtonOpacity] = useState(new Animated.Value(1));
  const [buttonScale, _setButtonScale] = useState(new Animated.Value(1));
  const [activeButtonScale, setActiveButtonScale] = useState(1);

  useTraceUpdate({
    buttonKey,
    isVisible,
    variant,
    textVariant,
    textColor,
    textAlign,
    text,
    iconLocation,
    iconSource,
    iconStyle,
    iconColor,
    style,
    containerStyle,
    disabled,
    onPress,
    testID,
    hitSlop,
    accessibilityLabel,
    translateY,
    isLoading,
    marginBottom,
    marginTop,
    children,
    isVariantDisabled,
  });
  console.log('rerender Button', text);
  useEffect((): void => {
    if (isLoading) {
      return;
    }
  }, [isLoading]);

  const buttonAnimation = useCallback(
    (scaleTo: number, fadeTo: number): void => {
      console.log('run animation');

      setActiveButtonScale(scaleTo);
      Animated.timing(buttonScale, {
        toValue: scaleTo,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      Animated.timing(buttonOpacity, {
        toValue: fadeTo,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    },
    [setActiveButtonScale, buttonScale, buttonOpacity],
  );
  const buttonAnimationa = (scaleTo: number, fadeTo: number): void => {
    setActiveButtonScale(scaleTo);
    Animated.timing(buttonScale, {
      toValue: scaleTo,
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonOpacity, {
      toValue: fadeTo,
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const isDisabledButton = !!disabled
    ? isVariantDisabled || 'disabled'
    : variant;

  const pressableProps = useMemo(() => {
    console.log('rerender pressableProps');
    return {
      disabled: disabled || isLoading,
      onPress,
      onPressIn: (): void => buttonAnimation(0.98, 0.75),
      onPressOut: (): void => buttonAnimation(1, 1),
      hitSlop,
      accessibilityLabel,
    };
  }, [buttonAnimation, disabled, hitSlop, isLoading, onPress]);
  // style: [buttonTypes[variant], buttonTypes[isDisabledButton], style],
  //     disabled: disabled || isLoading,
  //     onPress,
  //     onPressIn: (): void => buttonAnimation(0.98, 0.75),
  //     onPressOut: (): void => buttonAnimation(1, 1),
  //     hitSlop,
  //     accessibilityLabel,
  //   };

  const renderIcon = (): JSX.Element | undefined => {
    const isIconEnabled: boolean = iconSource !== undefined;

    if (!isIconEnabled) {
      return;
    }

    return (
      <Image
        source={iconSource!}
        // style={[iconStyles[iconLocation!], {tintColor: iconColor}, iconStyle]}
      />
    );
  };

  const renderLoader = (): JSX.Element | undefined => {
    if (!isLoading) {
      return;
    }

    return <ActivityIndicator size={'large'} />;
  };

  const renderText = (): JSX.Element | undefined => {
    if (!text) {
      return;
    }

    return <Text>{text}</Text>;
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <Animated.View
      key={buttonKey}
      style={{
        opacity: buttonOpacity,
        marginBottom,
        marginTop,
        transform: [
          {
            scale: buttonScale.interpolate({
              inputRange: [0, 1],
              outputRange: [1, activeButtonScale],
            }),
          },
          {
            translateY: translateY ? translateY : 0,
          },
        ],
        ...containerStyle,
      }}>
      <Pressable {...pressableProps} testID={testID}>
        {!isLoading && renderIcon()}
        {!isLoading && renderText()}
        {isLoading ? renderLoader() : children}
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(ButtonComponent);
