<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
    <div v-if="isOpen" class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="close"></div>
      
      <YorhaPanel
        brackets
        variant="none"
        padding="p-6"
        class="relative z-10 w-full max-w-2xl bg-background border border-border"
      >
          <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary mb-4">
            [ SYSTEM SEARCH MODULE ]
          </div>
          
          <!-- Search Input -->
          <div class="flex items-center gap-2 mb-2 font-sans">
            <span class="text-foreground tracking-widest uppercase font-bold text-sm">QUERY : </span>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Data term..."
              class="yorha-input flex-1 border-b-0! text-lg uppercase tracking-wider font-display! font-bold"
              @keydown.escape="close"
              @keydown.down.prevent="moveSelection(1)"
              @keydown.up.prevent="moveSelection(-1)"
              @keydown.enter.prevent="navigateToSelected"
            />
          </div>
          
          <div class="yorha-divider mt-0! mb-4!"></div>

          <!-- Results -->
          <div class="h-[40vh] overflow-y-auto" role="listbox">
            <!-- Empty state -->
            <div v-if="!query.trim()" class="font-sans text-sm tracking-widest uppercase text-foreground-secondary py-4 text-center">
              <YorhaScramble text="Waiting for input data..." />
            </div>

            <!-- No results -->
            <div v-else-if="!hasResults" class="font-sans text-sm tracking-widest uppercase text-yorha-red py-4 text-center">
              <YorhaScramble text="No data found in this sector." />
            </div>

            <!-- Grouped results -->
            <template v-else>
              <div v-for="group in resultGroups" :key="group.type" class="mb-4">
                <div class="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground-secondary mb-1">
                  <YorhaScramble :text="group.label" /> [<YorhaScramble :text="String(group.items.length)" /> REC]
                </div>
                <button
                  v-for="(item, i) in group.items"
                  :key="item.path"
                  role="option"
                  :aria-selected="isSelected(group.type, i)"
                  class="w-full text-left font-sans flex items-baseline justify-between transition-colors border-b border-yorha-faint group cursor-pointer"
                  :class="isSelected(group.type, i) ? 'bg-foreground dark:bg-foreground' : 'hover:bg-foreground/5'"
                  @click="navigateTo(item.path)"
                  @mouseenter="setSelection(group.type, i)"
                >
                  <div class="flex items-baseline py-2 px-3 gap-2 truncate text-sm">
                    <span v-if="group.type === 'projectArticle'" class="text-xs uppercase tracking-widest" :class="isSelected(group.type, i) ? 'text-background' : 'text-foreground-secondary'">
                      {{ item._parentProject }} /
                    </span>
                    <span class="uppercase tracking-widest font-bold" :class="isSelected(group.type, i) ? 'text-background dark:text-background' : 'text-foreground'">{{ item.title }}</span>
                  </div>
                </button>
              </div>
            </template>
          </div>
          
          <div class="yorha-divider-double"></div>
          
          <!-- Footer -->
          <div class="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary">
            <div class="flex gap-4">
              <span>[↑↓] NAVIGATE</span>
              <span>[ENTER] SELECT</span>
              <span>[ESC] CLOSE</span>
            </div>
          </div>
        </YorhaPanel>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { SearchableItem } from '~/composables/useGlobalSearch'

const { data: preparedItems } = await useFetch<SearchableItem[]>('/api/search.json', {
  key: 'global-search-items',
  default: () => [],
})

const { isOpen, query, results, close } = useGlobalSearch({
  preparedItems,
})
const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)

// Focus input when opened
watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
  }
})

// Keyboard selection state
type SelectionType = 'project' | 'article' | 'projectArticle'
const selectedType = ref<SelectionType>('project')
const selectedIndex = ref(0)

const resultGroups = computed(() => {
  return [
    { type: 'project' as const, label: 'SYSTEMS', items: results.value.projects },
    { type: 'article' as const, label: 'LOGS', items: results.value.articles },
    { type: 'projectArticle' as const, label: 'SUB_MODULES', items: results.value.projectArticles }
  ].filter(g => g.items.length > 0)
})

// Flatten results into ordered list for keyboard navigation
const flatList = computed(() => {
  return resultGroups.value.flatMap(group =>
    group.items.map((item, index) => ({
      type: group.type,
      index,
      path: item.path
    }))
  )
})

const flatIndex = computed(() =>
  flatList.value.findIndex(
    (f) => f.type === selectedType.value && f.index === selectedIndex.value,
  ),
)

const hasResults = computed(() => resultGroups.value.length > 0)

function isSelected(type: SelectionType, index: number): boolean {
  return selectedType.value === type && selectedIndex.value === index
}

function setSelection(type: SelectionType, index: number): void {
  selectedType.value = type
  selectedIndex.value = index
}

function moveSelection(direction: number): void {
  const newFlat = flatIndex.value + direction
  if (newFlat < 0 || newFlat >= flatList.value.length) return
  const entry = flatList.value[newFlat]
  if (entry) {
    selectedType.value = entry.type
    selectedIndex.value = entry.index
  }
}

function navigateTo(path: string): void {
  router.push(path)
  close()
}

function navigateToSelected(): void {
  const entry = flatList.value[flatIndex.value]
  if (entry) navigateTo(entry.path)
}

// Reset selection when results change
watch(results, () => {
  const firstGroup = resultGroups.value[0]
  if (firstGroup) {
    selectedType.value = firstGroup.type
    selectedIndex.value = 0
  }
})
</script>
