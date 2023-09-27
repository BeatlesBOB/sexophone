const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

export class SpeechDetector {
  words = ["baise", "obèse", "amour", "l'amour"];

  recognition = new SpeechRecognition();
  speechRecognitionList = new SpeechGrammarList();
  grammar =
    "#JSGF V1.0; grammar colors; public <color> = " +
    this.words.join(" | ") +
    " ;";

  constructor() {
    this.speechRecognitionList.addFromString(this.grammar, 1);
    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.continuous = true;
    this.recognition.lang = "fr";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.start();
  }

  start() {
    this.recognition.start();
    this.recognition.onresult = (event) => {
      const word = event.results[event.results.length - 1][0].transcript
        .toString()
        .split(" ")
        .filter((el) => el !== "");

      if (this.isFound(word, this.grammar)) {
        console.log("ça bosse");
      }
    };
  }

  stop() {
    recognition.stop();
  }

  isFound(arr1, arr2) {
    return arr1.some((ai) => arr2.includes(ai));
  }
}