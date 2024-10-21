import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
  StyleSheet,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ActivityIndicator, Icon, useTheme} from 'react-native-paper';
import {IMessage} from 'react-native-gifted-chat';
import {USER_CHAT} from '~/api/constant';
import {uniqueId} from 'lodash';
import Logger from '~/utils/helpers/Logger';
import {useAppTheme} from '~/container/AppThemeProvider';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const MAX_WIDTH = width / 5.8;
const DURATION = 160;

interface CustomizedInputProps {
  onPressSend: (text: string) => Promise<void>;
}
const CustomizedInputProps = ({onPressSend}: CustomizedInputProps) => {
  const [textValue, setTextValue] = useState('');
  const [loading, setLoading] = useState(false);

  const {colors} = useAppTheme();
  const {t} = useTranslation();
  const focusedInput = useRef(false);
  const typedInput = useRef(false);

  const leftSide = useSharedValue(0);
  const rightSide = useSharedValue(0);

  useEffect(() => {
    if (!typedInput.current && textValue.length >= 1) {
      typedInput.current = true;
      rightSide.value = withTiming(1, {
        duration: DURATION,
      });
    } else if (typedInput.current && textValue.length < 1 && !loading) {
      typedInput.current = false;
      rightSide.value = withTiming(0, {
        duration: DURATION,
      });
    }
  }, [textValue, typedInput, loading]);

  const handleInputFocus = useCallback(() => {
    if (focusedInput.current) return;
    focusedInput.current = true;

    leftSide.value = withTiming(1, {
      duration: DURATION,
    });
  }, [focusedInput, leftSide]);

  const handleOpenOptions = useCallback(() => {
    Keyboard.dismiss();
    focusedInput.current = false;
    leftSide.value = withTiming(0, {
      duration: DURATION,
    });
  }, [focusedInput, leftSide]);

  const handlePrompt = useCallback(async () => {
    setLoading(true);
    await onPressSend(textValue);
    setTextValue('');
    rightSide.value = withTiming(2, {
      duration: DURATION,
    });

    setTimeout(() => setLoading(false), 1000);
  }, [textValue]);

  const handleOnPressFile = useCallback(() => {
    Logger.logEvent('File Picker');
  }, []);

  const handleOnPressCamera = useCallback(() => {
    Logger.logEvent('Camera Picker');
  }, []);

  const handleOnPressImage = useCallback(() => {
    Logger.logEvent('Image Picker');
  }, []);

  const handleOnPressMic = useCallback(() => {
    Logger.logEvent('Mic Picker');
  }, []);

  const leftSideAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(leftSide.value, [0, 1], [1, 0]),
      marginRight: interpolate(leftSide.value, [0, 1], [0, -MAX_WIDTH]),
      transform: [
        {
          scale: interpolate(leftSide.value, [0, 1], [1, 0.1]),
        },
      ],
    };
  });

  const leftPlusIconAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(leftSide.value, [0, 1], [0, 1]),
      transform: [
        {
          scale: interpolate(leftSide.value, [0, 1], [0.1, 1]),
        },
      ],
    };
  });

  const rightSideAnimatedMicroStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(rightSide.value, [0, 1, 2], [1, 0, 0]),
      marginLeft: interpolate(leftSide.value, [0, 1, 2], [0, -22, -22]),
      transform: [
        {
          scale: interpolate(rightSide.value, [0, 1, 2], [1, 0, 0]),
        },
      ],
    };
  });

  const rightSideAnimatedArrowStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(rightSide.value, [0, 1, 2], [0, 1, 0]),
      transform: [
        {
          scale: interpolate(rightSide.value, [0, 1, 2], [0.1, 1, 0.1]),
        },
      ],
    };
  });

  return (
    <View style={styles.inputContainer}>
      <View style={styles.leftSide}>
        <Animated.View
          style={[leftPlusIconAnimatedStyles, styles.leftPlusIcon]}>
          <TouchableOpacity onPress={handleOpenOptions}>
            <Icon source="plus" color={colors.primary} size={22} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[leftSideAnimatedStyles, styles.leftSideShowed]}>
          <TouchableOpacity onPress={handleOnPressCamera}>
            <Icon source="camera" color={colors.primary} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressImage}>
            <Icon source="image" color={colors.primary} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressFile}>
            <Icon source="folder" color={colors.primary} size={22} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.centerContainer}>
        <View
          style={[styles.inputCenter, {backgroundColor: colors.onBackground}]}>
          <TextInput
            placeholder={t('homeScreen.inputPlaceholder')}
            placeholderTextColor={colors.text}
            style={styles.inputCenterStyle}
            selectionColor={colors.text}
            onFocus={handleInputFocus}
            onBlur={() => (focusedInput.current = false)}
            value={textValue}
            onChangeText={value => setTextValue(value)}
          />
          <Animated.View style={rightSideAnimatedMicroStyles}>
            <TouchableOpacity onPress={handleOnPressMic}>
              <Icon source="microphone" color={colors.primary} size={22} />
            </TouchableOpacity>
          </Animated.View>
          {loading && (
            <Animated.View style={styles.loaderStyle}>
              <ActivityIndicator />
            </Animated.View>
          )}
        </View>
      </View>

      <Animated.View
        style={[
          styles.rightSide,
          rightSideAnimatedArrowStyles,
          {backgroundColor: colors.primary},
        ]}>
        <TouchableOpacity onPress={handlePrompt}>
          <Icon source="send" color={colors.white} size={22} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: width - 40,
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSideShowed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rightSide: {
    right: -10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    position: 'absolute',
  },
  loaderStyle: {
    position: 'absolute',
    right: 16,
  },
  inputCenterStyle: {
    flex: 1,
  },
  centerContainer: {flex: 1, marginLeft: 12, marginRight: 16},
  inputCenter: {
    backgroundColor: '#E5E7EB',
    height: 42,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftPlusIcon: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    position: 'absolute',
  },
  rightSideMicro: {
    marginLeft: 0,
    transform: [{scale: 0}],
  },
  rightSideHead: {
    transform: [{scale: 0}],
  },
  rightSideArrow: {
    transform: [{scale: 0}],
  },
  rightSideStop: {
    transform: [{scale: 0}],
  },
});

export default memo(CustomizedInputProps);
