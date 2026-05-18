import Link from "next/link";
import { ArrowRight, BookOpen, Film, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, recipes, videos } from "@/lib/mock-blog-data";

const navItems = [
  { id: "blog", label: "Read Blog", icon: BookOpen, description: "Latest articles and stories." },
  { id: "recipes", label: "Recipes", icon: Sparkles, description: "Step-by-step halal recipes." },
  { id: "videos", label: "Reviews & Videos", icon: Film, description: "Restaurant highlights and cooking videos." },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const secondPost = blogPosts[1];
  const latestRecipe = recipes[0];
  const featuredVideo = videos[0];
  const olderPosts = blogPosts.slice(2, 4);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-sm">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  Discover More
                </p>
                <h1 className="mt-4 text-3xl font-black leading-tight">Blog, Recipes & Reviews</h1>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Choose how you explore halal dining tips, kitchen recipes, and restaurant video stories.
                </p>
              </div>

              <div className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`flex w-full items-center gap-4 rounded-3xl border px-4 py-4 text-left transition ${
                        item.id === "blog"
                          ? "border-emerald-300 bg-emerald-950/40 text-white"
                          : "border-slate-800 bg-slate-900/80 text-slate-200 hover:border-slate-500"
                      }`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <main>
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                    Eat Halal Journal
                  </p>
                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                    Latest stories from our admins and community.
                  </h2>
                </div>
                <Button asChild>
                  <Link href="/blog" className="inline-flex items-center gap-2">
                    Browse All Content <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
                <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:col-span-7 lg:row-span-2">
                  <div className="relative h-72 overflow-hidden sm:h-96">
                    <img
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute left-6 bottom-6 right-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                        {featuredPost.category} · {featuredPost.publishedAt}
                      </p>
                      <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                        {featuredPost.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                  </div>
                </article>

                <article className="flex flex-col justify-between overflow-hidden rounded-3xl bg-emerald-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:col-span-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                      Second Most Recent Article
                    </p>
                    <h3 className="mt-4 text-2xl font-black leading-tight text-slate-900">
                      {secondPost.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-700">
                      {secondPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold uppercase text-slate-900">
                    <span>{secondPost.publishedAt}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>

                <article className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Latest Recipe
                  </p>
                  <h3 className="mt-4 text-2xl font-black text-slate-900">
                    {latestRecipe.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {latestRecipe.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
                    <span>Cook time: {latestRecipe.cookTime}</span>
                    <Play className="h-4 w-4" />
                  </div>
                </article>

                <article className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={featuredVideo.imageUrl}
                      alt={featuredVideo.title}
                      className="h-full w-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-6 bottom-6">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/90">
                        {featuredVideo.tag}
                      </span>
                      <h3 className="mt-4 text-2xl font-black leading-tight">
                        {featuredVideo.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/80">
                        {featuredVideo.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white">
                        <Play className="h-4 w-4" />
                        {featuredVideo.duration}
                      </div>
                    </div>
                  </div>
                </article>

                <article className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Older Articles
                  </p>
                  <div className="mt-6 space-y-4">
                    {olderPosts.map((post) => (
                      <Link key={post.id} href="#" className="block rounded-3xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-slate-50">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-base font-semibold text-slate-900">{post.title}</h4>
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                              {post.category}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
