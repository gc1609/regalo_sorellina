import { useState } from "react";
import questions from "../data/questions.json";

function Quiz({ onFinish }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index === questions.length - 1) {
      onFinish();
    } else {
      setIndex(index + 1);
    }
  };

  const q = questions[index];

  return (
    <div className="page">
      <div className="card">
        <h2 className="question">{q.question}</h2>

        <div className="answers">
          {q.answers.map((a, i) => (
            <button key={i} className="answerButton" onClick={next}>
              {a}
            </button>
          ))}
        </div>

        <div className="progress">
          Domanda {index + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
