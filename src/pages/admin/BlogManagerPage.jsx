import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
export const BlogManagerPage = () => {
    const { blogs, saveBlog, deleteBlog } = useClinic();
    const [editingBlog, setEditingBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tagsText, setTagsText] = useState('');
    const handleOpenAdd = () => {
        setEditingBlog({
            title: '',
            slug: '',
            category: 'IVF & Treatments',
            author: 'Dr. Radhika Sharma',
            authorRole: 'Medical Director, Prisha IVF',
            featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
            shortDescription: '',
            content: '',
            readTime: '5 min read',
            published: true,
            featured: false,
        });
        setTagsText('');
        setIsModalOpen(true);
    };
    const handleOpenEdit = (b) => {
        setEditingBlog({ ...b });
        setTagsText((b.tags || []).join(', '));
        setIsModalOpen(true);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        if (!editingBlog || !editingBlog.title)
            return;
        const slug = editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const tags = tagsText.split(',').map((t) => t.trim()).filter(Boolean);
        await saveBlog({
            ...editingBlog,
            slug,
            tags,
        });
        setIsModalOpen(false);
        setEditingBlog(null);
    };
    const handleDelete = async (id, title) => {
        if (window.confirm(`Delete article "${title}"?`)) {
            await deleteBlog(id);
        }
    };
    const filtered = blogs.filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Blog &amp; Articles Management</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish educational articles and reproductive health guides for patients.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto">
          <Plus className="w-4 h-4"/>
          <span>Write New Article</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full max-w-md px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
          <Search className="w-4 h-4 text-slate-400"/>
          <input type="text" placeholder="Search articles by title or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"/>
        </div>
        <div className="text-xs text-slate-500 font-semibold">{filtered.length} Articles</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (<div key={b.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-xs font-bold text-[#0E5D94]">
                  {b.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {b.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base line-clamp-2">{b.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                {b.shortDescription}
              </p>
              <div className="text-[11px] text-slate-400 mt-2">By {b.author} • {b.readTime}</div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">/{b.slug}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(b)} className="px-3 py-1 rounded-lg bg-sky-50 text-[#0E5D94] hover:bg-sky-100 font-bold transition-colors flex items-center gap-1">
                  <Edit2 className="w-3.5 h-3.5"/>
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(b.id, b.title)} className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingBlog && (<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingBlog.id ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input type="text" required value={editingBlog.title || ''} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none text-sm font-semibold"/>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input type="text" value={editingBlog.category || 'IVF & Treatments'} onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                  <input type="text" value={editingBlog.author || ''} onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Featured Image URL</label>
                  <input type="text" value={editingBlog.featuredImage || ''} onChange={(e) => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reading Time</label>
                  <input type="text" placeholder="e.g. 5 min read" value={editingBlog.readTime || '5 min read'} onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt (Snippet)</label>
                <textarea rows={2} value={editingBlog.shortDescription || ''} onChange={(e) => setEditingBlog({ ...editingBlog, shortDescription: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Content (Markdown supported)</label>
                <textarea rows={8} required value={editingBlog.content || ''} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none font-mono"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                <input type="text" placeholder="IVF, Embryology, Blastocyst, Implantation" value={tagsText} onChange={(e) => setTagsText(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              </div>

              <div className="pt-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" checked={editingBlog.published} onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })} className="rounded text-[#0E5D94]"/>
                  <span>Publish Article to Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-xl font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
