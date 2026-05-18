import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { blogPosts, recipes, videos } from "@/lib/mock-blog-data";

const latestArticle = { ...blogPosts[0], slug: "how-halal-restaurants-transform" };
const secondArticle = { ...blogPosts[1], slug: "the-new-halal-restaurant-opening" };
const latestRecipe = { ...recipes[0], slug: "lamb-biryani-with-caramelised-onions" };
const latestVideo = { ...videos[0], slug: "halal-street-food-video-tour" };
const olderArticles = [
  { ...blogPosts[2], slug: "spot-genuine-halal-certification" },
  { ...blogPosts[3], slug: "restaurants-using-reviews-to-build-loyalty" },
];

export default function BlogGrid() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1a6b3c]">Eat Halal Journal</p>
            <h2 className="mt-3 text-3xl font-black font-condensed sm:text-4xl">Latest stories from the halal community.</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-3 text-sm font-semibold text-[#1a1a1a] shadow-lg shadow-[#c9a84c]/20 transition hover:-translate-y-0.5"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <article
            className="relative overflow-hidden rounded-3xl shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl lg:col-span-7 lg:row-span-2"
            style={{ minHeight: 520 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <Image src={latestArticle.imageUrl} alt={latestArticle.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a6b3c]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <span className="inline-flex rounded-full bg-[#c9a84c]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white">
                {latestArticle.category}
              </span>
              <h3 className="mt-4 text-4xl font-black leading-tight tracking-[-0.03em] font-condensed">{latestArticle.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90">{latestArticle.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
                <span>{latestArticle.author}</span>
                <span>{latestArticle.publishedAt}</span>
              </div>
            </div>
            <Link href={`/blog/${latestArticle.slug}`} className="absolute inset-0" aria-label={latestArticle.title} />
          </article>

          <article className="relative overflow-hidden rounded-3xl bg-[#c9a84c] p-8 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl lg:col-span-3 lg:row-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c] via-[#e8c96a] to-[#f8f1d5] opacity-90" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1a1a1a]/70">Feature</span>
                <h3 className="mt-6 text-3xl font-black leading-tight text-[#1a1a1a] font-condensed">{secondArticle.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#1a1a1a]/80">{secondArticle.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#1a1a1a]">{secondArticle.publishedAt}</span>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1a6b3c] shadow-md">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
            <Link href={`/blog/${secondArticle.slug}`} className="absolute inset-0" aria-label={secondArticle.title} />
          </article>

          <article className="overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl lg:col-span-2 lg:row-span-1">
            <div className="mb-4 overflow-hidden rounded-3xl bg-slate-100">
              <Image src={latestRecipe.imageUrl} alt={latestRecipe.name} width={640} height={360} className="h-40 w-full object-cover" unoptimized />
            </div>
            <div className="mb-4 inline-flex rounded-full bg-[#c9a84c]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#7e6b36]">
              Recipe
            </div>
            <h3 className="text-xl font-bold text-[#111827]">{latestRecipe.name}</h3>
            <p className="mt-3 text-sm leading-6 text-[#4b5563]">{latestRecipe.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-[#6b7280]">
              <span>Cook {latestRecipe.cookTime}</span>
              <span>Serves 4</span>
            </div>
            <Link href={`/blog/${latestRecipe.slug}`} className="absolute inset-0" aria-label={latestRecipe.name} />
          </article>

          <article className="relative overflow-hidden rounded-3xl shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl lg:col-span-3 lg:row-span-1">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529692236671-f1b49f4f6d29?w=1200&h=900&fit=crop')] bg-cover bg-center opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a6b3c]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#1a6b3c] shadow-lg">
                <Play className="h-6 w-6" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-flex rounded-full bg-[#c9a84c]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">Video</span>
              <h3 className="mt-4 text-xl font-black tracking-tight font-condensed">{latestVideo.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">{latestVideo.duration}</p>
            </div>
            <Link href={`/blog/${latestVideo.slug}`} className="absolute inset-0" aria-label={latestVideo.title} />
          </article>

          <article className="rounded-3xl bg-[#1a6b3c] p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl lg:col-span-4 lg:row-span-1">
            <div className="space-y-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[#d8ce8d]">More Articles</p>
                <h3 className="mt-3 text-2xl font-black font-condensed">Explore more stories</h3>
              </div>
              <div className="space-y-4">
                {olderArticles.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-center justify-between rounded-3xl border border-white/20 bg-white/10 px-4 py-4 transition hover:border-[#c9a84c] hover:bg-white/15"
                  >
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f8f6d8]">Article</p>
                      <h4 className="mt-2 text-base font-semibold text-white">{post.title}</h4>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a84c]/20 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
        <p className="mt-4 text-xs text-[#6b7280]">TODO: replace mock data with Supabase fetch — latest published posts by type</p>
      </div>
    </section>
  );
}
