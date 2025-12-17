export function generateNumbers(levels) {
  let nums = [];

  for (let i = 0; i < levels; i++) {
    let num;

    if (levels <= 3) {
      num = Math.floor(Math.random() * 9) + 1;
    } else {
      num = Math.floor(Math.random() * 19) - 9;
      if (num === 0) num = 1;
    }

    nums.push(num);
  }

  return nums;
}

export function generateAbacusMCQ(numbers) {
  const correctAnswer = numbers.reduce((sum, n) => sum + n, 0);
  let options = new Set();

  while (options.size < 3) {
    let offset = Math.floor(Math.random() * 15) - 7;
    let wrong = correctAnswer + offset;
    if (wrong !== correctAnswer) options.add(wrong);
  }

  const finalOptions = shuffleArray([...options, correctAnswer]);
  const correctIndex = finalOptions.indexOf(correctAnswer);

  return { options: finalOptions, correctIndex };
}

function shuffleArray(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
