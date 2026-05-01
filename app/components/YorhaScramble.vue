<template>
  <span 
    class="inline-block yorha-scramble" 
    @mouseenter="startScramble"
  >
    {{ displayText }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  text: string
  duration?: number
}>()

const displayText = ref('')

// Scramble settings
const duration = props.duration || 300 // ms
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?'

let scrambleInterval: ReturnType<typeof setInterval> | null = null
let timeout: ReturnType<typeof setTimeout> | null = null

const startScramble = () => {
  if (scrambleInterval) clearInterval(scrambleInterval)
  if (timeout) clearTimeout(timeout)
  
  const targetText = props.text
  
  if (!targetText) {
    displayText.value = ''
    return
  }

  let iterations = 0
  const maxIterations = Math.floor(duration / 30)
  
  scrambleInterval = setInterval(() => {
    let currentText = ''
    for (let i = 0; i < targetText.length; i++) {
      // Ignore spaces for better visual
      if (targetText[i] === ' ') {
        currentText += ' '
        continue
      }
      
      currentText += characters[Math.floor(Math.random() * characters.length)]
    }
    displayText.value = currentText
    
    iterations++
    
    if (iterations >= maxIterations) {
      clearInterval(scrambleInterval!)
      displayText.value = targetText
    }
  }, 30) // 30ms per frame
}

// Scramble on mount
onMounted(() => {
  startScramble()
})

// Cleanup timers
onBeforeUnmount(() => {
  if (scrambleInterval) clearInterval(scrambleInterval)
  if (timeout) clearTimeout(timeout)
})

// Scramble if text changes
watch(() => props.text, () => {
  startScramble()
})
</script>
