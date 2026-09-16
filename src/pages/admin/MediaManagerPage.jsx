import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Trash2, Copy, Check } from 'lucide-react';
export const MediaManagerPage = () => {
    const { media, addMedia, deleteMedia } = useClinic();
    const [copiedId, setCopiedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');
    const handleCopy = (id, textUrl) => {
        navigator.clipboard.writeText(textUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name || !url)
            return;
        await addMedia({
            name,
            url,
            alt: alt || name,
            size: '280 KB',
            type: 'image/jpeg',
        });
        setIsModalOpen(false);
        setName('');
        setUrl('');
        setAlt('');
    };
    const handleDelete = async (id, itemName) => {
        if (window.confirm(`Delete image ${itemName}?`)) {
            await deleteMedia(id);
        }
    };
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Media Library</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Upload, preview, and copy image links for doctor profiles, services, and blogs.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto">
          <Plus className="w-4 h-4"/>
          <span>Add Media Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {media.map((item) => (<div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <img src={item.url} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="font-bold text-xs text-slate-900 truncate" title={item.name}>
                {item.name}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>{item.size || 'Web'}</span>
                <span>{item.createdAt}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button onClick={() => handleCopy(item.id, item.url)} className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors ${copiedId === item.id ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-50 text-[#0E5D94] hover:bg-sky-100'}`}>
                  {copiedId === item.id ? (<>
                      <Check className="w-3 h-3"/>
                      <span>Copied!</span>
                    </>) : (<>
                      <Copy className="w-3 h-3"/>
                      <span>Copy URL</span>
                    </>)}
                </button>

                <button onClick={() => handleDelete(item.id, item.name)} className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5"/>
                </button>
              </div>
            </div>
          </div>))}
      </div>

      {isModalOpen && (<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Image Asset</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Filename *</label>
                <input type="text" required placeholder="e.g. embryo-transfer-room.jpg" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL or Path *</label>
                <input type="text" required placeholder="/images/... or https://..." value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alt Text Description</label>
                <input type="text" placeholder="Short descriptive caption" value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"/>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-white bg-[#0E5D94] hover:bg-[#0a4975] font-bold">
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
