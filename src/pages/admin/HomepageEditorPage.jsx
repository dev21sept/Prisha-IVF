import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Save, CheckCircle, Sparkles } from 'lucide-react';
export const HomepageEditorPage = () => {
    const { homepage, updateHomepage } = useClinic();
    const [form, setForm] = useState({ ...homepage });
    const [saving, setSaving] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSavedSuccess(false);
        await updateHomepage(form);
        setSaving(false);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    };
    return (<div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Homepage Content CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Customize headlines, statistics counters, and promotional banners live on the homepage.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={saving} className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-md transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50">
          <Save className="w-4 h-4 text-[#E83E8C]"/>
          <span>{saving ? 'Publishing Updates...' : 'Publish Homepage Changes'}</span>
        </button>
      </div>

      {savedSuccess && (<div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0"/>
          <span>Homepage updates published successfully to live website!</span>
        </div>)}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* Section 1: Hero Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-[#E83E8C]"/>
            1. Hero Section Content
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Pill Badge</label>
              <input type="text" value={form.heroBadge || ''} onChange={(e) => setForm({ ...form, heroBadge: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Main Headline *</label>
              <input type="text" required value={form.heroHeading || ''} onChange={(e) => setForm({ ...form, heroHeading: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none text-sm font-semibold"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Supporting Description *</label>
              <textarea rows={3} required value={form.heroSubheading || ''} onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none leading-relaxed"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
              <input type="text" value={form.heroImageUrl || ''} onChange={(e) => setForm({ ...form, heroImageUrl: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Trust Statistics */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            2. Trust Statistics Counters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 space-y-2">
              <label className="block font-bold text-slate-700">Counter 1</label>
              <input type="text" value={form.stat1Value || ''} onChange={(e) => setForm({ ...form, stat1Value: e.target.value })} placeholder="12,500+" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-extrabold text-[#0E5D94]"/>
              <input type="text" value={form.stat1Label || ''} onChange={(e) => setForm({ ...form, stat1Label: e.target.value })} placeholder="Parenthood Deliveries" className="w-full p-2 rounded-lg border border-slate-200 text-[11px]"/>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 space-y-2">
              <label className="block font-bold text-slate-700">Counter 2</label>
              <input type="text" value={form.stat2Value || ''} onChange={(e) => setForm({ ...form, stat2Value: e.target.value })} placeholder="78.4%" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-extrabold text-[#E83E8C]"/>
              <input type="text" value={form.stat2Label || ''} onChange={(e) => setForm({ ...form, stat2Label: e.target.value })} placeholder="Cumulative Success" className="w-full p-2 rounded-lg border border-slate-200 text-[11px]"/>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 space-y-2">
              <label className="block font-bold text-slate-700">Counter 3</label>
              <input type="text" value={form.stat3Value || ''} onChange={(e) => setForm({ ...form, stat3Value: e.target.value })} placeholder="22+" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-extrabold text-[#0E5D94]"/>
              <input type="text" value={form.stat3Label || ''} onChange={(e) => setForm({ ...form, stat3Label: e.target.value })} placeholder="Years Experience" className="w-full p-2 rounded-lg border border-slate-200 text-[11px]"/>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 space-y-2">
              <label className="block font-bold text-slate-700">Counter 4</label>
              <input type="text" value={form.stat4Value || ''} onChange={(e) => setForm({ ...form, stat4Value: e.target.value })} placeholder="100%" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-extrabold text-[#E83E8C]"/>
              <input type="text" value={form.stat4Label || ''} onChange={(e) => setForm({ ...form, stat4Label: e.target.value })} placeholder="ICMR Compliant" className="w-full p-2 rounded-lg border border-slate-200 text-[11px]"/>
            </div>
          </div>
        </div>

        {/* Section 3: About Prisha IVF Section Copy */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            3. About Section Highlights
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">About Section Heading</label>
              <input type="text" value={form.aboutHeading || ''} onChange={(e) => setForm({ ...form, aboutHeading: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">About Paragraph</label>
              <textarea rows={3} value={form.aboutDescription || ''} onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none leading-relaxed"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">About Feature Image URL</label>
              <input type="text" value={form.aboutImageUrl || ''} onChange={(e) => setForm({ ...form, aboutImageUrl: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>
          </div>
        </div>

        {/* Section 4: CTA Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            4. Appointment CTA Banner
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">CTA Heading</label>
              <input type="text" value={form.ctaHeading || ''} onChange={(e) => setForm({ ...form, ctaHeading: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">CTA Supporting Description</label>
              <input type="text" value={form.ctaDescription || ''} onChange={(e) => setForm({ ...form, ctaDescription: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-md transition-all disabled:opacity-50">
            {saving ? 'Saving...' : 'Save All Homepage Content'}
          </button>
        </div>
      </form>
    </div>);
};
