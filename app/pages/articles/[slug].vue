<template>
  <main>
    <ContentDoc>
      <template #default="{ doc }">
        <article>
        <header class="mb-10 border-b-4 border-foreground pb-8">
          <Badge
            v-if="doc.tags && doc.tags.length > 0"
            variant="secondary"
            class="font-mono uppercase mb-4 rounded-none text-xs"
          >
            {{ doc.tags[0] }}
          </Badge>
          <Badge
            v-else
            variant="secondary"
            class="font-mono uppercase mb-4 rounded-none text-xs"
          >
            Article
          </Badge>
          <h1 class="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            {{ doc.title }}
          </h1>
          <p v-if="doc.description" class="text-xl max-w-3xl text-muted-foreground">
            {{ doc.description }}
          </p>
          <div class="mt-6 flex items-center gap-4">
            <time class="font-mono text-sm text-muted-foreground">{{ doc.date }}</time>
            <div class="flex gap-2 flex-wrap">
              <Badge
                v-for="tag in (doc.tags || []).slice(1)"
                :key="tag"
                variant="outline"
                class="font-mono uppercase px-2 py-0.5 rounded-none border-foreground text-xs"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
        </header>
        
        <div
          class="max-w-3xl prose prose-neutral prose-lg dark:prose-invert
                      prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter
                      prose-a:text-accent prose-a:border-b prose-a:border-accent prose-a:no-underline
                      hover:prose-a:bg-accent hover:prose-a:text-white
                      prose-pre:border prose-pre:border-foreground prose-pre:rounded-none
                      prose-img:border prose-img:border-foreground prose-img:rounded-none"
        >
          <ContentRenderer
            :value="doc"
          />
        </div>
      </article>
      </template>
      <template #not-found>
        <div class="py-20 text-center">
          <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
          <p class="text-xl mb-8">Article not found.</p>
          <NuxtLink to="/articles" class="text-accent underline font-mono uppercase">Return to Index</NuxtLink>
        </div>
      </template>
    </ContentDoc>
  </main>
</template>


