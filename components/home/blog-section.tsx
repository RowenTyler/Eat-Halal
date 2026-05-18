import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, recipes, videos } from "@/lib/mock-blog-data";

const latestBlog = blogPosts[0];
const secondBlog = blogPosts[1];
const latestRecipe = recipes[0];
const latestVideo = videos[0];
const olderArticles = blogPosts.slice(2, 4);

const DiagArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

export function BlogSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Explore Articles, Recipes & Reviews
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Read Our Blog and Discover New Halal Food Stories
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href="/blog" className="inline-flex items-center gap-2">
              Read Our Blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gridTemplateRows: "auto auto" }}
        >
          <article
            className="relative rounded-3xl overflow-hidden shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ gridColumn: "1 / 6", gridRow: "1 / 3", minHeight: 500 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full w-px"
                  style={{
                    left: `${15 + i * 20}%`,
                    background: "rgba(90,74,58,.15)",
                    transform: "rotate(10deg) scaleY(1.5)",
                    transformOrigin: "top",
                  }}
                />
              ))}
              <div
                className="absolute bottom-28 left-12 opacity-50"
                style={{
                  width: 128,
                  height: 192,
                  background: "linear-gradient(170deg,#3a3028,#6b5a4a)",
                  borderRadius: "60% 40% 40% 60% / 60% 60% 40% 40%",
                }}
              />
              <div
                className="absolute bottom-24 left-28 opacity-40"
                style={{
                  width: 96,
                  height: 160,
                  background: "linear-gradient(170deg,#4a3d30,#7a6a55)",
                  borderRadius: "50% 50% 40% 60% / 60% 60% 40% 40%",
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d6c9b0] via-[#b8a98c] to-[#9e9080]" />
            <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-lg">
              🔥
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,.35) 0%, transparent 100%)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80 mb-2">
                Category . <strong>Blog</strong> | {latestBlog.publishedAt}
              </p>
              <h3 className="text-[34px] font-black uppercase leading-[1.05] tracking-[-0.03em] text-white sm:text-[42px]">
                {latestBlog.title}
              </h3>
            </div>
          </article>

          <article
            className="relative rounded-3xl p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ gridColumn: "6 / 10", gridRow: "1 / 2", backgroundColor: "#c8f135" }}
          >
            <button className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:scale-110 transition-transform">
              <DiagArrow />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-600 mb-3">
              Category . Article
            </p>
            <h3 className="text-[28px] font-black uppercase leading-[1.05] tracking-[-0.03em] text-stone-900 mb-4">
              {secondBlog.title}
            </h3>
            <p className="text-sm leading-7 text-stone-700">
              {secondBlog.excerpt}
            </p>
          </article>

          <article
            className="relative rounded-3xl p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ gridColumn: "10 / 13", gridRow: "1 / 2", backgroundColor: "#dde8f8", minHeight: 260 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500 mb-1">
              Category . Blog
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500 mb-3">
              Hot · {olderArticles[0]?.publishedAt}
            </p>
            <h3 className="text-[26px] font-black uppercase leading-[1.05] tracking-[-0.03em] text-stone-900">
              {olderArticles[0]?.title}
            </h3>
            <div className="absolute bottom-0 right-0 w-28 h-36 overflow-hidden rounded-tl-3xl" style={{ background: "linear-gradient(180deg,#9ab8e0,#6a96c8)" }}>
              <div
                className="absolute top-4 left-4 rounded-full opacity-65"
                style={{ width: 64, height: 96, background: "linear-gradient(160deg,#2d2d2d,#555)" }}
              />
            </div>
          </article>

          <article
            className="relative rounded-3xl overflow-hidden shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ gridColumn: "6 / 10", gridRow: "2 / 3", minHeight: 240, background: "linear-gradient(135deg,#c4b49a 0%,#a89070 50%,#8a7258 100%)" }}
          >
            <div className="absolute inset-0 flex items-end justify-center pb-8">
              <div className="w-40 h-52 rounded-t-full opacity-55" style={{ background: "linear-gradient(180deg,#4d4d4d,#2a2a2a)" }} />
            </div>
            <div className="absolute top-4 left-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                Category . Review
              </p>
            </div>
            <div className="absolute top-4 right-4">
              <p className="text-[11px] font-medium text-white/80">5 Min · {latestVideo.duration}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105">
                <PlayIcon />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(to top, rgba(0,0,0,.55), transparent)" }}>
              <h3 className="text-[15px] font-black uppercase leading-tight text-white tracking-tight">
                {latestVideo.title}
              </h3>
            </div>
          </article>

          <article
            className="rounded-3xl bg-[#c8f135] px-5 py-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ gridColumn: "10 / 13", gridRow: "2 / 3" }}
          >
            {olderArticles.slice(1, 3).map((post, i) => (
              <div
                key={post.id}
                className="link-row flex items-center justify-between border-t border-black/15 py-4 first:border-t-0"
              >
                <span className="text-[12px] font-black uppercase tracking-tight text-stone-900 leading-tight">
                  {post.title}
                </span>
                <div className="arr flex h-7 w-7 items-center justify-center rounded-full border-2 border-stone-900 transition-transform group-hover:translate-x-1">
                  <ArrowRight />
                </div>
              </div>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
