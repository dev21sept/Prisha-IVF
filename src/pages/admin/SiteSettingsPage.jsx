import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Save, CheckCircle, Globe, Phone, MapPin } from 'lucide-react';
export const SiteSettingsPage = () => {
    const { settings, updateSettings } = useClinic();
    const [form, setForm] = useState({ ...settings });
    const [saving, setSaving] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSavedSuccess(false);
        await updateSettings(form);
        setSaving(false);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    };
    return (<div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Site Settings CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure clinic contact details, helpline numbers, address, and global brand text.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={saving} className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-md transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50">
          <Save className="w-4 h-4 text-[#E83E8C]"/>
          <span>{saving ? 'Updating Settings...' : 'Save Site Settings'}</span>
        </button>
      </div>

      {savedSuccess && (<div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0"/>
          <span>Site settings updated! All changes are live on the header, footer, and floating buttons.</span>
        </div>)}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* Basic Brand Identity */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-[#0E5D94]"/>
            1. Clinic Identity &amp; Branding
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Clinic Name</label>
              <input type="text" required value={form.clinicName || ''} onChange={(e) => setForm({ ...form, clinicName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Domain</label>
              <input type="text" value={form.domain || ''} onChange={(e) => setForm({ ...form, domain: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Tagline / Subtitle</label>
              <input type="text" value={form.tagline || ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>
          </div>
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-4 h-4 text-[#E83E8C]"/>
            2. Helplines, WhatsApp &amp; Email
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Main Phone / Helpline *</label>
              <input type="text" required value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Number *</label>
              <input type="text" value={form.whatsapp || ''} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+919898226201" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Emergency 24/7 Helpline</label>
              <input type="text" value={form.emergencyPhone || ''} onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div className="sm:col-span-3">
              <label className="block font-bold text-slate-700 mb-1">Patient Care Email *</label>
              <input type="email" required value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>
          </div>
        </div>

        {/* Location & Timings */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-[#0E5D94]"/>
            3. Clinic Location &amp; Consultation Hours
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Clinic Address *</label>
              <input type="text" required value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Google Maps Embed URL</label>
              <input type="text" value={form.googleMapsUrl || ''} onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Weekday Consultation Hours</label>
                <input type="text" value={form.openingHours || ''} onChange={(e) => setForm({ ...form, openingHours: e.target.value })} placeholder="Mon - Sat: 08:30 AM - 08:00 PM" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sunday Hours</label>
                <input type="text" value={form.sundayHours || ''} onChange={(e) => setForm({ ...form, sundayHours: e.target.value })} placeholder="10:00 AM - 02:00 PM (Emergency & Scheduled)" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>
            </div>
          </div>
        </div>

        {/* Footer & Copyright */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            4. Footer Text &amp; Copyright Notice
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Footer Mission Text</label>
              <textarea rows={2} value={form.footerText || ''} onChange={(e) => setForm({ ...form, footerText: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Copyright Line</label>
              <input type="text" value={form.copyrightText || ''} onChange={(e) => setForm({ ...form, copyrightText: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-md transition-all disabled:opacity-50">
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>);
};
