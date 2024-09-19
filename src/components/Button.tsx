import {Pressable, Text} from 'react-native';

type StyledButtonProps = {
  onPress: () => void;
  title: string;
  style?: object;
};

const StyledButton = ({onPress, title, style}: StyledButtonProps) => {
  console.log('rerender Button', title);
  return (
    <Pressable onPress={onPress} style={style}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default StyledButton;
