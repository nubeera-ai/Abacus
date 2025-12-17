import { View, Text, TouchableOpacity } from 'react-native';

export default function ResultScreen({ score, onRestart }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Your Score</Text>
      <Text style={{ fontSize: 40, marginVertical: 20 }}>{score}</Text>

      <TouchableOpacity onPress={onRestart}>
        <Text style={{ fontSize: 22, color: 'blue' }}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}
