import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { LayoutDashboard, Calendar, Mail, Stethoscope, Microscope, FileText, MessageSquareQuote, HelpCircle, Image, Home, Settings, LogOut, ExternalLink, Menu, X, CheckCircle } from 'lucide-react';
export const AdminLayout = () => {
    const { currentUser, logout, appointments, contacts, settings } = useClinic();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    // If not logged in, redirect to login
    if (!currentUser) {
        navigate('/admin/login', { replace: true });
        return null;
    }
    const unreadAppointments = appointments.filter((a) => a.status === 'New').length;
    const unreadContacts = contacts.filter((c) => c.status === 'Unread').length;
    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Appointments', path: '/admin/appointments', icon: Calendar, badge: unreadAppointments },
        { label: 'Contact Messages', path: '/admin/contacts', icon: Mail, badge: unreadContacts },
        { label: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
        { label: 'Treatments / Services', path: '/admin/services', icon: Microscope },
        { label: 'Blog Posts', path: '/admin/blog', icon: FileText },
        { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
        { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
        { label: 'Homepage Editor', path: '/admin/homepage', icon: Home },
        { label: 'Site Settings', path: '/admin/settings', icon: Settings },
        { label: 'Media Library', path: '/admin/media', icon: Image },
    ];
    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };
    const isActive = (path) => {
        if (path === '/admin/dashboard') {
            return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
        }
        return location.pathname.startsWith(path);
    };
    return (<div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#0f1e2c] text-white p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src={settings.logo || '/images/prisha-ivf-logo.png'} alt="Prisha IVF" className="h-8 w-auto bg-white p-1 rounded-md"/>
          <span className="font-bold text-sm">Prisha CMS</span>
        </div>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-1 text-slate-300 hover:text-white">
          {mobileNavOpen ? <X className="w-6 h-6 text-[#E83E8C]"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen w-72 bg-[#0f1e2c] text-slate-300 flex flex-col justify-between z-40 transition-transform duration-300 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="overflow-y-auto flex-1 py-6 px-4 space-y-6">
          {/* Logo Branding */}
          <div className="px-2">
            <Link to="/admin/dashboard" className="block bg-white p-2.5 rounded-xl shadow-md">
              <img src={settings.logo || '/images/prisha-ivf-logo.png'} alt="Prisha IVF CMS" className="h-9 w-auto object-contain mx-auto"/>
            </Link>
            <div className="text-[11px] text-center text-slate-400 font-semibold tracking-wider uppercase mt-2">
              Custom Admin CMS
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm font-medium">
            {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (<Link key={item.path} to={item.path} onClick={() => setMobileNavOpen(false)} className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${active
                    ? 'bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] text-white font-bold shadow-sm'
                    : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'}`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-[#E83E8C]' : 'text-slate-400'}`}/>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (<span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E83E8C] text-white shadow-xs">
                      {item.badge}
                    </span>)}
                </Link>);
        })}
          </nav>
        </div>

        {/* Bottom User Strip */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0E5D94] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <Link to="/" target="_blank" className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 font-semibold text-[11px]">
              <ExternalLink className="w-3.5 h-3.5 text-[#E83E8C]"/>
              <span>Live Site</span>
            </Link>

            <button onClick={handleLogout} className="px-2.5 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 transition-colors flex items-center justify-center gap-1.5 font-semibold text-[11px]">
              <LogOut className="w-3.5 h-3.5 text-red-400"/>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 hidden lg:flex justify-between items-center shadow-xs">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-bold text-slate-800 text-sm">Prisha IVF CMS Control Panel</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5"/> Database Connected &amp; Synced
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/" target="_blank" className="px-3 py-1.5 rounded-lg bg-sky-50 text-[#0E5D94] hover:bg-sky-100 border border-sky-100 transition-colors flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5"/>
              <span>View Public Website (prishaivf.in)</span>
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="p-4 sm:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>);
};
