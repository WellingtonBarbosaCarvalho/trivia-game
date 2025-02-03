// services/api.js
export const getQuestions = async (amount = 10) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}`);
    const data = await response.json();
    return data.results.map(q => ({
      ...q,
      answers: shuffle([...q.incorrect_answers, q.correct_answer]),
      correct: q.correct_answer
    }));
  };
  
  // Função para misturar respostas
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);