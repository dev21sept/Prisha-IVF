import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, sendContactMessage } = useClinic();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, phone number, and message.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await sendContactMessage({
        name,
        phone,
        email: email.trim() || 'no-email@prishaivf.in',
        subject: subject.trim() || 'General Enquiry',
        message,
      });

      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setErrorMsg('Could not submit message. Please contact our helpline directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We Are Here to Guide Your Parenthood Journey
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Reach out to our clinical care coordinators for consultation queries, treatment second opinions, or clinic visits.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0E5D94] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-[#E83E8C]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Clinic Location</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{settings.address}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0E5D94] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-[#E83E8C]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Helpline Numbers</h3>
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="block text-xs font-semibold text-[#0E5D94] hover:underline">
                Main: {settings.phone}
              </a>
              <p className="text-xs text-slate-500">24/7 Emergency: {settings.emergencyPhone}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0E5D94] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#E83E8C]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Consultation Hours</h3>
              <p className="text-xs text-slate-600">{settings.openingHours}</p>
              <p className="text-xs text-slate-500">{settings.sundayHours}</p>
            </div>
          </div>
        </div>

        {/* Form and Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Send an Enquiry</h2>
              <p className="text-xs text-slate-500 mt-1">Our team will respond via phone or email within 24 hours.</p>
            </div>

            {success ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Thank You for Reaching Out!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your message has been submitted to the Prisha IVF care team. We will review your enquiry promptly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 px-5 py-2 text-xs font-bold text-[#0E5D94] bg-white rounded-lg border border-sky-200 hover:bg-sky-50 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. IVF Cost Inquiry / Doctor Availability"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your questions or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#E83E8C]" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Map Preview & Clinic Visual */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm h-80 lg:h-96">
              <iframe
                title="Prisha IVF Location"
                src={settings.googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-[#0E5D94] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E83E8C]" />
                Visiting Information
              </div>
              <p>Valet parking is available for all consultation appointments. Located near major metro and public transit hubs in Delhi NCR.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
