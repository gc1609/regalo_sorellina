import { useState } from "react";

function Password({ onSuccess }) {
  const passwordFoglio = "9Luglio";
  const passwordTroll = "Milano";
  const correctPassword = "Buon compleanno sorellina";

  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (password === passwordFoglio) {
        setMessage(
          `Hmm... almeno non sei dislessica. Ti ho preso per il culo. Prova con questa: '${passwordTroll}'`,
        );
        setStep(2);
      } else {
        setMessage("Password sbagliata");
      }
    } else if (step === 2) {
      if (password === passwordTroll) {
        setMessage(
          `Nope era uno scherzo. La password vera è: '${correctPassword}'`,
        );
        setStep(3);
      } else {
        setMessage("Non è quella che ti ho detto. Ti vedo 👀...");
      }
    } else if (step === 3) {
      if (password === correctPassword) {
        onSuccess();
      } else {
        setMessage("Dai, ti ho appena detto la password 😂");
      }
    }

    setPassword("");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Pronta a scoprire il regalo?</h1>

        <form onSubmit={submit} className="form">
          <input
            type="text"
            placeholder="Inserisci la password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Scopri</button>
        </form>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Password;
