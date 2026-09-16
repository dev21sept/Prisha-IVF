import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
export const ServicesManagerPage = () => {
    const { services, saveService, deleteService } = useClinic();
    const [editingService, setEditingService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [benefitsText, setBenefitsText] = useState('');
    const handleOpenAdd = () => {
        setEditingService({
            name: '',
            slug: '',
            category: 'Core ART',
            shortDescription: '',
            fullDescription: '',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
            icon: 'Microscope',
            benefits: [],
            process: [],
            faqs: [],
            seoTitle: '',
            seoDescription: '',
            status: 'active',
            displayOrder: services.length + 1,
        });
        setBenefitsText('');
        setIsModalOpen(true);
    };
    const handleOpenEdit = (srv) => {
        setEditingService({ ...srv });
        setBenefitsText((srv.benefits || []).join('\n'));
        setIsModalOpen(true);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        if (!editingService || !editingService.name)
            return;
        const slug = editingService.slug || editingService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const benefits = benefitsText.split('\n').map((b) => b.trim()).filter(Boolean);
        await saveService({
            ...editingService,
            slug,
            benefits,
        });
        setIsModalOpen(false);
        setEditingService(null);
    };
    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            await deleteService(id);
        }
    };
    const filtered = services.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Treatments &amp; Services CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create, edit clinical procedure protocols, and update public service pages.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto">
          <Plus className="w-4 h-4"/>
          <span>Add New Treatment</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
          <Search className="w-4 h-4 text-slate-400"/>
          <input type="text" placeholder="Search treatments by name or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"/>
        </div>
        <div className="text-xs text-slate-500 font-semibold">{filtered.length} Services Listed</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((srv) => (<div key={srv.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-xs font-bold text-[#0E5D94]">
                  {srv.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${srv.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {srv.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{srv.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                {srv.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">/{srv.slug}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(srv)} className="px-3 py-1 rounded-lg bg-sky-50 text-[#0E5D94] hover:bg-sky-100 font-bold transition-colors flex items-center gap-1">
                  <Edit2 className="w-3.5 h-3.5"/>
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(srv.id, srv.name)} className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>))}
      </div>

      {/* Edit / Add Service Modal */}
      {isModalOpen && editingService && (<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingService.id ? 'Edit Treatment Details' : 'Add New Treatment'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Treatment Name *</label>
                  <input type="text" required value={editingService.name || ''} onChange={(e) => setEditingService({ ...editingService, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select value={editingService.category || 'Core ART'} onChange={(e) => setEditingService({ ...editingService, category: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none bg-white">
                    <option value="Core ART">Core ART</option>
                    <option value="Advanced Embryology">Advanced Embryology</option>
                    <option value="Fertility Preservation">Fertility Preservation</option>
                    <option value="Reproductive Genetics">Reproductive Genetics</option>
                    <option value="Fertility Surgery">Fertility Surgery</option>
                    <option value="Male Fertility">Male Fertility</option>
                    <option value="Female Fertility">Female Fertility</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Image URL</label>
                <input type="text" value={editingService.image || ''} onChange={(e) => setEditingService({ ...editingService, image: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (Card snippet)</label>
                <textarea rows={2} value={editingService.shortDescription || ''} onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Clinical Description</label>
                <textarea rows={4} value={editingService.fullDescription || ''} onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Benefits (One benefit per line)</label>
                <textarea rows={3} value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} placeholder="Highest cumulative pregnancy rates&#10;Class 10,000 cleanroom culture&#10;Enables Day 5 blastocyst selection" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-xl font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors">
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
