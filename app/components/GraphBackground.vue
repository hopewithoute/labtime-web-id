<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
  ></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let particles: Particle[] = []
let width = 0
let height = 0
let isDark = true

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

// Check theme periodically or trust the initial load + occasional updates
const checkTheme = () => {
  if (!import.meta.client) return
  isDark = document.documentElement.classList.contains('dark')
}

const getParticleColor = (opacity: number) => {
  // Use foreground colors based on tailwind.css theme definitions
  // Dark mode foreground: #F4EFE8 (244, 239, 232)
  // Light mode foreground: #1F1A17 (31, 26, 23)
  return isDark 
    ? `rgba(244, 239, 232, ${opacity})` 
    : `rgba(31, 26, 23, ${opacity})`
}

const initParticles = () => {
  particles = []
  // Density: roughly 1 particle per 15000 pixels
  const density = 15000
  const numParticles = Math.floor((width * height) / density)
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5, // Slow drifting speed
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 0.5
    })
  }
}

const resize = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  width = window.innerWidth
  height = window.innerHeight
  // Fix DPI blurriness
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  
  initParticles()
}

const draw = () => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  checkTheme()

  ctx.clearRect(0, 0, width, height)

  const connectionDistance = 120

  // Update & draw particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Move
    p.x += p.vx
    p.y += p.vy

    // Wrap around screen
    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    // Draw particle
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = getParticleColor(0.5)
    ctx.fill()

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const distSq = dx * dx + dy * dy

      if (distSq < connectionDistance * connectionDistance) {
        const dist = Math.sqrt(distSq)
        // Opacity drops as distance increases
        const opacity = (1 - dist / connectionDistance) * 0.25
        
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = getParticleColor(opacity)
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  if (import.meta.client) {
    resize()
    window.addEventListener('resize', resize)
    
    // Optional: observe theme changes directly from html class
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    draw()
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    })
  }
})
</script>
