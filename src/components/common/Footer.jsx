import React from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Award, ChevronRight, Heart } from 'lucide-react';
export const Footer = () => {
    const { settings, services } = useClinic();
    const footerServices = services.slice(0, 8);
    return (<footer className="bg-[#0f1e2c] text-slate-300 pt-16 pb-8 border-t-4 border-[#E83E8C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: About & Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-md">
              <img src={settings.logo || '/images/prisha-ivf-logo.png'} alt="Prisha IVF" className="h-12 w-auto object-contain"/>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.footerText}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-sky-300">
                <ShieldCheck className="w-4 h-4 text-[#E83E8C] shrink-0"/>
                <span>ICMR Registered ART Clinic &amp; Bank</span>
              </div>
              <div className="flex items-center gap-2 text-sky-300">
                <Award className="w-4 h-4 text-[#E83E8C] shrink-0"/>
                <span>Class 10,000 Modular Cleanroom Lab</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-3">
              {settings.socialLinks.facebook && (<a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0E5D94] transition-colors" aria-label="Facebook">
                  f
                </a>)}
              {settings.socialLinks.instagram && (<a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#E83E8C] transition-colors" aria-label="Instagram">
                  ig
                </a>)}
              {settings.socialLinks.youtube && (<a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 transition-colors" aria-label="YouTube">
                  yt
                </a>)}
              {settings.socialLinks.linkedin && (<a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-colors" aria-label="LinkedIn">
                  in
                </a>)}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-5 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E83E8C]"></span> Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
            { label: 'About Prisha IVF', path: '/about' },
            { label: 'Fertility Services', path: '/services' },
            { label: 'Our Specialists & Embryologists', path: '/doctors' },
            { label: 'Parenthood Success Stories', path: '/testimonials' },
            { label: 'Frequently Asked Questions', path: '/faq' },
            { label: 'Fertility Health Articles (Blog)', path: '/blog' },
            { label: 'Contact & Clinic Location', path: '/contact' },
            { label: 'Book Consultation Appointment', path: '/appointment' },
            { label: 'Admin CMS Portal', path: '/admin' },
        ].map((item) => (<li key={item.path}>
                  <Link to={item.path} className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E83E8C]"/>
                    <span>{item.label}</span>
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Col 3: Fertility Treatments */}
          <div>
            <h4 className="text-base font-bold text-white mb-5 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0E5D94]"></span> Treatments
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerServices.map((srv) => (<li key={srv.slug}>
                  <Link to={`/services/${srv.slug}`} className="flex items-center gap-1.5 text-slate-400 hover:text-[#E83E8C] hover:translate-x-1 transition-all">
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400"/>
                    <span>{srv.name}</span>
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Col 4: Contact & Visiting Hours */}
          <div>
            <h4 className="text-base font-bold text-white mb-5 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E83E8C]"></span> Clinic Details
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E83E8C] shrink-0 mt-1"/>
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E83E8C] shrink-0"/>
                <div>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white block font-semibold text-slate-200">
                    {settings.phone}
                  </a>
                  <span className="text-xs text-slate-500">Emergency: {settings.emergencyPhone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E83E8C] shrink-0"/>
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1 border-t border-slate-800">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-1"/>
                <div className="text-xs">
                  <div className="font-semibold text-slate-300">Consultation Timings:</div>
                  <div>{settings.openingHours}</div>
                  <div className="text-slate-500">{settings.sundayHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            {settings.copyrightText}
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-[#E83E8C] fill-[#E83E8C]"/> for Hopeful Parents
            </span>
          </div>
        </div>
      </div>
    </footer>);
};
