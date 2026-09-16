import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
export const TestimonialsManagerPage = () => {
    const { testimonials, saveTestimonial, deleteTestimonial } = useClinic();
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenAdd = () => {
        setEditingItem({
            patientName: '',
            treatment: 'IVF with Blastocyst Transfer',
            location: 'New Delhi',
            testimonial: '',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
            rating: 5,
            journeyYears: 'Parenthood Journey',
            published: true,
            displayOrder: testimonials.length + 1,
        });
        setIsModalOpen(true);
    };
    const handleOpenEdit = (t) => {
        setEditingItem({ ...t });
        setIsModalOpen(true);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        if (!editingItem || !editingItem.patientName)
            return;
        await saveTestimonial(editingItem);
        setIsModalOpen(false);
        setEditingItem(null);
    };
    const handleDelete = async (id, name) => {
        if (window.confirm(`Delete review from ${name}?`)) {
            await deleteTestimonial(id);
        }
    };
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Patient Testimonials CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Moderate and curate authentic patient parenthood reviews and ratings.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto">
          <Plus className="w-4 h-4"/>
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (<div key={t.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-amber-400"/>))}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {t.published ? 'Approved' : 'Hidden'}
                </span>
              </div>

              <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                &ldquo;{t.testimonial}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img src={t.image} alt={t.patientName} className="w-8 h-8 rounded-full object-cover border"/>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{t.patientName}</div>
                  <div className="text-[10px] text-slate-400">{t.treatment}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded-lg bg-sky-50 text-[#0E5D94] hover:bg-sky-100 font-bold">
                  <Edit2 className="w-3.5 h-3.5"/>
                </button>
                <button onClick={() => handleDelete(t.id, t.patientName)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>))}
      </div>

      {isModalOpen && editingItem && (<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingItem.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Couple Name *</label>
                <input type="text" required placeholder="e.g. Priya &amp; Gaurav Saxena" value={editingItem.patientName || ''} onChange={(e) => setEditingItem({ ...editingItem, patientName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Treatment Undergone</label>
                  <input type="text" value={editingItem.treatment || ''} onChange={(e) => setEditingItem({ ...editingItem, treatment: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input type="text" value={editingItem.location || ''} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Parenthood Testimonial Story *</label>
                <textarea rows={4} required value={editingItem.testimonial || ''} onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={editingItem.rating || 5} onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Photo URL</label>
                  <input type="text" value={editingItem.image || ''} onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-white bg-[#0E5D94] hover:bg-[#0a4975] font-bold">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
