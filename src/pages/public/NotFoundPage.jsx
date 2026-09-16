import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar } from 'lucide-react';
export const NotFoundPage = () => {
    return (<div className="min-h-[70vh] flex items-center justify-center bg-[#f8fbfe] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl">
        <div className="text-7xl font-extrabold text-[#0E5D94] font-mono tracking-wider">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you are looking for may have been moved or does not exist. Please use the navigation links below.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link to="/" className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-colors flex items-center justify-center gap-2 shadow-xs">
            <Home className="w-4 h-4"/>
            <span>Return to Prisha IVF Home</span>
          </Link>

          <Link to="/appointment" className="w-full py-3 rounded-xl text-xs font-bold text-[#0E5D94] bg-sky-50 hover:bg-sky-100 transition-colors flex items-center justify-center gap-2 border border-sky-100">
            <Calendar className="w-4 h-4 text-[#E83E8C]"/>
            <span>Book A Consultation</span>
          </Link>
        </div>
      </div>
    </div>);
};
