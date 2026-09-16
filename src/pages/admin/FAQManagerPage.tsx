import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { FAQ } from '../../types';
import { Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';

export const FAQManagerPage: React.FC = () => {
  const { faqs, saveFAQ, deleteFAQ } = useClinic();
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingFaq({
      question: '',
      answer: '',
      category: 'General IVF',
      published: true,
      displayOrder: faqs.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: FAQ) => {
    setEditingFaq({ ...f });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question || !editingFaq.answer) return;

    await saveFAQ(editingFaq);
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleDelete = async (id: string, q: string) => {
    if (window.confirm(`Delete question: "${q}"?`)) {
      await deleteFAQ(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">FAQ Management</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Edit clinical questions and answers displayed across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex items-start justify-between gap-4 hover:border-sky-200 transition-all"
          >
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-bold text-[#0E5D94] px-2.5 py-0.5 rounded-md bg-sky-50 uppercase tracking-wider">
                {faq.category}
              </span>
              <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-1.5 rounded-lg bg-sky-50 text-[#0E5D94] hover:bg-sky-100 font-bold"
                title="Edit FAQ"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(faq.id, faq.question)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                title="Delete FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingFaq.id ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={editingFaq.category || 'General IVF'}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none bg-white"
                >
                  <option value="General IVF">General IVF</option>
                  <option value="Procedures">Procedures</option>
                  <option value="Success &amp; Rates">Success &amp; Rates</option>
                  <option value="Costs &amp; Financials">Costs &amp; Financials</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is the difference between IUI and IVF?"
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Medical Answer *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain clearly in simple, reassuring language..."
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-[#0E5D94] hover:bg-[#0a4975] font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
