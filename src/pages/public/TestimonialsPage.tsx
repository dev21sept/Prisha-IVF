import React from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Star, Heart, Calendar, ArrowRight } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { testimonials } = useClinic();

  return (
    <div className="w-full bg-[#f8fbfe] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-pink uppercase tracking-wider">
            Patient Stories
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Journeys of Hope, Miracles of Life
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Every parenthood journey has challenges, perseverance, and ultimate joy. Read real testimonials from couples who found their miracles at Prisha IVF.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#E83E8C] px-2.5 py-0.5 rounded-full bg-pink-50">
                    {item.journeyYears || 'Verified Patient'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.testimonial}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.patientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0E5D94] shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.patientName}</h4>
                  <div className="text-xs text-[#0E5D94] font-medium">{item.treatment}</div>
                  <div className="text-[11px] text-slate-400">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-prisha text-white rounded-3xl p-10 text-center space-y-4 shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold">Your Story of Joy Can Begin Today</h3>
          <p className="text-xs sm:text-sm text-sky-100 max-w-lg mx-auto">
            Book a confidential consultation with our medical directors to discuss personalized protocols for your family.
          </p>
          <div className="pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-[#0E5D94] bg-white hover:bg-sky-50 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#E83E8C]" />
              <span>Book An Appointment Online →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
