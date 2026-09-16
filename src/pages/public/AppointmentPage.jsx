import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Calendar, User, CheckCircle, ShieldCheck, Check, AlertCircle } from 'lucide-react';
export const AppointmentPage = () => {
    const [searchParams] = useSearchParams();
    const { doctors, services, settings, bookAppointment } = useClinic();
    const preselectedService = searchParams.get('service') || '';
    const preselectedDoctor = searchParams.get('doctor') || '';
    // Form State
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('10:30 AM');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [city, setCity] = useState('');
    const [preferredContactMethod, setPreferredContactMethod] = useState('phone');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successAptId, setSuccessAptId] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    // Prepopulate if URL params present
    useEffect(() => {
        if (preselectedDoctor && doctors.length > 0) {
            const match = doctors.find((d) => d.name.toLowerCase() === preselectedDoctor.toLowerCase());
            if (match)
                setSelectedDoctorId(match.id);
        }
        if (preselectedService && services.length > 0) {
            const match = services.find((s) => s.name.toLowerCase().includes(preselectedService.toLowerCase()));
            if (match)
                setSelectedServiceId(match.id);
        }
    }, [preselectedDoctor, preselectedService, doctors, services]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        if (!fullName.trim() || !mobileNumber.trim() || !preferredDate) {
            setErrorMsg('Please enter your full name, mobile number, and preferred date.');
            return;
        }
        setLoading(true);
        const docObj = doctors.find((d) => d.id === selectedDoctorId);
        const srvObj = services.find((s) => s.id === selectedServiceId);
        try {
            const apt = await bookAppointment({
                fullName,
                mobileNumber,
                email: email.trim() || 'no-email@prishaivf.in',
                preferredDate,
                preferredTime,
                doctorId: docObj?.id || 'doc-any',
                doctorName: docObj?.name || 'Any Available Fertility Specialist',
                serviceId: srvObj?.id || 'srv-any',
                serviceName: srvObj?.name || 'General Fertility Consultation',
                city: city || 'New Delhi',
                preferredContactMethod,
                message: message.trim() || 'Consultation booking via Appointment page',
            });
            setSuccessAptId(apt.appointmentId);
        }
        catch {
            setErrorMsg('Could not submit appointment request. Please contact our helpline directly.');
        }
        finally {
            setLoading(false);
        }
    };
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDateStr = tomorrow.toISOString().split('T')[0];
    return (<div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-pink uppercase tracking-wider">
            Patient Consultation Request
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Book Your Fertility Consultation
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Take the first confident step toward parenthood. Fill out the request below, and our dedicated patient care desk will confirm your confidential appointment slot.
          </p>
        </div>

        {/* Success Card */}
        {successAptId ? (<div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl text-center space-y-6 animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-10 h-10"/>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Consultation Request Confirmed!</h2>
              <p className="text-sm text-slate-600">
                Thank you, <strong className="text-slate-900">{fullName}</strong>. Your appointment request has been logged in our clinic management system.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl max-w-md mx-auto space-y-2 text-left text-xs">
              <div className="flex justify-between items-center border-b border-sky-200/60 pb-2">
                <span className="text-slate-500">Appointment Reference ID:</span>
                <span className="font-extrabold text-[#0E5D94] text-sm">{successAptId}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Preferred Date &amp; Time:</span>
                <span className="font-bold text-slate-800">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-800">{mobileNumber}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto">
              Our clinical coordinator will call or WhatsApp you within 2-4 working hours to confirm consultation timing and share preparation instructions.
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <Link to="/" className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                Return to Homepage
              </Link>
              <button onClick={() => {
                setSuccessAptId(null);
                setFullName('');
                setMobileNumber('');
                setEmail('');
                setMessage('');
            }} className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors">
                Book Another Appointment
              </button>
            </div>
          </div>) : (<div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl space-y-8">
            {errorMsg && (<div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0"/>
                <span>{errorMsg}</span>
              </div>)}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Patient Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <User className="w-4 h-4 text-[#0E5D94]"/>
                  1. Patient Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input type="text" required placeholder="e.g. Sanya Sharma" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                    <input type="tel" required placeholder="+91 98765 43210" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input type="email" placeholder="sanya@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
                    <input type="text" placeholder="e.g. New Delhi / Gurugram / Noida" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"/>
                  </div>
                </div>
              </div>

              {/* Step 2: Appointment Preferences */}
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Calendar className="w-4 h-4 text-[#E83E8C]"/>
                  2. Consultation Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Doctor (Optional)</label>
                    <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all bg-white">
                      <option value="">Any Available Specialist</option>
                      {doctors.map((doc) => (<option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.designation.split('&')[0]})
                        </option>))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Treatment of Interest</label>
                    <select value={selectedServiceId} onChange={(e) => setSelectedServiceId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all bg-white">
                      <option value="">General Fertility Consultation</option>
                      {services.map((srv) => (<option key={srv.id} value={srv.id}>
                          {srv.name}
                        </option>))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date *</label>
                    <input type="date" required min={minDateStr} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                    <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all bg-white">
                      <option value="09:30 AM">09:30 AM - Morning Slot</option>
                      <option value="11:00 AM">11:00 AM - Mid-Morning Slot</option>
                      <option value="01:30 PM">01:30 PM - Afternoon Slot</option>
                      <option value="03:30 PM">03:30 PM - Afternoon Slot</option>
                      <option value="05:30 PM">05:30 PM - Evening Slot</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Contact Method</label>
                  <div className="flex gap-4 text-xs font-semibold text-slate-700 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="method" value="phone" checked={preferredContactMethod === 'phone'} onChange={() => setPreferredContactMethod('phone')} className="text-[#0E5D94] focus:ring-[#0E5D94]"/>
                      <span>Phone Call</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="method" value="whatsapp" checked={preferredContactMethod === 'whatsapp'} onChange={() => setPreferredContactMethod('whatsapp')} className="text-[#25D366] focus:ring-[#25D366]"/>
                      <span>WhatsApp Message</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="method" value="email" checked={preferredContactMethod === 'email'} onChange={() => setPreferredContactMethod('email')} className="text-[#E83E8C] focus:ring-[#E83E8C]"/>
                      <span>Email</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Any Medical Notes or Prior History (Optional)</label>
                  <textarea rows={3} placeholder="e.g. Trying to conceive for 3 years, past IUI/IVF cycles, PCOS or thyroid history..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"/>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
                {loading ? 'Logging Your Consultation Request...' : 'Confirm Appointment Request →'}
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#E83E8C]"/> 100% Confidential
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-[#0E5D94]"/> Free First Clinical Review
                </span>
              </div>
            </form>
          </div>)}
      </div>
    </div>);
};
