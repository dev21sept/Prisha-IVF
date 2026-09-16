import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import {
  Calendar,
  Check,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Microscope,
  Phone
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, settings } = useClinic();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 6);

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0E5D94]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/services" className="hover:text-[#0E5D94]">Services</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-semibold">{service.name}</span>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
              {service.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {service.name}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={`/appointment?service=${encodeURIComponent(service.name)}`}
                className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-md transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#E83E8C]" />
                <span>Book This Treatment</span>
              </Link>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 rounded-full text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E83E8C]" />
                <span>Speak to Coordinator</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white h-72 lg:h-80">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-12">
            {/* Detailed Description */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-sm bg-[#0E5D94]"></span>
                Clinical Overview
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {service.fullDescription}
              </p>
            </div>

            {/* Key Clinical Advantages */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-sm bg-[#E83E8C]"></span>
                Key Clinical Advantages &amp; Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
                    <CheckCircle className="w-5 h-5 text-[#0E5D94] shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure Steps */}
            {service.process && service.process.length > 0 && (
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 rounded-sm bg-[#0E5D94]"></span>
                  Step-By-Step Procedure Protocol
                </h2>
                <div className="space-y-6">
                  {service.process.map((step) => (
                    <div key={step.stepNumber} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-[#0E5D94] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#E83E8C]" />
                  Treatment Specific FAQs
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Booking Box */}
            <div className="bg-gradient-prisha text-white rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-xl font-bold">Schedule Consultation</h3>
              <p className="text-xs text-sky-100 leading-relaxed">
                Connect directly with our senior reproductive endocrinologists to discuss your options for {service.name}.
              </p>
              <Link
                to={`/appointment?service=${encodeURIComponent(service.name)}`}
                className="w-full block text-center py-3 rounded-xl text-xs font-bold text-[#0E5D94] bg-white hover:bg-sky-50 transition-colors shadow-sm"
              >
                Book Appointment Online →
              </Link>
            </div>

            {/* Other Treatments */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
              <h4 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Other Treatments
              </h4>
              <ul className="space-y-2.5 text-xs">
                {otherServices.map((os) => (
                  <li key={os.slug}>
                    <Link
                      to={`/services/${os.slug}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-sky-50 text-slate-700 hover:text-[#0E5D94] transition-colors"
                    >
                      <span className="font-semibold">{os.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#E83E8C]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quality Commitment Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-3 text-xs text-slate-600">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E5D94]" />
                Prisha IVF Quality Assurance
              </div>
              <p>• Zero commercial incentives on treatment decisions.</p>
              <p>• Class 10,000 modular cleanroom embryology labs.</p>
              <p>• Full transparent pricing with 0% interest EMI options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
