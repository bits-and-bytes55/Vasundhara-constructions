import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  ArrowUp,
  Sparkles,
  Minus,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence, useInView } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
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

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (text = "", maxLength = 155) => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3).trim()}...`;
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [estimatedReadTime, setReadTime] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);

  const canonicalPath = slug ? `/blogs/${slug}` : "/blogs";
  const plainContent = stripHtml(post?.content || "");
  const blogDescription = post
    ? truncateText(plainContent)
    : "Read practical digital marketing, SEO, web development, and growth insights from Bits and Bytes IT Solution.";
  const blogImage = post?.image || "/img/report.jpg";
  const blogKeywords = post
    ? [
        ...new Set(
          [
            post.category,
            ...(post.tags || []),
            "digital marketing blog",
            "Bits and Bytes IT Solution",
          ].filter(Boolean),
        ),
      ]
    : undefined;
  const breadcrumbs = post
    ? [
        { name: "Home", url: "/" },
        { name: "Blogs", url: "/blogs" },
        { name: post.title, url: canonicalPath },
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Blogs", url: "/blogs" },
      ];
  const articleMeta = post
    ? {
        headline: post.title,
        description: blogDescription,
        image: blogImage,
        url: canonicalPath,
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        authorName: post.author,
        section: post.category,
        keywords: blogKeywords,
        tags: post.tags || [],
      }
    : null;

  useEffect(() => {
    if (!slug) {
      return;
    }

    axios
      .get(`${API_URL}/api/blogs/${slug}`)
      .then(({ data }) => {
        setPost(data);
        const wordCount = stripHtml(data.content || "").split(/\s+/).filter(Boolean).length;
        setReadTime(Math.max(1, Math.ceil(wordCount / 200)));
        setError(null);
      })
      .catch(() => setError("Blog not found"));
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (error) {
    return (
      <>
        
        <div className="min-h-screen bg-[#eaf1fb] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
              <Minus className="rotate-45 text-red-400" size={36} />
            </div>
            <h2 className="text-3xl font-bold text-[#0f2d6b] mb-3">Post not found</h2>
            <p className="text-slate-500 mb-8">This article may have been moved or removed.</p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/blogs")}
              className="px-8 py-3 rounded-full bg-[#1e40af] text-white font-semibold text-sm"
            >
              Back to Blogs
            </motion.button>
          </motion.div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        
        <div className="min-h-screen bg-[#eaf1fb] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="relative w-14 h-14 mx-auto mb-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-14 h-14 rounded-full border-2 border-slate-200 border-t-[#1e40af]"
              />
              <Sparkles className="absolute inset-0 m-auto text-[#1e40af]" size={16} />
            </div>
            <p className="text-slate-400 text-sm tracking-widest uppercase">Loading article</p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      

      <div
        className="min-h-screen bg-[#eaf1fb]"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

          .blog-prose {
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 1.05rem;
            line-height: 1.85;
            color: #374151;
          }
          .blog-prose h1,
          .blog-prose h2,
          .blog-prose h3,
          .blog-prose h4 {
            color: #1e40af;
            font-weight: 700;
            margin-top: 2em;
            margin-bottom: 0.6em;
            line-height: 1.25;
          }
          .blog-prose h2 { font-size: 1.5rem; }
          .blog-prose h3 { font-size: 1.25rem; }
          .blog-prose p  { margin-bottom: 1.5em; color: #374151; }
          .blog-prose a  { color: #1d4ed8; text-decoration: underline; text-underline-offset: 3px; }
          .blog-prose ul,
          .blog-prose ol { padding-left: 1.5em; margin-bottom: 1.5em; color: #374151; }
          .blog-prose li { margin-bottom: 0.45em; }
          .blog-prose blockquote {
            border-left: 4px solid #1e40af;
            padding-left: 1.25em;
            margin: 2em 0;
            color: #4b5563;
            font-style: italic;
          }
          .blog-prose code {
            background: #dbeafe;
            color: #1e40af;
            border-radius: 5px;
            padding: 2px 7px;
            font-size: 0.88em;
          }
          .blog-prose pre {
            background: #1e293b;
            color: #e2e8f0;
            border-radius: 12px;
            padding: 1.5em;
            overflow-x: auto;
            margin: 2em 0;
            font-size: 0.9em;
          }
          .blog-prose img {
            border-radius: 14px;
            margin: 2em 0;
            width: 20%;
            height: 20%;
          }
          .blog-prose hr {
            border-color: #dbeafe;
            margin: 2.5em 0;
          }
          .blog-prose strong { color: #1e293b; }

          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: #eaf1fb; }
          ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-2">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 text-[#1d4ed8] hover:text-[#1e40af] text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </motion.button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-10">
          {post.tags?.length > 0 && (
            <Reveal>
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-[#dbeafe] text-[#1d4ed8] text-xs font-600 border border-[#bfdbfe]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f2d6b] leading-tight mb-5">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-slate-500 text-sm mb-6">
              Published by <span className="font-medium text-slate-600">{post.author}</span>
              {post.category && (
                <> &bull; <span className="font-medium text-slate-600">{post.category}</span></>
              )}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400 mb-8">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {estimatedReadTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={13} />
                {(post.views || 0).toLocaleString()} views
              </span>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-1.5 text-[#1d4ed8] hover:text-[#1e40af] font-medium transition-colors text-xs border border-[#bfdbfe] px-3 py-1.5 rounded-full hover:bg-[#dbeafe]"
              >
                Share
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="w-full rounded-2xl overflow-hidden shadow-md mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
                style={{ maxHeight: "520px" }}
                loading="eager"
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <article className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 my-12">
              <div className="h-px flex-1 bg-[#dbeafe]" />
              <div className="w-2 h-2 rounded-full bg-[#1e40af]" />
              <div className="h-px flex-1 bg-[#dbeafe]" />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm p-6 flex flex-col sm:flex-row items-start gap-5">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#1e40af] flex items-center justify-center text-white text-2xl font-bold shadow">
                {post.author?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-semibold">
                  Written by
                </p>
                <h3 className="text-lg font-bold text-[#0f2d6b] mb-1">{post.author}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Expert in technology and software development, crafting insightful content that
                  helps developers and enthusiasts navigate the ever-evolving tech landscape.
                </p>
                <p className="text-xs text-[#1d4ed8] mt-3 font-medium">
                  vasundhara.construction30@gmail.com
                </p>
              </div>
            </div>
          </Reveal>

          <div className="pb-20" />
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scrollTop"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-[#1e40af] hover:bg-[#1d4ed8] text-white shadow-xl flex items-center justify-center transition-colors"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {copied && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#0f2d6b] text-white text-sm font-semibold shadow-xl"
            >
              Link copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BlogDetailPage;
