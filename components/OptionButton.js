import { TouchableOpacity, Text } from 'react-native';

export default function OptionButton({ value, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        marginVertical: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 8
      }}
    >
      <Text style={{ fontSize: 20, textAlign: 'center' }}>{value}</Text>
    </TouchableOpacity>
  );
}
