"use client";

import { useMemo, useState } from "react";
import { Plus, Image as ImageIcon, Video, FileText, Upload, ArrowRight } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const categories = [
  "Community",
  "Restaurant Features",
  "Food Culture",
  "Travel",
  "Halal Lifestyle",
  "Events",
];

const typeCards = [
  {
    key: "article",
    label: "Article",
    icon: "📝",
    description: "Write an editorial, feature, or opinion piece",
  },
  {
    key: "recipe",
    label: "Recipe",
    icon: "🍽️",
    description: "Share a structured recipe with ingredients and steps",
  },
  {
    key: "video",
    label: "Video",
    icon: "🎬",
    description: "Embed a video with a title and description",
  },
];

const defaultHeroImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop";

export default function NewBlogPostPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [heroTab, setHeroTab] = useState("upload");
  const [heroUrl, setHeroUrl] = useState("");
  const [heroSource, setHeroSource] = useState("upload");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [bodyBlocks, setBodyBlocks] = useState([]);
  const [recipeMeta, setRecipeMeta] = useState({ prepTime: "15 min", cookTime: "45 min", servings: "4", difficulty: "Medium" });
  const [ingredientGroups, setIngredientGroups] = useState([
    { id: "group-1", name: "Main ingredients", items: [{ id: "item-1", quantity: "500", unit: "g", name: "lamb shoulder" }] },
  ]);
  const [methodSteps, setMethodSteps] = useState([{ id: "step-1", text: "Brown the lamb in a hot pan.", imageUrl: "" }]);
  const [videoUrl, setVideoUrl] = useState("");

  const isArticleReady = title.trim() && subtitle.trim() && (heroUrl || heroSource === "upload");
  const isRecipeReady = title.trim() && subtitle.trim() && (heroUrl || heroSource === "upload") && methodSteps.length > 0;
  const isVideoReady = title.trim() && videoUrl.trim();

  const canPublish = useMemo(() => {
    if (selectedType === "article") return isArticleReady && bodyBlocks.length > 0;
    if (selectedType === "recipe") return isRecipeReady && ingredientGroups.length > 0;
    if (selectedType === "video") return isVideoReady;
    return false;
  }, [selectedType, isArticleReady, isRecipeReady, isVideoReady, bodyBlocks.length, ingredientGroups.length]);

  const addBodyBlock = (blockType) => {
    setBodyBlocks((current) => [
      ...current,
      { id: `${blockType}-${Date.now()}`, type: blockType, content: "", url: "" },
    ]);
  };

  const updateBodyBlock = (id, updates) => {
    setBodyBlocks((current) => current.map((block) => (block.id === id ? { ...block, ...updates } : block)));
  };

  const removeBodyBlock = (id) => {
    setBodyBlocks((current) => current.filter((block) => block.id !== id));
  };

  const addIngredientGroup = () => {
    setIngredientGroups((current) => [
      ...current,
      { id: `group-${Date.now()}`, name: "New group", items: [{ id: `item-${Date.now()}`, quantity: "", unit: "g", name: "" }] },
    ]);
  };

  const addIngredient = (groupId) => {
    setIngredientGroups((current) =>
      current.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: [
                ...group.items,
                { id: `item-${Date.now()}`, quantity: "", unit: "g", name: "" },
              ],
            }
          : group
      )
    );
  };

  const updateIngredient = (groupId, itemId, updates) => {
    setIngredientGroups((current) =>
      current.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.map((item) => (item.id === itemId ? { ...item, ...updates } : item)),
            }
          : group
      )
    );
  };

  const addMethodStep = () => {
    setMethodSteps((current) => [...current, { id: `step-${Date.now()}`, text: "", imageUrl: "" }]);
  };

  const updateMethodStep = (stepId, updates) => {
    setMethodSteps((current) => current.map((step) => (step.id === stepId ? { ...step, ...updates } : step)));
  };

  const removeMethodStep = (stepId) => {
    setMethodSteps((current) => current.filter((step) => step.id !== stepId));
  };

  const heroPreviewUrl = heroUrl || defaultHeroImage;

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-[#1a1a1a]">
      <Header />
      <div className="flex-1 flex bg-[#eef2f7]">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4b5563]">
                Start with a content type, then use the editor to build an article, recipe or video post.
              </p>
            </div>

            {!selectedType ? (
              <section className="grid gap-6 lg:grid-cols-3">
                {typeCards.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedType(item.key)}
                    className="group rounded-3xl border border-slate-200 bg-white p-8 text-left transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f7f6f2] text-3xl transition group-hover:bg-gradient-to-br group-hover:from-[#1a6b3c] group-hover:via-[#2d9e5f] group-hover:to-[#c9a84c] group-hover:text-white">
                      {item.icon}
                    </div>
                    <h2 className="mt-6 text-2xl font-black font-condensed">{item.label}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#6b7280]">{item.description}</p>
                  </button>
                ))}
              </section>
            ) : (
              <section className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-[#6b7280]">{selectedType === "article" ? "Article Editor" : selectedType === "recipe" ? "Recipe Editor" : "Video Post Editor"}</p>
                    <h2 className="mt-3 text-3xl font-black font-condensed">{selectedType === "article" ? "Article creation" : selectedType === "recipe" ? "Recipe creation" : "Video story creation"}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedType(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Change type
                  </button>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">
                  <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#374151]">Title</label>
                        <input
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                          placeholder="Title"
                          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-3xl font-black font-condensed outline-none ring-0 placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#374151]">Subtitle</label>
                        <input
                          value={subtitle}
                          onChange={(event) => setSubtitle(event.target.value)}
                          placeholder="Subtitle"
                          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none placeholder:text-slate-400"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-[#374151]">
                          Category
                          <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                          >
                            {categories.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </label>
                        {selectedType === "recipe" && (
                          <div className="grid gap-3 sm:grid-cols-2">
                            <label className="space-y-2 text-sm text-[#374151]">
                              Prep Time
                              <input
                                value={recipeMeta.prepTime}
                                onChange={(event) => setRecipeMeta((current) => ({ ...current, prepTime: event.target.value }))}
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-[#374151]">
                              Cook Time
                              <input
                                value={recipeMeta.cookTime}
                                onChange={(event) => setRecipeMeta((current) => ({ ...current, cookTime: event.target.value }))}
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[#374151]">Hero media</p>
                          <p className="text-xs text-[#6b7280]">Upload or embed the hero content for the post.</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6b7280]">{heroTab}</span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {[
                          { key: "upload", label: "Upload Image", icon: Upload },
                          { key: "embed", label: "Embed Video", icon: Video },
                          { key: "unsplash", label: "Unsplash Image", icon: ImageIcon },
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setHeroTab(item.key)}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                              heroTab === item.key ? "border-[#1a6b3c] bg-white text-[#111827]" : "border-slate-200 bg-slate-100 text-[#475569] hover:border-[#c9a84c]"
                            }`}
                          >
                            <div className="flex items-center gap-2 font-semibold">
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-[#6b7280]">
                        {heroTab === "upload" ? (
                          <div className="space-y-3">
                            <p className="text-base font-semibold text-[#111827]">Drag & drop or choose a PNG / JPG file.</p>
                            <p className="text-sm">Minimum 1280×720px, up to 5MB.</p>
                            <button className="inline-flex items-center gap-2 rounded-full bg-[#1a6b3c] px-4 py-2 text-sm font-semibold text-white">
                              <Upload className="h-4 w-4" /> Choose file
                            </button>
                          </div>
                        ) : heroTab === "embed" ? (
                          <label className="space-y-2 text-left text-sm">
                            <span>Video URL</span>
                            <input
                              value={heroUrl}
                              onChange={(event) => setHeroUrl(event.target.value)}
                              placeholder="https://youtube.com/..."
                              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
                            />
                          </label>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm text-[#374151]">Search Unsplash images in the editor.</p>
                            <input
                              value={heroUrl}
                              onChange={(event) => setHeroUrl(event.target.value)}
                              placeholder="Search mock Unsplash images"
                              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                            />
                            <p className="text-xs text-[#6b7280]">TODO: connect Unsplash API</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedType === "video" && (
                      <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-[#374151]">Video source</p>
                        <input
                          value={videoUrl}
                          onChange={(event) => setVideoUrl(event.target.value)}
                          placeholder="Paste YouTube or Vimeo URL"
                          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                        />
                        {videoUrl && (
                          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white">
                            <div className="aspect-video bg-slate-950/80 p-3">
                              <iframe
                                src={videoUrl.includes("youtube") ? videoUrl.replace("watch?v=", "embed/") : videoUrl}
                                title="Video preview"
                                className="h-full w-full rounded-2xl"
                                allowFullScreen
                              />
                            </div>
                            <p className="p-3 text-xs text-slate-300">TODO: use oEmbed API to fetch thumbnail</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="rounded-3xl bg-[#f8fafb] p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#374151]">Content blocks</p>
                        <p className="text-xs text-[#6b7280]">Add paragraphs, images, video embeds, or subheadings.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addBodyBlock("text")}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1a6b3c] shadow-sm hover:bg-[#f3f8f1]"
                        >
                          <FileText className="h-4 w-4" /> Text
                        </button>
                        <button
                          type="button"
                          onClick={() => addBodyBlock("image")}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1a6b3c] shadow-sm hover:bg-[#f3f8f1]"
                        >
                          <ImageIcon className="h-4 w-4" /> Image
                        </button>
                        <button
                          type="button"
                          onClick={() => addBodyBlock("video")}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1a6b3c] shadow-sm hover:bg-[#f3f8f1]"
                        >
                          <Video className="h-4 w-4" /> Video
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {bodyBlocks.map((block) => (
                        <div key={block.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-[#374151]">{block.type === "text" ? "Text block" : block.type === "image" ? "Image block" : "Video embed"}</p>
                            <button
                              type="button"
                              onClick={() => removeBodyBlock(block.id)}
                              className="text-sm font-semibold text-[#ef4444] hover:text-[#b91c1c]"
                            >
                              Delete
                            </button>
                          </div>
                          {block.type === "text" && (
                            <textarea
                              value={block.content}
                              onChange={(event) => updateBodyBlock(block.id, { content: event.target.value })}
                              placeholder="Start writing..."
                              className="min-h-[140px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none"
                            />
                          )}
                          {block.type === "image" && (
                            <input
                              value={block.url}
                              onChange={(event) => updateBodyBlock(block.id, { url: event.target.value })}
                              placeholder="Image URL or upload mock path"
                              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                            />
                          )}
                          {block.type === "video" && (
                            <div className="space-y-3">
                              <input
                                value={block.url}
                                onChange={(event) => updateBodyBlock(block.id, { url: event.target.value })}
                                placeholder="Video URL"
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                              />
                              {block.url && (
                                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white">
                                  <iframe
                                    className="aspect-video w-full"
                                    src={block.url.includes("youtube") ? block.url.replace("watch?v=", "embed/") : block.url}
                                    title="Embedded video preview"
                                    allowFullScreen
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                      {!bodyBlocks.length && (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-[#6b7280]">
                          Click the buttons above to add content blocks for this post.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedType === "recipe" && (
                  <section className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-[#6b7280]">Ingredients</p>
                        <h3 className="mt-2 text-2xl font-black font-condensed">Build recipe groups</h3>
                      </div>
                      <button
                        type="button"
                        onClick={addIngredientGroup}
                        className="inline-flex items-center gap-2 rounded-full bg-[#1a6b3c] px-4 py-2 text-sm font-semibold text-white"
                      >
                        <Plus className="h-4 w-4" /> Add Group
                      </button>
                    </div>
                    <div className="space-y-6">
                      {ingredientGroups.map((group) => (
                        <div key={group.id} className="space-y-4 rounded-3xl border border-slate-200 bg-[#f8fafb] p-5">
                          <input
                            value={group.name}
                            onChange={(event) =>
                              setIngredientGroups((current) =>
                                current.map((item) =>
                                  item.id === group.id ? { ...item, name: event.target.value } : item
                                )
                              )
                            }
                            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none"
                          />
                          <div className="space-y-3">
                            {group.items.map((item) => (
                              <div key={item.id} className="grid gap-3 md:grid-cols-[80px_100px_1fr]">
                                <input
                                  value={item.quantity}
                                  onChange={(event) => updateIngredient(group.id, item.id, { quantity: event.target.value })}
                                  placeholder="Qty"
                                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                                />
                                <select
                                  value={item.unit}
                                  onChange={(event) => updateIngredient(group.id, item.id, { unit: event.target.value })}
                                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                                >
                                  {['g','kg','ml','l','tsp','tbsp','cup','whole'].map((unit) => (
                                    <option key={unit} value={unit}>{unit}</option>
                                  ))}
                                </select>
                                <input
                                  value={item.name}
                                  onChange={(event) => updateIngredient(group.id, item.id, { name: event.target.value })}
                                  placeholder="Ingredient"
                                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => addIngredient(group.id)}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1a6b3c] shadow-sm hover:bg-[#f3f8f1]"
                          >
                            <Plus className="h-4 w-4" /> Add Ingredient
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-4 rounded-3xl border border-slate-200 bg-[#f8fafb] p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.32em] text-[#6b7280]">Method</p>
                          <p className="text-sm text-[#475569]">Numbered steps with optional image attachments.</p>
                        </div>
                        <button
                          type="button"
                          onClick={addMethodStep}
                          className="inline-flex items-center gap-2 rounded-full bg-[#1a6b3c] px-4 py-2 text-sm font-semibold text-white"
                        >
                          <Plus className="h-4 w-4" /> Add Step
                        </button>
                      </div>
                      <div className="space-y-4">
                        {methodSteps.map((step, index) => (
                          <div key={step.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a84c]/20 text-[#7e6b36]">{index + 1}</div>
                                <p className="font-semibold text-[#111827]">Step {index + 1}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeMethodStep(step.id)}
                                className="text-sm font-semibold text-[#ef4444] hover:text-[#b91c1c]"
                              >
                                Remove
                              </button>
                            </div>
                            <textarea
                              value={step.text}
                              onChange={(event) => updateMethodStep(step.id, { text: event.target.value })}
                              placeholder="Describe this step"
                              className="mt-4 min-h-[120px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                            />
                            <input
                              value={step.imageUrl}
                              onChange={(event) => updateMethodStep(step.id, { imageUrl: event.target.value })}
                              placeholder="Optional image URL"
                              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
                      <p className="text-sm font-semibold text-[#374151]">Chef's Notes / Tips</p>
                      <textarea
                        placeholder="Optional chef's notes or recipe tips"
                        className="min-h-[120px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                      />
                    </div>
                  </section>
                )}
              </div>

              <div className="sticky bottom-0 z-10 mt-8 rounded-t-3xl border-t border-slate-200 bg-[#f9fafb] py-5 shadow-[0_-10px_30px_-20px_rgba(15,23,42,0.15)]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-0">
                  <div className="space-y-2 text-sm text-[#6b7280]">
                    <p>{bodyBlocks.reduce((total, block) => total + (block.content ? block.content.split(" ").length : 0), 0)} words</p>
                    <p className="font-medium text-[#374151]">{canPublish ? "Ready to submit" : "Complete required fields to publish."}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#374151] hover:bg-slate-100">
                      Save Draft
                    </button>
                    <button
                      type="button"
                      disabled={!canPublish}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1a6b3c] via-[#2d9e5f] to-[#c9a84c] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1a6b3c]/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {selectedType === "video" ? "Publish" : "Submit for Review"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
