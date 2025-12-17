import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [score, setScore] = useState(0);

  if (screen === 'home') {
    return <HomeScreen onStart={() => setScreen('quiz')} />;
  }

  if (screen === 'quiz') {
    return (
      <QuizScreen
        onFinish={(finalScore) => {
          setScore(finalScore);
          setScreen('result');
        }}
      />
    );
  }

  return <ResultScreen score={score} onRestart={() => setScreen('home')} />;
}
