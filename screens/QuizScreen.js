import { useState } from 'react';
import { View } from 'react-native';
import { generateNumbers, generateAbacusMCQ } from '../logic/abacus';
import QuestionBox from '../components/QuestionBox';
import OptionButton from '../components/OptionButton';

export default function QuizScreen({ onFinish }) {
  const TOTAL_QUESTIONS = 5;
  const LEVELS = 4;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const numbers = generateNumbers(LEVELS);
  const { options, correctIndex } = generateAbacusMCQ(numbers);

  function handleAnswer(selected) {
    if (selected === correctIndex) {
      setScore(score + 1);
    }

    if (index + 1 === TOTAL_QUESTIONS) {
      onFinish(score + (selected === correctIndex ? 1 : 0));
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <QuestionBox numbers={numbers} />

      {options.map((opt, i) => (
        <OptionButton
          key={i}
          value={opt}
          onPress={() => handleAnswer(i)}
        />
      ))}
    </View>
  );
}
