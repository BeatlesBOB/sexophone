import { useEffect, useState } from "react";
import { ClapDetector } from "../utils/ClapDetector";
import { SpeechDetector } from "../utils/SpeechDetector";
import audio from "../asset/zicmu.mp3";
import video from "../asset/fireplace.mp4";

export default function Sex() {
  const [hasStart, setHasStart] = useState(false);
  const music = new Audio(audio);

  const handleStart = () => {
    const isPlaying = !hasStart;
    setHasStart(isPlaying);
    if (isPlaying) {
      music.play();
    } else {
      music.pause();
    }
  };

  useEffect(() => {
    const clapDetector = new ClapDetector(undefined, handleStart);
    const speechDetector = new SpeechDetector(handleStart);
    music.volume = 1;

    return () => {
      clapDetector.stop();
      speechDetector.stop();
      music.pause();
    };
  }, [hasStart]);

  return (
    <div className="bg-black h-screen w-screen">
      <video
        src={video}
        autoPlay={true}
        loop={true}
        muted
        className={`${hasStart ? "block" : "hidden"} h-screen w-screen`}
      />
    </div>
  );
}
