import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Phone, Mail, Clock, Menu, X, Calendar, ChevronDown, ShieldCheck, UserCheck, Lock } from 'lucide-react';
export const Header = () => {
    const { settings, services, currentUser } = useClinic();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    // Listen to scroll position for dynamic transparent -> white navbar on Homepage
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            }
            else {
                setIsScrolled(false);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Close mobile menu on page change
    useEffect(() => {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
    }, [location.pathname]);
    const isActive = (path) => {
        if (path === '/')
            return location.pathname === '/';
        return location.pathname.startsWith(path);
    };
    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services', hasDropdown: true },
        { label: 'Doctors', path: '/doctors' },
        { label: 'Success Stories', path: '/testimonials' },
        { label: 'FAQs', path: '/faq' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' },
    ];
    const featuredServices = services.slice(0, 6);
    // Styling conditions:
    // Is transparent ONLY when on HomePage AND scroll is at the top (< 40px)
    const isTransparent = isHomePage && !isScrolled;
    return (<header className={`w-full z-50 transition-all duration-300 ${isHomePage
            ? isTransparent
                ? 'fixed top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white'
                : 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 text-slate-800'
            : 'sticky top-0 bg-white shadow-xs border-b border-slate-100 text-slate-800'}`}>
      {/* Top Notification / Contact Strip */}
      <div className={`text-xs py-2 px-4 sm:px-8 border-b hidden md:block transition-colors duration-300 ${isTransparent
            ? 'bg-black/25 backdrop-blur-xs text-white/90 border-white/15'
            : 'bg-[#0E5D94] text-white border-white/10'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-sky-100">
              <Phone className="w-3.5 h-3.5 text-[#E83E8C]"/>
              <span>Helpline:</span>
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-semibold hover:text-[#E83E8C] transition-colors">
                {settings.phone}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-sky-100">
              <Mail className="w-3.5 h-3.5 text-[#E83E8C]"/>
              <a href={`mailto:${settings.email}`} className="hover:text-[#E83E8C] transition-colors">
                {settings.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-sky-100">
              <Clock className="w-3.5 h-3.5 text-[#E83E8C]"/>
              <span>{settings.openingHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full ${isTransparent
            ? 'bg-white/15 text-white border border-white/20'
            : 'bg-white/10 text-sky-100'}`}>
              <ShieldCheck className="w-3 h-3 text-[#E83E8C]"/> ICMR Guideline Compliant Cleanroom Labs
            </span>
            {currentUser ? (<Link to="/admin" className="flex items-center gap-1 text-[#E83E8C] font-semibold hover:underline">
                <UserCheck className="w-3 h-3"/> Admin CMS
              </Link>) : (<Link to="/admin/login" className={`flex items-center gap-1 transition-colors text-[11px] ${isTransparent ? 'text-white/80 hover:text-white' : 'text-white/70 hover:text-white'}`}>
                <Lock className="w-3 h-3"/> CMS Login
              </Link>)}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Brand Logo with dynamic frosted container when transparent for maximum contrast */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className={`transition-all duration-300 rounded-2xl flex items-center ${isTransparent
            ? 'bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-lg border border-white/30 hover:bg-white hover:scale-[1.02]'
            : ''}`}>
            <img src={settings.logo || '/images/prisha-ivf-logo.png'} alt="Prisha IVF Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300"/>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-7 text-[15px] font-semibold transition-colors duration-300 ${isTransparent ? 'text-white drop-shadow-sm' : 'text-slate-700'}`}>
          {navLinks.map((link) => {
            if (link.hasDropdown) {
                return (<div key={link.path} className="relative group py-2" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
                  <Link to={link.path} className={`flex items-center gap-1 transition-colors ${isTransparent
                        ? 'hover:text-[#8ed1fc] ' + (isActive(link.path) ? 'text-[#8ed1fc] font-bold' : 'text-white')
                        : 'hover:text-[#0E5D94] ' + (isActive(link.path) ? 'text-[#0E5D94] font-bold' : 'text-slate-700')}`}>
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#E83E8C]' : ''}`}/>
                  </Link>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 transition-all duration-200 z-50 text-slate-800 ${servicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                      Fertility Treatments
                    </div>
                    <div className="mt-1">
                      {featuredServices.map((srv) => (<Link key={srv.slug} to={`/services/${srv.slug}`} className="block px-3 py-2 text-sm rounded-lg hover:bg-sky-50 text-slate-700 hover:text-[#0E5D94] transition-colors" onClick={() => setServicesDropdownOpen(false)}>
                          <div className="font-semibold">{srv.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{srv.shortDescription}</div>
                        </Link>))}
                    </div>
                    <div className="pt-2 mt-1 border-t border-slate-100">
                      <Link to="/services" className="block px-3 py-1.5 text-xs text-center font-bold text-[#E83E8C] hover:bg-pink-50 rounded-lg transition-colors" onClick={() => setServicesDropdownOpen(false)}>
                        View All 14+ Treatments →
                      </Link>
                    </div>
                  </div>
                </div>);
            }
            return (<Link key={link.path} to={link.path} className={`transition-colors relative py-2 ${isTransparent
                    ? 'hover:text-[#8ed1fc] ' +
                        (isActive(link.path)
                            ? 'text-white font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#E83E8C]'
                            : 'text-white/90')
                    : 'hover:text-[#0E5D94] ' +
                        (isActive(link.path)
                            ? 'text-[#0E5D94] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#E83E8C]'
                            : 'text-slate-700')}`}>
                {link.label}
              </Link>);
        })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className={`flex lg:hidden xl:flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${isTransparent
            ? 'text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md'
            : 'text-[#0E5D94] bg-sky-50 hover:bg-sky-100 border border-sky-100'}`}>
            <Phone className="w-3.5 h-3.5 text-[#E83E8C]"/>
            <span>{settings.phone}</span>
          </a>

          <Link to="/appointment" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 group shadow-md hover:shadow-lg ${isTransparent
            ? 'bg-gradient-to-r from-[#E83E8C] via-[#d81b60] to-[#b81b62] hover:opacity-95 shadow-pink-500/30 btn-shimmer'
            : 'bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94]'}`}>
            <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform"/>
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-2 rounded-lg transition-colors focus:outline-none ${isTransparent
            ? 'text-white bg-white/10 hover:bg-white/20'
            : 'text-slate-700 hover:text-[#0E5D94] hover:bg-slate-100'}`} aria-label="Toggle Navigation Menu">
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#E83E8C]"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (<div className="lg:hidden bg-white border-t border-slate-100 px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-300 text-slate-800">
          <nav className="flex flex-col gap-3 font-medium">
            {navLinks.map((link) => (<Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={`py-2 px-3 rounded-lg text-sm transition-colors ${isActive(link.path)
                    ? 'bg-sky-50 text-[#0E5D94] font-bold border-l-4 border-[#E83E8C]'
                    : 'text-slate-700 hover:bg-slate-50'}`}>
                {link.label}
              </Link>))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link to="/appointment" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] shadow-md">
                Book An Appointment
              </Link>

              <div className="text-xs text-slate-500 flex flex-col gap-1.5 pt-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E83E8C]"/>
                  <span>Helpline: {settings.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E83E8C]"/>
                  <span>{settings.email}</span>
                </div>
              </div>
            </div>
          </nav>
        </div>)}
    </header>);
};
