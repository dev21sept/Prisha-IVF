import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Microscope, ArrowRight, Check, Search, ShieldCheck } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Core ART', 'Advanced Embryology', 'Fertility Preservation', 'Fertility Surgery', 'Male Fertility', 'Diagnostics'];

  const filteredServices = services.filter((srv) => {
    const matchesCat = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            Our Treatments &amp; Procedures
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Reproductive Medicine Solutions
          </h1>
          <p className="text-slate-600 text-base">
            From gentle first-line fertility treatments to state-of-the-art micromanipulation and genetic screening, our certified cleanroom laboratories provide end-to-end clinical care.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-100">
          <div className="flex items-center gap-2 w-full sm:w-80 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search treatment (e.g. ICSI, Freezing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0E5D94] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((srv) => (
            <div
              key={srv.slug}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-sky-200"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-[#0E5D94] shadow-xs">
                    {srv.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0E5D94] transition-colors mb-2">
                    {srv.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                    {srv.shortDescription}
                  </p>

                  <div className="space-y-1.5 mb-2 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900 mb-1">Key Advantages:</div>
                    {srv.benefits.slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E83E8C] shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/services/${srv.slug}`}
                  className="text-xs font-bold text-[#0E5D94] group-hover:text-[#E83E8C] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Procedure Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={`/appointment?service=${encodeURIComponent(srv.name)}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-[#0E5D94] hover:bg-[#0E5D94] hover:text-white transition-colors"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <Microscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching treatments found</h3>
            <p className="text-xs text-slate-500">Try changing your search keywords or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
