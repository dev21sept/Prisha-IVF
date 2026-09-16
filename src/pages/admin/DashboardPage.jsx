import React from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Calendar, Mail, Stethoscope, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
export const DashboardPage = () => {
    const { appointments, contacts, doctors, services, blogs, updateAppointmentStatus } = useClinic();
    const totalAppointments = appointments.length;
    const newAppointments = appointments.filter((a) => a.status === 'New').length;
    const confirmedAppointments = appointments.filter((a) => a.status === 'Confirmed').length;
    const unreadContacts = contacts.filter((c) => c.status === 'Unread').length;
    const recentAppointments = appointments.slice(0, 5);
    const recentContacts = contacts.slice(0, 4);
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
    return (<div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Clinic Overview &amp; Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time appointment requests, patient queries, and clinical website controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/appointments" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] shadow-xs transition-colors flex items-center gap-1.5">
            <Calendar className="w-4 h-4"/>
            <span>Manage All Bookings</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0E5D94] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4"/>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalAppointments}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5"/> {newAppointments} Pending Action
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmed Slots</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-4 h-4"/>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{confirmedAppointments}</div>
          <div className="text-[11px] text-slate-500">Scheduled consultations</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#E83E8C] flex items-center justify-center font-bold">
              <Mail className="w-4 h-4"/>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{contacts.length}</div>
          <div className="text-[11px] text-[#E83E8C] font-semibold">
            {unreadContacts} Unread Inquiries
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Faculty</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Stethoscope className="w-4 h-4"/>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{doctors.length}</div>
          <div className="text-[11px] text-slate-500">{services.length} Core Treatments Live</div>
        </div>
      </div>

      {/* Recent Appointments & Messages Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Appointment Bookings</h2>
              <p className="text-xs text-slate-500">Latest online requests from patients</p>
            </div>
            <Link to="/admin/appointments" className="text-xs font-bold text-[#0E5D94] hover:underline flex items-center gap-1">
              <span>View All ({appointments.length})</span>
              <ArrowRight className="w-3.5 h-3.5"/>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">ID / Patient</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Date &amp; Slot</th>
                  <th className="p-3.5">Doctor</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.map((apt) => (<tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{apt.fullName}</div>
                      <div className="text-[10px] font-mono text-[#0E5D94]">{apt.appointmentId}</div>
                    </td>
                    <td className="p-3.5 font-medium">
                      <div>{apt.mobileNumber}</div>
                      <div className="text-[10px] text-slate-400">{apt.city || 'N/A'}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{apt.preferredDate}</div>
                      <div className="text-[10px] text-slate-500">{apt.preferredTime}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700">
                      {apt.doctorName.split(' ')[1] || apt.doctorName}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <select value={apt.status} onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)} className="text-[11px] font-semibold border border-slate-200 rounded-lg p-1 bg-white focus:border-[#0E5D94] outline-none">
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contact Enquiries */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Enquiries</h2>
                <p className="text-xs text-slate-500">Contact form messages</p>
              </div>
              <Link to="/admin/contacts" className="text-xs font-bold text-[#E83E8C] hover:underline">
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentContacts.map((c) => (<div key={c.id} className="p-4 hover:bg-slate-50 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-slate-900">{c.name}</div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'Unread' ? 'bg-pink-100 text-[#E83E8C]' : 'bg-slate-100 text-slate-600'}`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#0E5D94] line-clamp-1">{c.subject}</div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{c.message}</p>
                  <div className="text-[10px] text-slate-400">{c.phone}</div>
                </div>))}
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Link to="/admin/contacts" className="w-full block text-center py-2 text-xs font-bold text-[#0E5D94] hover:underline">
              Open Contact Inbox →
            </Link>
          </div>
        </div>
      </div>
    </div>);
};
