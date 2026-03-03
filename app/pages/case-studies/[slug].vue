<template>
  <main>
    <ContentDoc>
      <template #default="{ doc }">
        <article>
        <header class="mb-12 border-b-4 border-foreground pb-8">
          <div class="flex items-center gap-4 mb-6 font-mono text-sm uppercase">
            <NuxtLink to="/case-studies" class="hover:text-accent flex items-center gap-1">
              <span class="text-lg leading-none">&larr;</span> Back
            </NuxtLink>
            <span>/</span>
            <time>{{ doc.date }}</time>
          </div>
          <h1 class="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {{ doc.title }}
          </h1>
          <p class="text-xl md:text-2xl max-w-4xl border-l-[6px] border-accent pl-4 py-2 bg-muted/30">
            {{ doc.description }}
          </p>
          <div class="mt-8 flex gap-2 flex-wrap">
            <Badge v-for="tag in doc.tags" :key="tag" variant="outline" class="font-mono uppercase px-3 py-1 rounded-none border-foreground">
              {{ tag }}
            </Badge>
          </div>
        </header>

        <div
class="max-w-3xl prose prose-neutral prose-lg dark:prose-invert 
                    prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter
                    prose-a:text-accent prose-a:border-b prose-a:border-accent prose-a:no-underline 
                    hover:prose-a:bg-accent hover:prose-a:text-white
                    prose-pre:border prose-pre:border-foreground prose-pre:rounded-none
                    prose-img:border prose-img:border-foreground prose-img:rounded-none">
          <ContentRenderer
            :value="doc"
          />
        </div>
      </article>
      </template>
      <template #not-found>
        <div class="py-20 text-center">
          <h1 class="text-8xl font-black mb-4 uppercase">404</h1>
          <p class="text-xl mb-8">Case Study not found.</p>
          <Button as-child variant="default" class="rounded-none uppercase font-bold tracking-tight">
            <NuxtLink to="/case-studies">Return to Index</NuxtLink>
          </Button>
        </div>
      </template>
    </ContentDoc>
  </main>
</template>


