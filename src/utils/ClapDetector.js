export class ClapDetector {

    options = {
      // energy threshold for claps
      clapThreshold: 70,
      // typical freq range for claps
      highFrequencyRange: [2200, 2800],
      minClapInterval: 300
    }
  
    lastClapTime = 0
    frameRequeust = null
    bufferLength = 0
    analyserNode = null
    frequencyData = null
    audioContext = null
  
    constructor(options = {}) {
      this.options = Object.assign(this.options, options)
      this.lastClapTime = 0
      this.detectClap = this.detectClap.bind(this)
  
      this.audioContext = new AudioContext()
      this.analyserNode = this.audioContext.createAnalyser()
      // high frequency, short fft size
      this.analyserNode.fftSize = 2048
      this.analyserNode.minDecibels = -90
      this.analyserNode.maxDecibels = -10
      this.analyserNode.smoothingTimeConstant = 0.85
  
      this.bufferLength = this.analyserNode.frequencyBinCount
      this.frequencyData = new Uint8Array(this.bufferLength)
  
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaStreamSource = this.audioContext.createMediaStreamSource(stream)
        // connect the mediaStreamSource to the analyserNode
        mediaStreamSource.connect(this.analyserNode)
        this.start()
      })
  
    }
  
    start() {
      this.frameRequeust = requestAnimationFrame(this.detectClap)
    }
  
    stop() {
      cancelAnimationFrame(this.frameRequeust)
    }
  
    detectClap() {
      this.analyserNode.getByteFrequencyData(this.frequencyData)
  
      const highFrequencyData = this.frequencyData.slice(
        Math.round(this.options.highFrequencyRange[0] / this.audioContext.sampleRate * this.bufferLength),
        Math.round(this.options.highFrequencyRange[1] / this.audioContext.sampleRate * this.bufferLength)
      )
      const highFrequencyEnergy = highFrequencyData.reduce((sum, value) => sum + value) / highFrequencyData.length
  
      const metClapThreshold = highFrequencyEnergy > this.options.clapThreshold
      const timeSinceLastClap = Date.now() - this.lastClapTime
      const metMinClapInterval = timeSinceLastClap > this.options.minClapInterval
      if (metClapThreshold && metMinClapInterval) {
        this.lastClapTime = Date.now()
        this.clapListeners.forEach(listener => listener())
      }
  
      this.frameRequeust = requestAnimationFrame(this.detectClap)
    }
  
    clapListeners = []
    // add listener
    onClap(listener) {
      this.clapListeners.push(listener)
    }
    // remove listener
    offClap(listener) {
      this.clapListeners = this.clapListeners.filter(l => l !== listener)
    }
  
  }