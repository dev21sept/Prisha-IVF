import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import {
  Calendar,
  ChevronRight,
  GraduationCap,
  Award,
  CheckCircle,
  Phone,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const DoctorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { doctors, settings } = useClinic();

  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return <Navigate to="/doctors" replace />;
  }

  const otherDoctors = doctors.filter((d) => d.slug !== slug).slice(0, 4);

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#0E5D94]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/doctors" className="hover:text-[#0E5D94]">Doctors</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-semibold">{doctor.name}</span>
        </div>

        {/* Doctor Header Profile */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white h-80 lg:h-96">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-4 bg-[#0E5D94] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
              {doctor.experience}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-pink uppercase tracking-wider mb-2">
                Fertility Specialist
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {doctor.name}
              </h1>
              <div className="text-sm font-semibold text-[#0E5D94] mt-1">
                {doctor.designation}
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <GraduationCap className="w-5 h-5 text-[#E83E8C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Academic Qualifications:</span>
                <div className="mt-0.5">{doctor.qualification}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Clinical Specializations:</div>
              <div className="flex flex-wrap gap-2">
                {doctor.specialization.map((spec, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-sky-50 text-xs font-semibold text-[#0E5D94] border border-sky-100">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Consulting Details & Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-[#0E5D94]" />
                <span><strong>Consulting:</strong> {doctor.consultingDays} ({doctor.consultingHours})</span>
              </div>

              <Link
                to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
                className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-md transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#E83E8C]" />
                <span>Book Consultation with {doctor.name.split(' ')[1]}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Biography & Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-sm bg-[#0E5D94]"></span>
                Clinical Biography &amp; Background
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {doctor.fullBio}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-sm bg-[#E83E8C]"></span>
                Patient Consultation Philosophy
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                &ldquo;Every patient who walks through our doors brings a deeply personal story. My approach is rooted in uncompromising scientific evidence, thorough diagnostic clarity, and treating every family with the kindness and dedication I would offer to my own loved ones.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
              <h4 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Other Fertility Faculty
              </h4>
              <ul className="space-y-3 text-xs">
                {otherDoctors.map((od) => (
                  <li key={od.id}>
                    <Link
                      to={`/doctors/${od.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-colors"
                    >
                      <img src={od.image} alt={od.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-slate-800 hover:text-[#0E5D94]">{od.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{od.designation}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
