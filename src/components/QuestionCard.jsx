// QuestionCard.jsx
function QuestionCard({ question, onAnswer }) {
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };
  
    return (
      <div>
        <h3>{decodeHTML(question.question)}</h3>
        {question.answers.map((answer, i) => (
          <button key={i} onClick={() => onAnswer(answer)}>
            {decodeHTML(answer)}
          </button>
        ))}
      </div>
    );
  }

  export default QuestionCard;
  