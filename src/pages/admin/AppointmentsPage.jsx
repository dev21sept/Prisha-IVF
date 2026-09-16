import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Search, Calendar, Trash2, Eye } from 'lucide-react';
export const AppointmentsPage = () => {
    const { appointments, updateAppointmentStatus, deleteAppointment } = useClinic();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedApt, setSelectedApt] = useState(null);
    const [adminNotes, setAdminNotes] = useState('');
    const statuses = ['All', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];
    const filteredAppointments = appointments.filter((a) => {
        const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
        const matchesSearch = a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.mobileNumber.includes(searchQuery) ||
            a.appointmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });
    const getStatusBadge = (status) => {
        switch (status) {
            case 'New':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Contacted':
                return 'bg-sky-100 text-sky-800 border-sky-200';
            case 'Confirmed':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };
    const handleOpenModal = (apt) => {
        setSelectedApt(apt);
        setAdminNotes(apt.adminNotes || '');
    };
    const handleSaveNotes = async () => {
        if (!selectedApt)
            return;
        await updateAppointmentStatus(selectedApt.id, selectedApt.status, adminNotes);
        setSelectedApt({ ...selectedApt, adminNotes });
        alert('Admin notes updated successfully.');
    };
    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete appointment for ${name}?`)) {
            await deleteAppointment(id);
            if (selectedApt?.id === id)
                setSelectedApt(null);
        }
    };
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Appointments Management</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            View, filter, confirm, and update patient consultation requests.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-80 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#0E5D94] transition-colors">
          <Search className="w-4 h-4 text-slate-400"/>
          <input type="text" placeholder="Search patient, phone, ID, doctor..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"/>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {statuses.map((st) => (<button key={st} onClick={() => setStatusFilter(st)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${statusFilter === st
                ? 'bg-[#0E5D94] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
              {st}
            </button>))}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Appt ID &amp; Date</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Phone / Contact</th>
                <th className="p-4">Doctor &amp; Service</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((apt) => (<tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#0E5D94]">{apt.appointmentId}</div>
                    <div className="text-[11px] text-slate-500 font-semibold">{apt.preferredDate}</div>
                    <div className="text-[10px] text-slate-400">{apt.preferredTime}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{apt.fullName}</div>
                    <div className="text-[11px] text-slate-400">{apt.city || 'City not specified'}</div>
                  </td>

                  <td className="p-4 font-medium">
                    <div className="text-slate-900">{apt.mobileNumber}</div>
                    <div className="text-[10px] text-slate-400">{apt.email}</div>
                    <div className="text-[10px] text-[#E83E8C] capitalize mt-0.5 font-semibold">Pref: {apt.preferredContactMethod || 'phone'}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{apt.doctorName}</div>
                    <div className="text-[11px] text-[#0E5D94] font-medium">{apt.serviceName}</div>
                  </td>

                  <td className="p-4">
                    <select value={apt.status} onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)} className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${getStatusBadge(apt.status)}`}>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(apt)} className="p-1.5 text-slate-500 hover:text-[#0E5D94] hover:bg-sky-50 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4"/>
                    </button>
                    <button onClick={() => handleDelete(apt.id, apt.fullName)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Record">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (<div className="text-center py-16">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2"/>
            <p className="text-sm font-semibold text-slate-700">No appointments found matching your filter.</p>
          </div>)}
      </div>

      {/* Appointment Detail Modal */}
      {selectedApt && (<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0E5D94] uppercase tracking-wider block">
                  {selectedApt.appointmentId}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedApt.fullName}</h3>
              </div>
              <button onClick={() => setSelectedApt(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block font-medium">Mobile Number:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedApt.mobileNumber}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block font-medium">Email:</span>
                <span className="font-bold text-slate-900 text-sm truncate block">{selectedApt.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block font-medium">Date &amp; Time:</span>
                <span className="font-bold text-slate-900">{selectedApt.preferredDate} ({selectedApt.preferredTime})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block font-medium">City:</span>
                <span className="font-bold text-slate-900">{selectedApt.city || 'N/A'}</span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="text-slate-400 font-medium">Requested Doctor &amp; Service:</span>
              <div className="font-bold text-slate-800">{selectedApt.doctorName} — {selectedApt.serviceName}</div>
            </div>

            {selectedApt.message && (<div className="p-4 rounded-xl bg-sky-50 text-xs text-slate-700 border border-sky-100 space-y-1">
                <span className="font-bold text-[#0E5D94] block">Patient Message / Medical Notes:</span>
                <p className="leading-relaxed">{selectedApt.message}</p>
              </div>)}

            {/* Admin Notes Box */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">Internal Clinic Coordination Notes</label>
              <textarea rows={3} placeholder="e.g. Called on 17 Sep. Confirmed 10:30 AM slot. Patient instructed to bring past semen reports." value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0E5D94] outline-none"/>
              <div className="flex justify-end">
                <button onClick={handleSaveNotes} className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors">
                  Save Internal Notes
                </button>
              </div>
            </div>
          </div>
        </div>)}
    </div>);
};
