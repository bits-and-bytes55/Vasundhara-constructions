import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Filter,
  X,
} from "lucide-react";
import Testimonials from "./Testimonials";

const API_URL = import.meta.env.VITE_API_URL;

// ─── Local Types ─────────────────────────────────────────────
interface BlogPost {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  content: string;
  image?: string;
  category?: string;
  tags?: string[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
}

// ─── Animation Variants (fixed ease) ──────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

// ─── Reveal Component ───────────────────────────────────────
const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
};

// ─── Helpers ────────────────────────────────────────────────
const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (text = "", maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
};

// ─── Blog Card Component ────────────────────────────────────
const BlogCard = ({
  post,
  index,
  viewMode,
}: {
  post: BlogPost;
  index: number;
  viewMode: "grid" | "list";
}) => {
  const plainContent = stripHtml(post.content || "");
  const excerpt = truncateText(plainContent, viewMode === "grid" ? 100 : 140);
  const readTime = Math.max(1, Math.ceil(plainContent.split(/\s+/).filter(Boolean).length / 200));
  const postSlug = post.slug || post._id || post.id || "";

  if (viewMode === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group bg-white rounded-2xl border border-[#dbeafe] hover:border-[#bfdbfe] hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <Link to={`/blogs/${postSlug}`} className="flex flex-col md:flex-row">
          <div className="md:w-72 h-52 md:h-auto overflow-hidden bg-[#dbeafe]">
            <img
              src={post.image || "/img/report.jpg"}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.createdAt || Date.now()).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {readTime} min read
              </span>
              {post.category && (
                <span className="px-2 py-0.5 rounded-full bg-[#dbeafe] text-[#1d4ed8] text-xs font-medium">
                  {post.category}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-[#0f2d6b] group-hover:text-[#1e40af] transition-colors mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                By <span className="font-medium text-slate-500">{post.author || "Admin"}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#1d4ed8] text-sm font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-[#dbeafe] hover:border-[#bfdbfe] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      <Link to={`/blogs/${postSlug}`} className="block overflow-hidden h-52 bg-[#dbeafe]">
        <img
          src={post.image || "/img/report.jpg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.createdAt || Date.now()).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {readTime} min
          </span>
        </div>
        <Link to={`/blogs/${postSlug}`}>
          <h3 className="text-lg font-bold text-[#0f2d6b] group-hover:text-[#1e40af] transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[#eaf1fb]">
          <span className="text-xs text-slate-400">
            {post.author || "Bits and Bytes"}
          </span>
          <Link
            to={`/blogs/${postSlug}`}
            className="inline-flex items-center gap-1 text-[#1d4ed8] text-sm font-medium group-hover:gap-2 transition-all"
          >
            Read <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Skeleton Loader ────────────────────────────────────────
const SkeletonCard = ({ viewMode }: { viewMode: "grid" | "list" }) => {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-[#dbeafe] overflow-hidden animate-pulse">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 h-52 bg-slate-200" />
          <div className="flex-1 p-6 space-y-3">
            <div className="flex gap-3">
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-3 w-16 bg-slate-200 rounded" />
            </div>
            <div className="h-6 w-3/4 bg-slate-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
            </div>
            <div className="flex justify-between pt-2">
              <div className="h-3 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#dbeafe] overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-12 bg-slate-200 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 rounded" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-3 w-20 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────
const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/blogs`, {
          params: {
            page: currentPage,
            limit: postsPerPage,
            search: searchTerm || undefined,
            category: selectedCategory || undefined,
          },
        });

        const blogsData = response.data.blogs || response.data || [];
        setBlogs(Array.isArray(blogsData) ? blogsData : []);

        // Extract categories – from all blogs (if we have them) or fallback to fetch all
        let allBlogs = blogsData;
        if (!Array.isArray(blogsData) || blogsData.length === 0) {
          const allResponse = await axios.get(`${API_URL}/api/blogs?limit=100`);
          allBlogs = allResponse.data.blogs || allResponse.data || [];
        }
        const uniqueCategories = [
          ...new Set(allBlogs.map((blog: BlogPost) => blog.category).filter(Boolean)),
        ] as string[];
        setCategories(uniqueCategories);

        const total = response.data.total || blogsData.length;
        setTotalPages(Math.ceil(total / postsPerPage));
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const totalResults = blogs.length;

  return (
    <div className="min-h-screen bg-[#eaf1fb]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2d6b] via-[#1e40af] to-[#1d4ed8] pt-20 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#60a5fa] rounded-full blur-3xl" />
        </div>
        <div className="7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Insights & Stories
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/80 text-lg md:text-xl 2xl mb-8">
              Explore expert perspectives on digital marketing, web development, SEO, and growth strategies.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <form onSubmit={handleSearch} className="md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all"
                />
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <div className="7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#dbeafe] text-[#1e40af] text-sm font-medium hover:bg-[#dbeafe] transition-colors"
            >
              <Filter size={16} />
              Filters
              {(searchTerm || selectedCategory) && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#1e40af] text-white rounded-full">
                  {(searchTerm ? 1 : 0) + (selectedCategory ? 1 : 0)}
                </span>
              )}
            </button>

            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-slate-400 text-sm hover:text-slate-600 transition-colors"
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl border border-[#dbeafe] p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-[#1e40af] text-white" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-[#1e40af] text-white" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-2xl border border-[#dbeafe] p-5">
                <h3 className="font-semibold text-[#0f2d6b] mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      !selectedCategory ? "bg-[#1e40af] text-white" : "bg-[#eaf1fb] text-[#1e40af] hover:bg-[#dbeafe]"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedCategory === cat ? "bg-[#1e40af] text-white" : "bg-[#eaf1fb] text-[#1e40af] hover:bg-[#dbeafe]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        {!loading && (
          <div className="text-sm text-slate-400 mb-6">
            Showing {totalResults} {totalResults === 1 ? "article" : "articles"}
          </div>
        )}

        {/* Blog Grid/List */}
        {loading ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"
            }
          >
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <Sparkles className="text-red-400" size={28} />
            </div>
            <p className="text-slate-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-full bg-[#1e40af] text-white text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#dbeafe]">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#eaf1fb] flex items-center justify-center">
              <Search size={32} className="text-[#1e40af]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0f2d6b] mb-2">No articles found</h3>
            <p className="text-slate-500 mb-6">
              {searchTerm || selectedCategory
                ? "Try adjusting your search or filter criteria"
                : "Check back soon for new content"}
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 rounded-full bg-[#1e40af] text-white text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"
              }
            >
              {blogs.map((post, index) => (
                <BlogCard key={post._id || post.id || index} post={post} index={index} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-[#dbeafe] text-[#1e40af] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#dbeafe] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`min-w-[38px] h-[38px] rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-[#1e40af] text-white"
                            : "bg-white border border-[#dbeafe] text-[#1e40af] hover:bg-[#dbeafe]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-[#dbeafe] text-[#1e40af] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#dbeafe] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Testimonials />
    </div>
  );
};

export default BlogsPage;