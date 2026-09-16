import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Doctor } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Stethoscope, Search } from 'lucide-react';

export const DoctorsManagerPage: React.FC = () => {
  const { doctors, saveDoctor, deleteDoctor } = useClinic();
  const [editingDoctor, setEditingDoctor] = useState<Partial<Doctor> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenAdd = () => {
    setEditingDoctor({
      name: '',
      slug: '',
      designation: '',
      qualification: '',
      experience: '10+ Years Experience',
      specialization: ['Infertility', 'IVF'],
      shortBio: '',
      fullBio: '',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      published: true,
      featured: false,
      consultingDays: 'Mon - Fri',
      consultingHours: '10:00 AM - 03:00 PM',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc: Doctor) => {
    setEditingDoctor({ ...doc });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor || !editingDoctor.name) return;

    const slug = editingDoctor.slug || editingDoctor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await saveDoctor({
      ...editingDoctor,
      slug,
    });

    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from doctors list?`)) {
      await deleteDoctor(id);
    }
  };

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Doctors Management</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Add, update profile details, and manage publishing for clinical specialists.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctors by name or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">{filtered.length} Doctors Listed</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {doc.published ? 'Active' : 'Draft'}
                  </span>
                </div>
                <div className="text-xs text-[#E83E8C] font-semibold truncate mt-0.5">{doc.designation}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{doc.experience}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {doc.shortBio}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
                {doc.consultingDays}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(doc)}
                  className="px-3 py-1 rounded-lg bg-sky-50 text-[#0E5D94] hover:bg-sky-100 font-bold transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(doc.id, doc.name)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Doctor Modal */}
      {isModalOpen && editingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingDoctor.id ? 'Edit Doctor Profile' : 'Add New Doctor'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Radhika Sharma"
                    value={editingDoctor.name || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Medical Director & Senior Infertility Specialist"
                    value={editingDoctor.designation || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, designation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Qualification *</label>
                  <input
                    type="text"
                    required
                    placeholder="MBBS, MS (OBGYN), Fellowship in ART"
                    value={editingDoctor.qualification || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, qualification: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Years of Experience *</label>
                  <input
                    type="text"
                    placeholder="18+ Years Experience"
                    value={editingDoctor.experience || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editingDoctor.image || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consulting Days</label>
                  <input
                    type="text"
                    placeholder="Mon, Tue, Thu, Sat"
                    value={editingDoctor.consultingDays || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, consultingDays: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consulting Hours</label>
                  <input
                    type="text"
                    placeholder="09:00 AM - 03:00 PM"
                    value={editingDoctor.consultingHours || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, consultingHours: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={editingDoctor.shortBio || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, shortBio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Clinical Bio</label>
                <textarea
                  rows={4}
                  value={editingDoctor.fullBio || ''}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, fullBio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingDoctor.published}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, published: e.target.checked })}
                    className="rounded text-[#0E5D94]"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors"
                >
                  Save Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
