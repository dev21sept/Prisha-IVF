import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  Share2,
  Tag,
  ShieldCheck
} from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useClinic();

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0E5D94]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-[#0E5D94]">Articles</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{blog.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            {blog.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <User className="w-4 h-4 text-[#0E5D94]" />
              <span>{blog.author}</span>
              <span className="font-normal text-slate-500">({blog.authorRole})</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E83E8C]" />
              <span>{blog.publishDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0E5D94]" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-72 sm:h-96">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <div key={index} className="pl-4 space-y-1.5 text-slate-700 text-sm">
                  {paragraph.split('\n').map((li, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#E83E8C] font-bold">•</span>
                      <span>{li.replace(/^[0-9]+\.\s+|^-\s+/, '')}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <p key={index} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            );
          })}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {blog.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Author Bio Box */}
        <div className="bg-sky-50/60 rounded-2xl p-6 border border-sky-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0E5D94] text-white flex items-center justify-center font-bold text-lg shrink-0">
            {blog.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{blog.author}</h4>
            <div className="text-xs text-[#E83E8C] font-semibold">{blog.authorRole}</div>
            <p className="text-xs text-slate-500 mt-1">
              Dedicated to clinical research, patient transparency, and advancing evidence-based reproductive medicine at Prisha IVF.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="space-y-6 pt-6">
          <h3 className="text-2xl font-bold text-slate-900">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedBlogs.map((rb) => (
              <Link
                key={rb.id}
                to={`/blog/${rb.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all group p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] text-[#E83E8C] font-bold uppercase">{rb.category}</div>
                  <h4 className="font-bold text-slate-800 text-xs mt-1 group-hover:text-[#0E5D94] line-clamp-2">
                    {rb.title}
                  </h4>
                </div>
                <div className="text-[11px] text-slate-400 mt-3">{rb.readTime}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0E5D94] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
