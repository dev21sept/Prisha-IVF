import React from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import {
  CheckCircle,
  ShieldCheck,
  Award,
  Users,
  Target,
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, homepage, doctors } = useClinic();

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Breadcrumb & Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
            About Our Institute
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Advancing the Science of Life, Embracing the Joy of Family
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Prisha IVF was established with a singular vision: to deliver world-class reproductive medicine with uncompromised ethics, technological excellence, and compassionate affordability.
          </p>
        </div>

        {/* Story & Cleanroom Infrastructure Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Where Cutting-Edge Embryology Meets Gentle Patient Care
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Prisha IVF, we recognize that infertility is not merely a clinical condition—it is an emotional journey requiring deep medical expertise and genuine human empathy. Our medical team is led by European and Indian certified reproductive endocrinologists and clinical embryologists who have cumulatively guided over 12,500 successful live births.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our clinic houses an ultra-modern Class 10,000 Modular Cleanroom Embryology Laboratory. Featuring continuous positive pressure, medical-grade VOC filtration, and benchtop tri-gas incubators, our laboratory environment replicates the natural human womb, ensuring that every retrieved egg and embryo receives optimal conditions for growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#0E5D94] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">ICMR Registered</div>
                  <div className="text-xs text-slate-500">100% compliant with National ART Act guidelines.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
                <Award className="w-6 h-6 text-[#E83E8C] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">High Success Rates</div>
                  <div className="text-xs text-slate-500">Up to 78.4% cumulative pregnancy rates across 3 cycles.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={homepage.aboutImageUrl || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'}
                alt="Prisha IVF Lab"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0E5D94] flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To provide every hopeful couple access to honest, scientifically backed reproductive medicine, cutting-edge blastocyst culturing, and personalized care without commercial gimmicks.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-[#E83E8C] flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be India’s most trusted fertility sanctuary, recognized globally for groundbreaking embryological research, transparent protocols, and consistent live-birth excellence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Patient-First Ethics</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We uphold strict moral clarity: no hidden charges, complete diagnostic disclosure, counseling support for emotional resilience, and 0% interest financing support.
            </p>
          </div>
        </div>

        {/* Clinical Leadership Spotlight */}
        <div className="pt-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Guided by Senior Reproductive Specialists</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Meet the directors and embryologists leading scientific excellence at Prisha IVF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs p-6 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#0E5D94]" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                    <div className="text-xs text-[#E83E8C] font-semibold">{doc.designation}</div>
                    <div className="text-[11px] text-slate-400">{doc.experience}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4">{doc.shortBio}</p>
                <Link to={`/doctors/${doc.slug}`} className="text-xs font-bold text-[#0E5D94] hover:underline flex items-center gap-1">
                  <span>View Full Profile &amp; Research</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-prisha text-white rounded-3xl p-10 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Have Questions Regarding Your Fertility Journey?</h3>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto">
            Our clinical team is always available for compassionate guidance. Schedule your initial consultation today.
          </p>
          <div className="pt-3">
            <Link
              to="/appointment"
              className="px-8 py-3.5 rounded-full text-sm font-bold text-[#0E5D94] bg-white hover:bg-sky-50 shadow-md transition-all"
            >
              Book An Appointment Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
