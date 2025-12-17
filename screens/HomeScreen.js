import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ onStart }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>🧮 Abacus Quiz</Text>

      <TouchableOpacity onPress={onStart}>
        <Text style={{ fontSize: 22, color: 'blue' }}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}
