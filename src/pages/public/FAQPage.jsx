import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Minus, Search, HelpCircle, Phone, Calendar } from 'lucide-react';
export const FAQPage = () => {
    const { faqs, settings } = useClinic();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState(faqs[0]?.id || null);
    const categories = ['All', 'General IVF', 'Procedures', 'Success & Rates', 'Costs & Financials', 'Consultation'];
    const filteredFaqs = faqs.filter((f) => {
        const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
        const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });
    return (<div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            Patient Resources
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Clear, transparent answers to the most common questions regarding IVF protocols, laboratory cleanroom standards, costs, and success rates.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 space-y-3">
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
            <Search className="w-4 h-4 text-slate-400"/>
            <input type="text" placeholder="Search by topic, e.g., ICSI, pain, blastocyst, cost..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"/>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedCategory === cat
                ? 'bg-[#0E5D94] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                {cat}
              </button>))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (<div key={faq.id} className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs transition-all">
                <button onClick={() => setExpandedId(isOpen ? null : faq.id)} className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#0E5D94] transition-colors">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#E83E8C] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-800 block">
                      {faq.question}
                    </span>
                  </div>

                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#E83E8C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {isOpen ? <Minus className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                  </span>
                </button>

                {isOpen && (<div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>)}
              </div>);
        })}
        </div>

        {filteredFaqs.length === 0 && (<div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2"/>
            <p className="text-sm font-semibold text-slate-700">No questions matched your search criteria.</p>
          </div>)}

        {/* Still Have Questions Box */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900">Still have unanswered questions?</h3>
            <p className="text-xs text-slate-500">Our patient coordinators are happy to assist you anytime.</p>
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="px-5 py-2.5 rounded-full text-xs font-bold text-[#0E5D94] bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E83E8C]"/>
              <span>Call Helpline</span>
            </a>

            <Link to="/appointment" className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors flex items-center gap-1.5 shadow-xs">
              <Calendar className="w-3.5 h-3.5"/>
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>);
};
