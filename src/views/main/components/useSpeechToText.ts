import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const UseSpeechToText = () => {
  const { transcript, listening } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    }
  };

  return { transcript, listening, toggleListening };
};

export default UseSpeechToText;
