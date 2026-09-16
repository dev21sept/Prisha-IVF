import React from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useClinic();

  return (
    <div className="w-full bg-[#f8fbfe] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: January 1, 2026 | Prisha IVF (prishaivf.in)</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-sky-50 text-[#0E5D94] border border-sky-100 flex items-center gap-3">
            <Lock className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-xs">
              Prisha IVF adheres strictly to the Digital Personal Data Protection Act and National Assisted Reproductive Technology (ART) confidentiality regulations.
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900">1. Information We Collect</h3>
          <p>
            When you request an appointment or contact enquiry on prishaivf.in, we collect basic contact details (full name, phone number, email, city, and preferred consultation date). We do NOT store sensitive medical records or financial payment data through our public website forms.
          </p>

          <h3 className="text-lg font-bold text-slate-900">2. How Your Data is Protected</h3>
          <p>
            All submitted enquiries are encrypted in transit via SSL/TLS and routed directly to our private clinic coordination database. Your contact information is used exclusively by Prisha IVF patient coordinators to confirm consultation appointments and share clinical preparation guidelines. We never sell, lease, or share patient data with third-party marketing entities.
          </p>

          <h3 className="text-lg font-bold text-slate-900">3. ICMR &amp; ART Act Compliance</h3>
          <p>
            In compliance with the Assisted Reproductive Technology (Regulation) Act, all clinical and embryological records created at our physical center are preserved with highest biometric and medical record confidentiality protocols.
          </p>

          <h3 className="text-lg font-bold text-slate-900">4. Contact Our Privacy Officer</h3>
          <p>
            If you have questions regarding your data privacy, please write to our Data Protection Officer at: <a href={`mailto:${settings.email}`} className="text-[#0E5D94] font-bold underline">{settings.email}</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsConditionsPage: React.FC = () => {
  const { settings } = useClinic();

  return (
    <div className="w-full bg-[#f8fbfe] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms &amp; Conditions</h1>
          <p className="text-xs text-slate-500">Last Updated: January 1, 2026 | Prisha IVF (prishaivf.in)</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
          <h3 className="text-lg font-bold text-slate-900">1. Medical Information Disclaimer</h3>
          <p>
            The informational content, articles, and treatment overviews on prishaivf.in are provided solely for educational and patient awareness purposes. They do NOT constitute individual medical advice, clinical diagnosis, or treatment guarantees. Infertility outcomes vary based on individual biological and physiological factors.
          </p>

          <h3 className="text-lg font-bold text-slate-900">2. Appointment Scheduling</h3>
          <p>
            Online appointment requests submitted through this website represent consultation scheduling requests. A final consultation slot is confirmed only after communication from our clinic coordination desk.
          </p>

          <h3 className="text-lg font-bold text-slate-900">3. Intellectual Property</h3>
          <p>
            All brand trademarks, the Prisha IVF mother-and-child emblem, text, imagery, and design layouts are the exclusive intellectual property of Prisha IVF and protected under Indian copyright law.
          </p>

          <h3 className="text-lg font-bold text-slate-900">4. Governing Law</h3>
          <p>
            Any disputes arising in connection with this website or clinical services shall be governed exclusively by the laws of India and subject to the jurisdiction of the courts of New Delhi.
          </p>
        </div>
      </div>
    </div>
  );
};
