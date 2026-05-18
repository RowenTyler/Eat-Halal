"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Share2, ChevronRight, ArrowRight, Trash2 } from "lucide-react";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const postLibrary = [
  {
    slug: "how-halal-restaurants-transform",
    type: "article",
    category: "Food Culture",
    title: "How Halal Restaurants Are Transforming South African Food Culture",
    subtitle: "Discover why halal dining is growing fast, how certification builds trust, and the stories behind the restaurants shaping the community.",
    author: "Amina Patel",
    publishedAt: "18 May 2026",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop",
    contentBlocks: [
      { type: "paragraph", content: "Halal dining has found new momentum in the city as restaurants become gathering places for conversations about culture, faith and food." },
      { type: "subheading", content: "A new editorial voice for halal food" },
      { type: "paragraph", content: "From neighbourhood cafés to refined dining rooms, the menus are blending tradition with contemporary plating. Customers are looking for places that feel curated, respectful, and delicious." },
      { type: "image", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop", caption: "A modern halal dining room where herbal greens meet warm gold accents." },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { type: "paragraph", content: "Trusted certification and transparent ingredient sourcing are becoming part of the story that readers want to see." },
    ],
  },
  {
    slug: "lamb-biryani-with-caramelised-onions",
    type: "recipe",
    category: "Halal Lifestyle",
    title: "Lamb Biryani with Caramelised Onions",
    subtitle: "A layered classic with fragrant rice, spices, and slow-cooked lamb.",
    author: "Zakir Patel",
    publishedAt: "12 May 2026",
    heroImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=900&fit=crop",
    prepTime: "20 min",
    cookTime: "1 hr 30 min",
    servings: "6",
    difficulty: "Medium",
    ingredients: [
      { group: "For the marinade", items: ["500g lamb shoulder, cubed", "200g yogurt", "2 tbsp ginger-garlic paste", "1 tsp turmeric"] },
      { group: "For the rice", items: ["400g basmati rice", "4 cups water", "2 bay leaves", "4 cardamom pods"] },
    ],
    method: [
      { text: "Marinate the lamb with yogurt, spices, and salt. Refrigerate for at least 2 hours.", image: "" },
      { text: "Rinse the rice and cook until it is 70% done. Drain and set aside.", image: "" },
      { text: "Layer the lamb and rice in a heavy pot, top with fried onions, and steam for 30 minutes.", image: "" },
    ],
    notes: "Serve with fresh coriander and lemon wedges. Toasted almonds add texture and warmth.",
  },
  {
    slug: "halal-street-food-video-tour",
    type: "video",
    category: "Travel",
    title: "Halal Street Food Video Tour",
    subtitle: "A short film exploring Durban's most loved halal street vendors.",
    author: "Amirah Noor",
    publishedAt: "8 May 2026",
    heroVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Watch as we move from vendor stalls to hidden lunch spots in this guided halal food adventure.",
    bodyBlocks: [
      { type: "paragraph", content: "This video captures the energy of street vendors preparing meals for loyal customers while sharing the stories behind every dish." },
    ],
  },
];

const sampleComments = [
  {
    id: "c1",
    user: "sarah_za",
    avatar: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop",
    timestamp: "2h ago",
    text: "Loved the recipe flow and the video introduction — feels authentic and easy to follow!",
    replies: [
      { id: "c1-1", user: "eat-halal-admin", timestamp: "1h ago", text: "Thanks, Sarah! We're planning more recipe stories soon." },
    ],
  },
  {
    id: "c2",
    user: "mariam_m",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    timestamp: "4h ago",
    text: "The step layout is so helpful for beginners — especially the prep time callout.",
    replies: [],
  },
];

export default function BlogReaderPage({ params }) {
  const { slug } = params;
  const post = postLibrary.find((item) => item.slug === slug);
  const [likeCount, setLikeCount] = useState(224);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(sampleComments);
  const [commentDraft, setCommentDraft] = useState("");
  const [verified, setVerified] = useState(false);
  const [isAdmin] = useState(false);

  const related = useMemo(() => {
    if (!post) {
      return [];
    }
    return postLibrary.filter((item) => item.type === post.type && item.slug !== post.slug).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f9fafb] text-[#1a1a1a]">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#6b7280]">Post not found</p>
          <h1 className="mt-4 text-4xl font-black font-condensed">We couldn't find that story.</h1>
          <p className="mt-3 text-sm text-[#4b5563]">Check the link or return to the blog homepage.</p>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a6b3c] px-6 py-3 text-sm font-semibold text-white">
            Go to Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const wordCount = post.contentBlocks?.reduce((count, block) => {
    if (block.type === "paragraph" || block.type === "subheading") {
      return count + block.content.split(" ").length;
    }
    return count;
  }, 0) || 0;

  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  const handleLike = () => {
    if (!verified) return;
    setHasLiked((prev) => !prev);
    setLikeCount((count) => count + (hasLiked ? -1 : 1));
  };

  const handlePostComment = () => {
    if (!verified || !commentDraft.trim()) return;
    setComments((current) => [
      {
        id: `c${Date.now()}`,
        user: "verified_user",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
        timestamp: "Just now",
        text: commentDraft.trim(),
        replies: [],
      },
      ...current,
    ]);
    setCommentDraft("");
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1a1a1a]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white">
            <span className="rounded-full bg-[#1a6b3c] px-3 py-1 text-white">{post.category}</span>
            <span className="rounded-full bg-[#e8c96a]/15 px-3 py-1 text-[#1a1a1a]">{post.type === "video" ? post.heroVideo ? "Video" : "Video" : `${readTime} min read`}</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.03em] font-condensed sm:text-5xl">{post.title}</h1>
            <p className="max-w-3xl text-lg font-medium text-[#4b5563] font-condensed">{post.subtitle}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#6b7280]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                  <Image src={post.heroImage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop"} alt={post.author} width={40} height={40} className="object-cover" unoptimized />
                </div>
                <span>By {post.author}</span>
              </div>
              <span>{post.publishedAt}</span>
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {post.type === "article" && (
            <article className="space-y-8">
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <Image src={post.heroImage} alt={post.title} width={1200} height={700} className="h-full w-full object-cover" unoptimized />
              </div>
              <div className="space-y-6">
                {post.contentBlocks.map((block, index) => {
                  if (block.type === "paragraph") {
                    return <p key={index} className="text-base leading-8 text-[#374151]">{block.content}</p>;
                  }
                  if (block.type === "subheading") {
                    return <h2 key={index} className="text-2xl font-bold text-[#1a6b3c] font-condensed">{block.content}</h2>;
                  }
                  if (block.type === "image") {
                    return (
                      <figure key={index} className="space-y-3 rounded-3xl overflow-hidden border border-slate-200 bg-slate-50">
                        <Image src={block.src} alt={block.caption} width={1200} height={700} className="h-full w-full object-cover" unoptimized />
                        <figcaption className="p-4 text-sm text-[#6b7280]">{block.caption}</figcaption>
                      </figure>
                    );
                  }
                  if (block.type === "video") {
                    return (
                      <div key={index} className="overflow-hidden rounded-3xl border border-slate-200">
                        <iframe
                          className="aspect-video w-full"
                          src={block.url}
                          title="Embedded video"
                          allowFullScreen
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </article>
          )}

          {post.type === "recipe" && (
            <article className="space-y-8">
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <Image src={post.heroImage} alt={post.title} width={1200} height={700} className="h-full w-full object-cover" unoptimized />
              </div>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,1fr)]">
                <div className="space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Prep Time", value: post.prepTime },
                      { label: "Cook Time", value: post.cookTime },
                      { label: "Servings", value: post.servings },
                      { label: "Difficulty", value: post.difficulty },
                    ].map((meta) => (
                      <div key={meta.label} className="rounded-3xl bg-[#f8fafb] p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#6b7280]">{meta.label}</p>
                        <p className="mt-2 text-lg font-semibold text-[#111827]">{meta.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 rounded-3xl border border-slate-200 bg-[#f8fafb] p-6">
                    <h3 className="text-2xl font-bold font-condensed">Ingredients</h3>
                    <div className="space-y-5">
                      {post.ingredients.map((group) => (
                        <div key={group.group} className="space-y-3">
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#374151]">{group.group}</p>
                          <ul className="space-y-2">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#4b5563] shadow-sm">
                                <input type="checkbox" className="h-4 w-4 rounded border-[#d1d5db] text-[#1a6b3c]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-bold font-condensed">Method</h3>
                  <div className="space-y-4">
                    {post.method.map((step, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 p-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a84c]/15 text-lg font-bold text-[#7e6b36]">{index + 1}</div>
                          <p className="text-sm text-[#6b7280]">Step {index + 1}</p>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-[#374151]">{step.text}</p>
                      </div>
                    ))}
                  </div>
                  {post.notes && (
                    <div className="rounded-3xl bg-[#f8fafb] p-5 text-sm text-[#4b5563]">
                      <p className="font-semibold text-[#111827]">Chef's Notes</p>
                      <p className="mt-3">{post.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          )}

          {post.type === "video" && (
            <article className="space-y-8">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
                <iframe className="aspect-video w-full" src={post.heroVideo} title={post.title} allowFullScreen />
              </div>
              <div className="space-y-6">
                <p className="text-base leading-8 text-[#374151]">{post.description}</p>
                {post.bodyBlocks?.map((block, index) => (
                  <p key={index} className="text-base leading-8 text-[#374151]">{block.content}</p>
                ))}
              </div>
            </article>
          )}

          <div className="sticky top-16 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-[#374151]">
                <button
                  type="button"
                  onClick={handleLike}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition ${verified ? "border-[#1a6b3c] bg-[#1a6b3c] text-white" : "border-slate-200 bg-white text-[#4b5563]"}`}
                >
                  <Heart className="h-4 w-4" /> Like
                </button>
                <span>{likeCount}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                <span>{comments.length} comments</span>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#f8fafb] px-4 py-2 text-sm hover:bg-[#e5e7eb]">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
            {!verified ? (
              <div className="mt-4 rounded-3xl border border-dashed border-[#c9a84c] bg-[#fffbeb] p-5 text-sm text-[#6b7280]">
                Sign in to join the conversation and like posts.
              </div>
            ) : null}
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-[#f8fafb] p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#6b7280]">Comments</p>
                <h2 className="mt-2 text-2xl font-black font-condensed">Join the conversation</h2>
              </div>
              {verified ? (
                <button className="inline-flex items-center gap-2 rounded-full bg-[#1a6b3c] px-4 py-2 text-sm font-semibold text-white">
                  Post a comment
                </button>
              ) : (
                <Link href="/auth" className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#1a1a1a]">
                  Sign in to comment
                </Link>
              )}
            </div>
            {verified ? (
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
                <textarea
                  value={commentDraft}
                  onChange={(event) => setCommentDraft(event.target.value)}
                  placeholder="Write your comment..."
                  className="min-h-[140px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none"
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#6b7280]">Comments post instantly for verified users.</span>
                  <button
                    type="button"
                    onClick={handlePostComment}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1a6b3c] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            ) : null}

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-100">
                      <Image src={comment.avatar} alt={comment.user} width={44} height={44} className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-semibold text-[#111827]">{comment.user}</p>
                          <p className="text-xs text-[#6b7280]">{comment.timestamp}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                          <button className="rounded-full px-3 py-1 hover:bg-slate-100">Reply</button>
                          {isAdmin ? <button className="rounded-full px-3 py-1 text-[#ef4444] hover:bg-slate-100">Delete</button> : null}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#374151]">{comment.text}</p>
                      {comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 border-l-2 border-slate-200 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="rounded-3xl bg-[#f8fafb] p-4">
                              <div className="flex items-center justify-between gap-3 text-xs text-[#6b7280]">
                                <span>{reply.user}</span>
                                <span>{reply.timestamp}</span>
                              </div>
                              <p className="mt-2 text-sm text-[#374151]">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6b7280]">TODO: connect to Supabase comments table with RLS. TODO: implement real-time comment updates via Supabase Realtime</p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#6b7280]">More from the Blog</p>
                <h2 className="mt-2 text-3xl font-black font-condensed">Related stories</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a6b3c]">
                View All Posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 overflow-hidden rounded-3xl bg-slate-100">
                    <Image src={item.heroImage || item.heroVideo} alt={item.title} width={640} height={360} className="h-40 w-full object-cover" unoptimized />
                  </div>
                  <span className="inline-flex rounded-full bg-[#e8c96a]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#7e6b36]">{item.type === "article" ? "Article" : item.type === "recipe" ? "Recipe" : "Video"}</span>
                  <h3 className="mt-3 text-lg font-bold text-[#111827]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#6b7280]">By {item.author} · {item.publishedAt}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
