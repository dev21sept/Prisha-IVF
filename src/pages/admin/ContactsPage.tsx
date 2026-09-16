import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ContactMessage } from '../../types';
import {
  Search,
  Mail,
  Phone,
  User,
  Trash2,
  Eye,
  CheckCircle,
  Archive,
  MessageSquare
} from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { contacts, updateContactStatus, deleteContact } = useClinic();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [replyNotes, setReplyNotes] = useState('');

  const statuses = ['All', 'Unread', 'Read', 'Replied', 'Archived'];

  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Unread':
        return 'bg-pink-100 text-[#E83E8C] border-pink-200';
      case 'Read':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Replied':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Archived':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleOpen = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    setReplyNotes(msg.replyNotes || '');
    if (msg.status === 'Unread') {
      updateContactStatus(msg.id, 'Read');
    }
  };

  const handleSaveReply = async () => {
    if (!selectedMsg) return;
    await updateContactStatus(selectedMsg.id, 'Replied', replyNotes);
    setSelectedMsg({ ...selectedMsg, status: 'Replied', replyNotes });
    alert('Reply log saved successfully.');
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete message from ${name}?`)) {
      await deleteContact(id);
      if (selectedMsg?.id === id) setSelectedMsg(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Contact Enquiries</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Messages and treatment inquiries submitted via the public contact form.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-80 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiries by name, phone, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-[#0E5D94] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Sender</th>
                <th className="p-4">Phone / Email</th>
                <th className="p-4">Subject &amp; Snippet</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-900 text-sm">
                    {c.name}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{c.phone}</div>
                    <div className="text-[10px] text-slate-400">{c.email}</div>
                  </td>

                  <td className="p-4 max-w-xs">
                    <div className="font-bold text-slate-900 truncate">{c.subject}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{c.message}</div>
                  </td>

                  <td className="p-4 text-slate-500 text-[11px]">
                    {c.createdAt.split('T')[0]}
                  </td>

                  <td className="p-4">
                    <select
                      value={c.status}
                      onChange={(e) => updateContactStatus(c.id, e.target.value as any)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${getStatusBadge(
                        c.status
                      )}`}
                    >
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpen(c)}
                      className="p-1.5 text-slate-500 hover:text-[#0E5D94] hover:bg-sky-50 rounded-lg transition-colors"
                      title="Read Message"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-16">
            <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No contact messages found.</p>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#E83E8C] uppercase tracking-wider block">
                  Enquiry Details
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedMsg.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block font-medium">From:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMsg.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block font-medium">Phone:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMsg.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 col-span-2">
                <span className="text-slate-400 block font-medium">Email:</span>
                <span className="font-bold text-slate-900">{selectedMsg.email}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 text-xs text-slate-800 border border-sky-100 space-y-1">
              <span className="font-bold text-[#0E5D94] block">Message:</span>
              <p className="leading-relaxed whitespace-pre-line">{selectedMsg.message}</p>
            </div>

            {/* Reply / Internal Notes */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">Reply Notes / Action Taken</label>
              <textarea
                rows={3}
                placeholder="e.g. Called patient on phone and answered IVF package questions."
                value={replyNotes}
                onChange={(e) => setReplyNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveReply}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] transition-colors"
                >
                  Save Reply Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
