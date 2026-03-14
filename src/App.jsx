import { useState } from "react";

import Password from "./pages/Password";
import Quiz from "./pages/Quiz";
import SnakeGame from "./pages/SnakeGame";
import FinalVideo from "./pages/FinalVideo";

function App() {

  const [view, setView] = useState("password");

  return (
    <div>

      {view === "password" &&
        <Password onSuccess={() => setView("quiz")} />
      }

      {view === "quiz" &&
        <Quiz onFinish={() => setView("snake")} />
      }

      {view === "snake" &&
        <SnakeGame onWin={() => setView("video")} />
      }

      {view === "video" &&
        <FinalVideo urlVideo="/regalo_sorellina/video/regalo.mp4" />
      }

    </div>
  );
}

export default App;
