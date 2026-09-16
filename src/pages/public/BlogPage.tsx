import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Search, ArrowRight, BookOpen, Clock, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogs } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'IVF & Treatments',
    'Embryology Insights',
    'Female Fertility',
    'Male Fertility',
    'Fertility Preservation',
    'Lifestyle & Wellness',
    'Reproductive Genetics'
  ];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            Clinical Insights &amp; Patient Education
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Fertility Knowledge &amp; Guidance
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Stay informed with verified medical articles written by our reproductive endocrinologists and senior clinical embryologists.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-80 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles by topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0E5D94] text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((b) => (
            <article
              key={b.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-sky-200"
            >
              <div>
                <div className="h-52 overflow-hidden relative bg-slate-100">
                  <img
                    src={b.featuredImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0E5D94] text-xs font-bold text-white shadow-xs">
                    {b.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-2 font-medium">
                    <span>{b.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E83E8C]" />
                      {b.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0E5D94] transition-colors line-clamp-2 mb-3">
                    {b.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {b.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 truncate max-w-[160px]">
                  {b.author}
                </span>

                <Link
                  to={`/blog/${b.slug}`}
                  className="font-bold text-[#E83E8C] group-hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
