<template>
  <main class="group/crt relative min-h-screen">
    <div v-if="article">
      <article>
        <!-- Header -->
        <header class="mb-12 border-4 border-foreground bg-background p-6 md:p-8 lg:p-12 relative group mt-8">
          <div class="flex justify-between items-start mb-6">
            <span
              v-if="article.tags && article.tags.length > 0"
              class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1"
            >
              {{ article.tags[0] }}
            </span>
            <span v-else class="font-mono text-xs uppercase font-bold tracking-widest bg-foreground text-background px-3 py-1">
              ARTICLE
            </span>
            <time class="font-mono text-xs font-bold tracking-widest text-muted-foreground">[{{ article.date }}]</time>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            {{ article.title }}
          </h1>
          
          <div class="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-2">DOC_DESC //</div>
          <p v-if="article.description" class="text-lg md:text-xl max-w-4xl border-l-[6px] border-accent pl-6 py-2 bg-accent/5 font-medium mb-8">
            {{ article.description }}
          </p>
          
          <div class="flex items-center justify-between border-t border-dashed border-foreground/30 pt-6 mt-auto">
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="tag in (article.tags || []).slice(1)"
                :key="tag"
                class="font-mono text-[10px] uppercase px-2 py-1 border border-foreground font-bold"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </header>
        
        <div
          class="mb-16 prose prose-neutral prose-lg dark:prose-invert prose-link-fill max-w-none
                      prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                      prose-h2:border-b-2 prose-h2:border-foreground/20 prose-h2:pb-2
                      prose-a:no-underline prose-a:font-bold prose-a:text-foreground hover:prose-a:text-accent prose-a:transition-colors prose-a:px-1
                      prose-pre:border-2 prose-pre:border-foreground prose-pre:rounded-none prose-pre:bg-muted/30
                      prose-img:border-4 prose-img:border-foreground prose-img:rounded-none"
        >
          <ContentRenderer :value="article" />
        </div>
      </article>
    </div>

    <!-- 404 -->
    <div v-else class="py-20 text-center border-4 border-foreground mt-8 bg-foreground text-background">
      <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
      <p class="text-xl mb-8 font-mono tracking-widest uppercase">SYS_ERR // Article not found.</p>
      <NuxtLink to="/articles" class="text-accent hover:text-background underline font-mono uppercase tracking-widest font-bold">Return to Index</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('articles')
    .path(`/articles/${slug}`)
    .first()
)

useHead({
  title: () => article.value ? `${article.value.title} | LabTime` : 'Article | LabTime',
  meta: [
    { name: 'description', content: () => article.value?.description || '' }
  ]
})
</script>

<style scoped>
.group\/crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 8px;
  z-index: 50;
  pointer-events: none;
}
.crt-hover:hover::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.05) 50%
  );
  background-size: 100% 4px;
  z-index: 50;
  pointer-events: none;
}
</style>
