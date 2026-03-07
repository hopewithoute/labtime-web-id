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
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50"
        @click.self="close"
      >
        <!-- Backdrop with scanlines -->
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm search-scanlines" @click="close"></div>

        <!-- Palette -->
        <div class="relative z-10 max-w-2xl mx-auto mt-[15vh] px-4">
          <CornerFrame class="bg-background border-2 border-foreground shadow-2xl">
            <div>
              <!-- Search Input -->
              <div class="flex items-center gap-3 px-6 py-4 border-b-2 border-foreground">
                <span class="text-accent font-mono font-bold text-sm shrink-0">&gt;</span>
                <input
                  ref="inputRef"
                  v-model="query"
                  type="text"
                  placeholder="grep -i 'query' ~/content/*"
                  class="bg-transparent w-full font-mono text-sm outline-none placeholder:text-muted-foreground/50 text-foreground caret-accent"
                  @keydown.escape="close"
                  @keydown.down.prevent="moveSelection(1)"
                  @keydown.up.prevent="moveSelection(-1)"
                  @keydown.enter.prevent="navigateToSelected"
                />
                <kbd class="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 border border-foreground/30 text-muted-foreground shrink-0">ESC</kbd>
              </div>

              <!-- Results -->
              <div class="max-h-[50vh] overflow-y-auto" role="listbox">
                <!-- Empty state -->
                <div v-if="!query.trim()" class="p-6 text-center font-mono text-xs text-muted-foreground">
                  <div class="mb-2 opacity-60">[SEARCH_MODULE v1.0]</div>
                  <div>Type to search projects, articles, and logs...</div>
                </div>

                <!-- No results -->
                <div v-else-if="!hasResults" class="p-6 text-center font-mono text-xs text-muted-foreground">
                  <div class="text-accent mb-1">&gt; No matches found</div>
                  <div class="opacity-60">grep: pattern '{{ query }}' not found in any file</div>
                </div>

                <!-- Grouped results -->
                <template v-else>
                  <!-- Projects -->
                  <div v-if="results.projects.length">
                    <div class="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-foreground/5 border-b border-foreground/10">
                      [SYSTEMS] — {{ results.projects.length }} match{{ results.projects.length > 1 ? 'es' : '' }}
                    </div>
                    <button
                      v-for="(item, i) in results.projects"
                      :key="item.path"
                      role="option"
                      :aria-selected="isSelected('project', i)"
                      class="w-full text-left px-6 py-3 font-mono text-sm flex flex-col gap-1 transition-colors border-b border-foreground/5"
                      :class="isSelected('project', i) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'"
                      @click="navigateTo(item.path)"
                      @mouseenter="setSelection('project', i)"
                    >
                      <span class="font-bold uppercase tracking-tight">{{ item.title }}</span>
                      <span
                        class="text-xs opacity-70 line-clamp-1"
                        :class="isSelected('project', i) ? 'text-background/70' : 'text-muted-foreground'"
                      >{{ item.description }}</span>
                    </button>
                  </div>

                  <!-- Articles -->
                  <div v-if="results.articles.length">
                    <div class="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-foreground/5 border-b border-foreground/10">
                      [LOGS] — {{ results.articles.length }} match{{ results.articles.length > 1 ? 'es' : '' }}
                    </div>
                    <button
                      v-for="(item, i) in results.articles"
                      :key="item.path"
                      role="option"
                      :aria-selected="isSelected('article', i)"
                      class="w-full text-left px-6 py-3 font-mono text-sm flex flex-col gap-1 transition-colors border-b border-foreground/5"
                      :class="isSelected('article', i) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'"
                      @click="navigateTo(item.path)"
                      @mouseenter="setSelection('article', i)"
                    >
                      <span class="font-bold uppercase tracking-tight">{{ item.title }}</span>
                      <span
                        class="text-xs opacity-70 line-clamp-1"
                        :class="isSelected('article', i) ? 'text-background/70' : 'text-muted-foreground'"
                      >{{ item.description }}</span>
                    </button>
                  </div>

                  <!-- Project Articles (Sub-modules) -->
                  <div v-if="results.projectArticles.length">
                    <div class="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-foreground/5 border-b border-foreground/10">
                      [SUB_MODULES] — {{ results.projectArticles.length }} match{{ results.projectArticles.length > 1 ? 'es' : '' }}
                    </div>
                    <button
                      v-for="(item, i) in results.projectArticles"
                      :key="item.path"
                      role="option"
                      :aria-selected="isSelected('projectArticle', i)"
                      class="w-full text-left px-6 py-3 font-mono text-sm flex flex-col gap-1 transition-colors border-b border-foreground/5"
                      :class="isSelected('projectArticle', i) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'"
                      @click="navigateTo(item.path)"
                      @mouseenter="setSelection('projectArticle', i)"
                    >
                      <div class="flex items-center gap-2">
                        <span
                          class="text-[10px] shrink-0"
                          :class="isSelected('projectArticle', i) ? 'text-background/50' : 'opacity-50'"
                        >{{ item._parentProject }} /</span>
                        <span class="font-bold uppercase tracking-tight truncate">{{ item.title }}</span>
                      </div>
                      <span
                        class="text-xs opacity-70 line-clamp-1"
                        :class="isSelected('projectArticle', i) ? 'text-background/70' : 'text-muted-foreground'"
                      >{{ item.description }}</span>
                    </button>
                  </div>
                </template>
              </div>

              <!-- Footer -->
              <div class="px-6 py-2 border-t-2 border-foreground flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <div class="flex gap-4">
                  <span><kbd class="px-1 border border-foreground/30">↑↓</kbd> navigate</span>
                  <span><kbd class="px-1 border border-foreground/30">↵</kbd> open</span>
                  <span><kbd class="px-1 border border-foreground/30">esc</kbd> close</span>
                </div>
                <span class="text-accent animate-pulse">●</span>
              </div>
            </div>
          </CornerFrame>
        </div>
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

// Flatten results into ordered list for keyboard navigation
const flatList = computed(() => {
  const list: Array<{ type: SelectionType; index: number; path: string }> = []
  results.value.projects.forEach((item, i) =>
    list.push({ type: 'project', index: i, path: item.path }),
  )
  results.value.articles.forEach((item, i) =>
    list.push({ type: 'article', index: i, path: item.path }),
  )
  results.value.projectArticles.forEach((item, i) =>
    list.push({ type: 'projectArticle', index: i, path: item.path }),
  )
  return list
})

const flatIndex = computed(() =>
  flatList.value.findIndex(
    (f) => f.type === selectedType.value && f.index === selectedIndex.value,
  ),
)

const hasResults = computed(
  () =>
    results.value.projects.length > 0 ||
    results.value.articles.length > 0 ||
    results.value.projectArticles.length > 0,
)

function isSelected(type: SelectionType, index: number) {
  return selectedType.value === type && selectedIndex.value === index
}

function setSelection(type: SelectionType, index: number) {
  selectedType.value = type
  selectedIndex.value = index
}

function moveSelection(direction: number) {
  const newFlat = flatIndex.value + direction
  if (newFlat < 0 || newFlat >= flatList.value.length) return
  const entry = flatList.value[newFlat]
  if (entry) {
    selectedType.value = entry.type
    selectedIndex.value = entry.index
  }
}

function navigateTo(path: string) {
  router.push(path)
  close()
}

function navigateToSelected() {
  const entry = flatList.value[flatIndex.value]
  if (entry) navigateTo(entry.path)
}

// Reset selection when results change
watch(results, () => {
  selectedType.value = 'project'
  selectedIndex.value = 0
  if (results.value.projects.length === 0) {
    if (results.value.articles.length > 0) selectedType.value = 'article'
    else if (results.value.projectArticles.length > 0)
      selectedType.value = 'projectArticle'
  }
})
</script>

<style scoped>
.search-scanlines::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.03) 50%
  );
  background-size: 100% 8px;
  pointer-events: none;
}
</style>
