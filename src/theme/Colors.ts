const primary = '#FF5722'; // Mistral IA's primary color (rgb(255, 87, 34))
const grays = {
  white: '#FFFFFF',
  gray100: '#F7F7F7',
  gray800: '#8C8C8C',
  gray900: '#323232',
  gray950: '#1F1F1F',
  gray975: '#121212',
  black: '#000000',
};

export const colors = {
  light: {
    primary,
    text: grays.gray900,
    background: grays.gray100,
    tint: primary,
    tabIconDefault: '#ccc',
    onBackground: grays.white,
    ...grays,
    completedBackground: primary,
    completedPrimary: grays.white,
    navBarBackground: grays.white,
    successText: '#28A745', // Green for success (rgb(40, 167, 69))
  },
  dark: {
    primary,
    text: grays.white,
    background: grays.gray100,
    tint: primary,
    onBackground: grays.gray800,
    ...grays,
    completedBackground: grays.gray900,
    completedPrimary: grays.white,
    navBarBackground: grays.gray975,
    successText: '#28A745', // Green for success (rgb(40, 167, 69))
  },
};

