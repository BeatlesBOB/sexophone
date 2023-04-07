import { useEffect,useCallback, useState } from "react"
import useSound from "use-sound"
import { ClapDetector } from "../../utils/ClapDetector"
import musique from "../../asset/zicmu.mp3"

export default function Sex() {
  const [hasClap,setHasClap] = useState(false)
  
  const [playOn] = useSound(
    musique,
    { volume: 1 }
  );

  const handleClap = () => {
    console.log("clap")
    playOn()    
    setHasClap(prev => !prev)
  }
 
  useEffect(()=>{
    const clapdetector = new ClapDetector();
    clapdetector.onClap(handleClap)
    
    return () => {
      clapdetector.stop()
      clapdetector.offClap(handleClap)
    }

  },[])

  return (<p>ui</p>  )
}
