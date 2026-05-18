"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MoreHorizontal, CheckCircle2 } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const mockPosts = [
  {
    id: "post-article-draft",
    type: "article",
    title: "Halal Dining Trends Shaping Cape Town",
    subtitle: "Why local halal restaurants are becoming cultural hubs across the city.",
    category: "Food Culture",
    author: "Aisha Khan",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    publishedAt: "Draft",
    status: "draft",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop",
  },
  {
    id: "post-article-published",
    type: "article",
    title: "The New Halal Restaurant Opening in Johannesburg",
    subtitle: "A behind-the-scenes look at the menu, design, and chef inspirations.",
    category: "Restaurant Features",
    author: "Fatima Suleiman",
    authorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    publishedAt: "15 May 2026",
    status: "published",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop",
  },
  {
    id: "post-recipe-published",
    type: "recipe",
    title: "Lamb Biryani with Caramelised Onions",
    subtitle: "A festive recipe built for sharing with family and friends.",
    category: "Halal Lifestyle",
    author: "Zakir Patel",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    publishedAt: "10 May 2026",
    status: "published",
    duration: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=900&fit=crop",
  },
  {
    id: "post-video-published",
    type: "video",
    title: "Halal Street Food Video Tour",
    subtitle: "A quick video guide to the best halal street vendors in Durban.",
    category: "Travel",
    author: "Amirah Noor",
    authorAvatar: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop",
    publishedAt: "5 May 2026",
    status: "published",
    duration: "6:42",
    imageUrl: "https://images.unsplash.com/photo-1529692236671-f1b49f4f6d29?w=1200&h=900&fit=crop",
  },
];

const filters = ["All", "Articles", "Recipes", "Videos"];

const badgeStyles = {
  article: "bg-[#1a6b3c]/10 text-[#1a6b3c]",
  recipe: "bg-[#c9a84c]/15 text-[#c9a84c]",
  video: "bg-[#13482c]/15 text-[#13482c]",
};

export default function AdminBlogPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") {
      return mockPosts;
    }
    if (activeFilter === "Articles") {
      return mockPosts.filter((post) => post.type === "article");
    }
    if (activeFilter === "Recipes") {
      return mockPosts.filter((post) => post.type === "recipe");
    }
    return mockPosts.filter((post) => post.type === "video");
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-[#1a1a1a]">
      <Header />
      <div className="flex-1 flex bg-[#f0f3f5]">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#6b7280]">Admin • Blog Creation</p>
                <h1 className="mt-4 text-4xl font-black font-condensed">Blog Creation</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b7280]">
                  Manage posts, drafts, and approved stories in one editorial hub.
                </p>
              </div>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1a6b3c] via-[#2d9e5f] to-[#c9a84c] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1a6b3c]/20 transition hover:-translate-y-0.5"
              >
                + Create New Post
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 rounded-full bg-white p-2 shadow-sm">
              {filters.map((tab) => {
                const isActive = tab === activeFilter;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#1a6b3c] text-white shadow-sm shadow-[#1a6b3c]/10"
                        : "bg-slate-100 text-[#374151] hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="grid gap-4 p-5 md:grid-cols-[280px_minmax(0,1fr)]">
                    <div className="relative h-64 overflow-hidden rounded-3xl md:h-auto">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[post.type]}`}>
                          {post.type === "article" ? "Article" : post.type === "recipe" ? "Recipe" : "Video"}
                        </span>
                        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-[#6b7280]">{post.category}</span>
                        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-[#6b7280]">{post.status === "draft" ? "Draft" : post.publishedAt}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black font-condensed text-[#111827]">{post.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-[#4b5563]">{post.subtitle}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[#6b7280]">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-100">
                            <Image src={post.authorAvatar} alt={post.author} width={32} height={32} className="object-cover" unoptimized />
                          </div>
                          <span>{post.author}</span>
                        </div>
                        <span>{post.type !== "video" ? post.readTime : post.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-start justify-end md:items-center md:justify-end">
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm text-[#4b5563]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-[#6b7280]">
                        <CheckCircle2 className="h-4 w-4 text-[#1a6b3c]" />
                        {post.status === "draft" ? "Draft saved" : "Published and visible"}
                      </span>
                      <div className="flex items-center gap-3">
                        <button className="text-sm font-semibold text-[#1a6b3c] hover:text-[#13482c]">Edit</button>
                        <button className="text-sm font-semibold text-[#c9a84c] hover:text-[#a3893f]">
                          {post.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button className="text-sm font-semibold text-[#ef4444] hover:text-[#b91c1c]">Delete</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
