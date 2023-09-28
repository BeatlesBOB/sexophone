import { useEffect } from "react";
import { ClapDetector } from "../utils/ClapDetector";
import { SpeechDetector } from "../utils/SpeechDetector";
import audio from "../asset/zicmu.mp3";
import video from "../asset/fireplace.mp4";

export default function Sex() {
  const [hasStart, setHasStart] = useState(false);
  const music = new Audio(audio);

  const handleStart = () => {
    setHasStart(!hasStart);
    if (music.paused && music.currentTime > 0 && !music.ended) {
      music.play();
    } else {
      music.pause();
    }
  };

  useEffect(() => {
    const clapDetector = new ClapDetector(undefined, handleStart);
    clapDetector.onClap(handleStart);
    const speechDetector = new SpeechDetector(handleStart);

    return () => {
      clapDetector.stop();
      clapDetector.offClap(handleClap);
      speechDetector.stop();
      music.stop();
    };
  }, [hasStart, hasClap]);
  return (
    <div className="bg-black h-screen w-screen">
      {hasStart && (
        <video
          src={video}
          autoPlay={true}
          loop={true}
          muted
          className="block h-screen w-screen"
        />
      )}
    </div>
  );
}
