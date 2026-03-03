<template>
  <main>
    <ContentDoc>
      <template #default="{ doc }">
        <article class="max-w-3xl mx-auto">
        <header class="mb-10 text-center">
          <Badge variant="secondary" class="font-mono uppercase mb-6 rounded-none">{{ doc.tags?.[0] || 'Article' }}</Badge>
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-4">{{ doc.title }}</h1>
          <time class="text-muted-foreground font-mono text-sm block border-y border-foreground py-2 my-6">
            {{ doc.date }}
          </time>
        </header>
        
        <div
class="prose prose-neutral prose-lg dark:prose-invert 
                    prose-headings:font-bold prose-headings:tracking-tighter
                    prose-a:text-accent prose-a:underline hover:prose-a:text-foreground
                    prose-pre:border-l-4 prose-pre:border-accent prose-pre:rounded-none">
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


