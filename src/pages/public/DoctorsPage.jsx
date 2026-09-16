import React from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Calendar, ChevronRight, GraduationCap } from 'lucide-react';
export const DoctorsPage = () => {
    const { doctors } = useClinic();
    return (<div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            Medical Faculty &amp; Embryologists
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Dedicated Fertility Specialists
          </h1>
          <p className="text-slate-600 text-base">
            Our multidisciplinary team unites senior reproductive endocrinologists, ESHRE-certified embryologists, andrologists, and endoscopic surgeons dedicated to your parenthood dream.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (<div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-sky-200">
              <div>
                <div className="h-72 overflow-hidden relative bg-slate-100">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-[#0E5D94] shadow-xs">
                    {doc.experience}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0E5D94] transition-colors">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-[#E83E8C] font-semibold mt-1 mb-2">
                    {doc.designation}
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-500 mb-4">
                    <GraduationCap className="w-4 h-4 text-[#0E5D94] shrink-0 mt-0.5"/>
                    <span>{doc.qualification}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {doc.shortBio}
                  </p>

                  {/* Specializations pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.specialization.slice(0, 3).map((spec, i) => (<span key={i} className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[11px] font-medium text-[#0E5D94] border border-sky-100">
                        {spec}
                      </span>))}
                  </div>

                  <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 space-y-1">
                    <div><span className="font-semibold text-slate-800">Clinic Days:</span> {doc.consultingDays}</div>
                    <div><span className="font-semibold text-slate-800">Hours:</span> {doc.consultingHours}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link to={`/doctors/${doc.slug}`} className="text-xs font-bold text-[#0E5D94] hover:text-[#E83E8C] flex items-center gap-1 transition-colors">
                  <span>Doctor Profile</span>
                  <ChevronRight className="w-3.5 h-3.5"/>
                </Link>

                <Link to={`/appointment?doctor=${encodeURIComponent(doc.name)}`} className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors flex items-center gap-1.5 shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-[#E83E8C]"/>
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
