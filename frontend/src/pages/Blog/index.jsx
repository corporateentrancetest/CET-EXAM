import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { BLOG, IMAGES } from "@/constants";
import { cn } from "@/lib/utils";

const POST_IMAGES = [IMAGES.laptopStudy, IMAGES.study2, IMAGES.networking, IMAGES.capToss2, IMAGES.graduatesRed];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const tags = ["All", ...BLOG.categories];
  const posts = active === "All" ? BLOG.posts : BLOG.posts.filter((p) => p.category === active);

  return (
    <div data-testid="blog-page">
      <PageHero title={BLOG.hero.heading} subtitle={BLOG.hero.body} />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tags */}
          <div className="flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                data-testid={`blog-filter-${t.toLowerCase().replace(/\s+/g, "-")}`}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors",
                  active === t
                    ? "bg-[#F5A623] border-[#F5A623] text-slate-950"
                    : "bg-white border-slate-300 text-slate-600 hover:border-[#F5A623]"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <article
                key={i}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-[#F5A623] hover:shadow-md transition-colors"
                data-testid={`blog-post-${i}`}
              >
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={POST_IMAGES[i % POST_IMAGES.length]}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-widest text-[#F5A623]">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-heading font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{p.date}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
