import { ref } from 'vue'

export const useYorhaAudio = () => {
  const audioCtx = ref<AudioContext | null>(null)

  const initAudio = () => {
    if (!audioCtx.value && typeof window !== 'undefined') {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext
      if (AudioContextClass) {
        audioCtx.value = new AudioContextClass()
      }
    }
  }

  const playHover = () => {
    initAudio()
    if (!audioCtx.value) return
    if (audioCtx.value.state === 'suspended') {
      audioCtx.value.resume()
    }
    
    const ctx = audioCtx.value
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = 'square'
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05)
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  }

  const playClick = () => {
    initAudio()
    if (!audioCtx.value) return
    if (audioCtx.value.state === 'suspended') {
      audioCtx.value.resume()
    }
    
    const ctx = audioCtx.value
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }

  return {
    playHover,
    playClick
  }
}
