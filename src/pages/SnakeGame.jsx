import { useEffect, useState, useRef } from "react";

const winScore = 5;
const size = 16;

function SnakeGame({ onWin }) {
  const [snake, setSnake] = useState([[8, 8]]);
  const [food, setFood] = useState([4, 4]);
  const [dir, setDir] = useState([1, 0]);
  const [score, setScore] = useState(0);

  const [won, setWon] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const winSound = useRef(new Audio("/audio/win.mp3"));

  const resetGame = () => {
    setSnake([[8, 8]]);
    setDir([1, 0]);
    setScore(0);
    setFood([
      Math.floor(Math.random() * size),
      Math.floor(Math.random() * size),
    ]);
  };

  const changeDir = (x, y) => {
    setDir([x, y]);
  };

  useEffect(() => {
    const key = (e) => {
      if (e.key === "ArrowUp") setDir([0, -1]);
      if (e.key === "ArrowDown") setDir([0, 1]);
      if (e.key === "ArrowLeft") setDir([-1, 0]);
      if (e.key === "ArrowRight") setDir([1, 0]);
    };

    window.addEventListener("keydown", key);

    return () => window.removeEventListener("keydown", key);
  }, []);

  useEffect(() => {
    const game = setInterval(() => {
      setSnake((s) => {
        const head = [s[0][0] + dir[0], s[0][1] + dir[1]];

        if (
          head[0] < 0 ||
          head[1] < 0 ||
          head[0] >= size ||
          head[1] >= size ||
          s.some((p) => p[0] === head[0] && p[1] === head[1])
        ) {
          resetGame();
          return [[8, 8]];
        }

        let newSnake = [head, ...s];

        if (head[0] === food[0] && head[1] === food[1]) {
          const newScore = score + 1;
          setScore(newScore);

          setFood([
            Math.floor(Math.random() * size),
            Math.floor(Math.random() * size),
          ]);

          if (newScore >= winScore) {
            setWon(true);
            winSound.current.play();
          }
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 180);

    return () => clearInterval(game);
  }, [dir, food, score]);

  // useEffect del countdown, prima di cambiare view
  useEffect(() => {
    if (!won) return;

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c === 1) {
          clearInterval(timer);
          onWin();
        }

        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [won]);

  return (
    <div className="page">
      <div className="card">
        <h2>Ultima challenge: Snake</h2>
        <p>
          Mangia almeno <b>{winScore} mele</b> per sbloccare il regalo
        </p>
        <p>
          Punteggio: {score}/{winScore}
        </p>

        <div
          className="board"
          style={{ gridTemplateColumns: `repeat(${size},16px)` }}
        >
          {[...Array(size * size)].map((_, i) => {
            const x = i % size;
            const y = Math.floor(i / size);

            const isSnake = snake.some((s) => s[0] === x && s[1] === y);
            const isFood = food[0] === x && food[1] === y;

            return (
              <div
                key={i}
                className={isSnake ? "snake" : isFood ? "food" : "cell"}
              />
            );
          })}
        </div>

        {/* CONTROLLI TOUCH */}

        <div className="controls">
          <button onClick={() => changeDir(0, -1)}>⬆</button>

          <div>
            <button onClick={() => changeDir(-1, 0)}>⬅</button>
            <button onClick={() => changeDir(1, 0)}>➡</button>
          </div>

          <button onClick={() => changeDir(0, 1)}>⬇</button>
        </div>
      </div>

      {/* MODAL VITTORIA */}

      {won && (
        <div className="modalOverlay">
          <div className="modalCard">
            <h2>🎉 Complimenti! 🎉</h2>

            <p>Finalmente hai completato la missione scopri regalo dopo una settimana.</p>

            <p>Ora puoi ricevere il tuo regalo (spero che ti piaccia)</p>

            <div className="countdown">{countdown}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SnakeGame;
