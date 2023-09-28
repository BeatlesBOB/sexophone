export class ClapDetector {
  options = {
    // energy threshold for claps
    clapThreshold: 70,
    // typical freq range for claps
    highFrequencyRange: [2200, 2800],
    minClapInterval: 300,
  };

  lastClapTime;
  frameRequest;
  bufferLength;
  analyserNode;
  frequencyData;
  audioContext;
  callback;

  constructor(options = {}, callback) {
    this.callback = callback;
    this.options = Object.assign(this.options, options);
    this.lastClapTime = 0;
    this.detectClap = this.detectClap.bind(this);
    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    // high frequency, short fft size
    this.analyserNode.fftSize = 2048;
    this.analyserNode.minDecibels = -90;
    this.analyserNode.maxDecibels = -10;
    this.analyserNode.smoothingTimeConstant = 0.85;

    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.frequencyData = new Uint8Array(this.bufferLength);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaStreamSource =
        this.audioContext.createMediaStreamSource(stream);
      // connect the mediaStreamSource to the analyserNode
      mediaStreamSource.connect(this.analyserNode);
      this.start();
    });
  }

  start() {
    this.frameRequest = requestAnimationFrame(this.detectClap);
  }

  stop() {
    cancelAnimationFrame(this.frameRequest);
  }

  detectClap() {
    this.analyserNode.getByteFrequencyData(this.frequencyData);

    const highFrequencyData = this.frequencyData.slice(
      Math.round(
        (this.options.highFrequencyRange[0] / this.audioContext.sampleRate) *
          this.bufferLength
      ),
      Math.round(
        (this.options.highFrequencyRange[1] / this.audioContext.sampleRate) *
          this.bufferLength
      )
    );
    const highFrequencyEnergy =
      highFrequencyData.reduce((sum, value) => sum + value) /
      highFrequencyData.length;

    const metClapThreshold = highFrequencyEnergy > this.options.clapThreshold;
    const timeSinceLastClap = Date.now() - this.lastClapTime;
    const metMinClapInterval = timeSinceLastClap > this.options.minClapInterval;
    if (metClapThreshold && metMinClapInterval) {
      this.lastClapTime = Date.now();
      this.callback();
    }

    this.frameRequest = requestAnimationFrame(this.detectClap);
  }
}
