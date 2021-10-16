import React from 'react';
import logo from './logo.svg';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const colors = {
  0: "white",
  1: "red",
  2: "green",
  3: "blue",
  4: "yellow"
  // 5: "orange"
}

const App = (props) => {

  const [color, setColor] = React.useState();
  const synthRef = React.useRef(window.speechSynthesis);
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSuppoertsRecognition
  } = useSpeechRecognition();
  React.useEffect(() => {
    setColor(0);
  }, [])

  React.useEffect(() => {
    SpeechRecognition.stopListening();
    setTimeout(() => {
      if (finalTranscript == "") {
        return;
      }
      if (finalTranscript === colors[color]) {
        correct();
      }
      else {
        incorrect();
      }
    }, 200);
    resetTranscript();
  }, [finalTranscript])

  function handleClick() {
    let number = Math.floor((Math.random() * 4)) + 1
    setColor(number);
    SpeechRecognition.startListening({ continuous: true });
    // if (finalTranscript != "") {
    //   if (finalTranscript === colors[number])
    //     alert("You did it")
    // }
  }
  const correct = () => {
    const word = "correct";
    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.rate = 1.0;
    setTimeout(() => {
      synthRef.current.speak(utterThis);
    }, 500);
  }

  const incorrect = () => {
    const word = `Incorrect.  The color is ${colors[color]}.`;
    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.rate = 1.0;
    setTimeout(() => {
      synthRef.current.speak(utterThis);
    }, 500);
  }

  return (
    <div className="App"
      style={
        {
          backgroundColor: colors[color],
          height: 100 + '%'
        }}
      onClick={handleClick}
    >
      Click the screen to generate a random color!!
      <p>{finalTranscript}</p>
    </div>
  );
}

export default App;
