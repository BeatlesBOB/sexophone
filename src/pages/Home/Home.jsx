import { useNavigate } from "react-router-dom"
import { useEffect,useCallback, useState } from "react"
import useSound from "use-sound"
import { ClapDetector } from "../../utils/ClapDetector"
import musique from "../../asset/zicmu.mp3"
import video from "../../asset/fireplace.mp4"
import "./Home.css"

export default function Home() {
  const [hasStart,setHasStart] = useState(false)
  const [hasClap,setHasClap] = useState(false)

  const [playOn,{stop}] = useSound(
    musique,
    { volume: 1 }
  );

  const handleClap = () => {
    setHasStart(prev => !prev)
  }
 
  useEffect(()=>{
    const clapdetector = new ClapDetector();
    clapdetector.onClap(() => {
      playOn()
      setHasClap(!hasClap)    
      if(!hasClap) {
        stop()
      }
    })
    
    return () => {
      clapdetector.stop()
      clapdetector.offClap(handleClap)
    }

  },[hasStart,hasClap])

  return (
    <div className="home">
      {
        hasStart ? <video src={video} autoPlay={true} loop={true} muted className="home__video" />: <>
        <h1 className="home__txt">PLAISIR</h1>
        <button onClick={()=> {setHasStart(!hasStart)}}>Start</button>
        </>
      }
      
    </div>
  )
}
