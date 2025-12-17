import { View, Text } from 'react-native';

export default function QuestionBox({ numbers }) {
  return (
    <View style={{ marginBottom: 20 }}>
      {numbers.map((num, i) => (
        <Text key={i} style={{ fontSize: 24 }}>
          {num}
        </Text>
      ))}
      <Text style={{ fontSize: 24 }}>─────</Text>
      <Text style={{ fontSize: 24 }}>?</Text>
    </View>
  );
}
