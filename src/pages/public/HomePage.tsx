import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  Microscope,
  Activity,
  HeartHandshake,
  Sparkles,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Star,
  Plus,
  Minus,
  Check,
  Play,
  Volume2,
  VolumeX,
  Dna,
  Heart
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { homepage, settings, services, doctors, testimonials, faqs, blogs, bookAppointment } = useClinic();

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroSlides = [
    {
      id: 1,
      badge: homepage.heroBadge || '✨ Certified Center of Reproductive Excellence',
      heading: homepage.heroHeading,
      highlightWord: 'Parenthood',
      subheading: homepage.heroSubheading,
      points: ['Class 10,000 Modular Cleanroom', '78.4% Cumulative Live Birth Rate', 'Zero Hidden Costs & 0% EMI'],
      primaryBtn: { text: 'Book Free Consultation', link: '/appointment' },
      secondaryBtn: { text: 'Explore Treatments', link: '/services' },
    },
    {
      id: 2,
      badge: '🔬 Advanced Embryology & Blastocyst Culture',
      heading: 'World-Class Cleanroom Laboratories Cultivating Hope',
      highlightWord: 'Cleanroom Laboratories',
      subheading: 'Replicating the natural maternal womb with precision tri-gas incubators to nurture embryos to Day 5 blastocyst stage for superior implantation success.',
      points: ['Extended Day 5 Blastocyst Culture', 'Laser-Assisted Hatching (LAH)', 'High-Survival Vitrification Cryo-Bank'],
      primaryBtn: { text: 'Our Lab Standards', link: '/about' },
      secondaryBtn: { text: 'View All Treatments', link: '/services' },
    },
    {
      id: 3,
      badge: '🌱 Compassionate Specialized Care',
      heading: 'Overcoming Low AMH, Male Factor & Recurrent Failed Cycles',
      highlightWord: 'Recurrent Failed Cycles',
      subheading: 'Individualized stimulation protocols, advanced ICSI, and micro-surgical sperm extraction (Micro-TESE) providing real answers when others say no.',
      points: ['Dedicated Andrology & Micro-TESE', 'PGT-A Genetic Screening', 'Holistic Mind-Body Counseling'],
      primaryBtn: { text: 'Book Second Opinion', link: '/appointment' },
      secondaryBtn: { text: 'Meet Our Specialists', link: '/doctors' },
    },
  ];

  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Guarantee continuous video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log('Autoplay handled by browser policy:', err);
      });
    }
  }, []);

  // Auto-advance Hero Slider every 6.5 seconds
  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isSliderPaused, heroSlides.length]);

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  // Appointment Form State (Moved to Dedicated Section)
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedService, setSelectedService] = useState('In Vitro Fertilization (IVF)');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:30 AM');
  const [patientCity, setPatientCity] = useState('');
  const [patientMessage, setPatientMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;
    setBookingLoading(true);
    try {
      const apt = await bookAppointment({
        fullName: patientName,
        mobileNumber: patientPhone,
        email: patientEmail || 'no-email@prishaivf.in',
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        preferredTime,
        doctorId: selectedDoctor || doctors[0]?.id || 'doc-1',
        doctorName: doctors.find((d) => d.id === selectedDoctor)?.name || 'Any Senior Specialist',
        serviceId: services[0]?.id || 'srv-1',
        serviceName: selectedService,
        city: patientCity || 'Delhi NCR',
        preferredContactMethod: 'phone',
        message: patientMessage || 'Consultation request from homepage dedicated section',
      });
      setBookingSuccess(apt.appointmentId);
      setPatientName('');
      setPatientPhone('');
      setPatientEmail('');
      setPreferredDate('');
      setPatientMessage('');
    } catch {
      alert('Booking request could not be logged. Please call our clinic helpline directly.');
    } finally {
      setBookingLoading(false);
    }
  };

  const featuredServices = services.slice(0, 8);
  const featuredDoctors = doctors.slice(0, 4);
  const featuredBlogs = blogs.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  const topFaqs = faqs.slice(0, 5);

  const activeSlide = heroSlides[currentSlide];

  return (
    <div className="w-full bg-[#f8fbfe] overflow-hidden">
      {/* 1. CINEMATIC VIDEO HERO SECTION WITH INTERACTIVE SLIDER */}
      <section
        className="relative min-h-[720px] lg:min-h-[820px] flex items-center overflow-hidden"
        onMouseEnter={() => setIsSliderPaused(true)}
        onMouseLeave={() => setIsSliderPaused(false)}
      >
        {/* Continuous Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-100"
            poster="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src={homepage.heroVideoUrl} type="video/mp4" />
          </video>

          {/* Clean, Non-muddy Cinematic Overlay that lets video shine brightly */}
          <div className="absolute inset-0 hero-video-overlay-clean"></div>
        </div>

        {/* Hero Slider Content with top spacing for transparent navbar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-36 sm:pt-44 lg:pt-48 pb-16 lg:pb-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Main Text Content */}
            <div className="lg:col-span-8 space-y-6 animate-slide-up" key={activeSlide.id}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-md border border-white/20 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#E83E8C] animate-pulse" />
                <span>{activeSlide.badge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight text-shadow-sm">
                {activeSlide.heading.includes(activeSlide.highlightWord) ? (
                  <>
                    {activeSlide.heading.split(activeSlide.highlightWord)[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ed1fc] via-white to-[#F43F85]">
                      {activeSlide.highlightWord}
                    </span>
                    {activeSlide.heading.split(activeSlide.highlightWord)[1]}
                  </>
                ) : (
                  activeSlide.heading
                )}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                {activeSlide.subheading}
              </p>

              {/* Key Bullet Highlights */}
              <div className="flex flex-wrap gap-4 pt-1">
                {activeSlide.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-sky-100 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs border border-white/10">
                    <Check className="w-3.5 h-3.5 text-[#E83E8C] font-extrabold" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to={activeSlide.primaryBtn.link}
                  className="px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#E83E8C] via-[#d81b60] to-[#b81b62] hover:opacity-95 shadow-xl transition-all duration-300 flex items-center gap-2 group btn-shimmer"
                >
                  <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>{activeSlide.primaryBtn.text}</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={activeSlide.secondaryBtn.link}
                  className="px-7 py-4 rounded-full text-sm font-bold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all duration-300 shadow-md"
                >
                  {activeSlide.secondaryBtn.text}
                </Link>
              </div>
            </div>

            {/* Right Side Floating Trust Badges */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-5 justify-center">
              {/* Badge 1 */}
              <div className="glass-dark p-6 rounded-3xl text-white space-y-2 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0E5D94] to-[#E83E8C] flex items-center justify-center text-white shadow-md">
                    <Heart className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white">12,500+</div>
                    <div className="text-xs text-sky-200">Parenthood Dreams Realized</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  Trusted by thousands of couples across India and globally for transparent, ethical fertility outcomes.
                </p>
              </div>

              {/* Badge 2 */}
              <div className="glass-dark p-6 rounded-3xl text-white space-y-2 animate-float-reverse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E83E8C] to-[#0E5D94] flex items-center justify-center text-white shadow-md">
                    <Microscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white">Class 10,000</div>
                    <div className="text-xs text-pink-200">Modular Cleanroom Labs</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  HEPA filtration and tri-gas benchtop micro-incubators protecting every precious embryo.
                </p>
              </div>
            </div>
          </div>

          {/* Slider Controls Bottom Bar */}
          <div className="pt-12 flex flex-wrap items-center justify-between gap-4">
            {/* Slide Indicators & Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-10 bg-[#E83E8C]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-white/80 ml-2">
                0{currentSlide + 1} / 0{heroSlides.length}
              </span>
            </div>

            {/* Video Audio Toggle & Navigation Arrows */}
            <div className="flex items-center gap-3">
              {/* Mute/Unmute Video Sound */}
              <button
                onClick={toggleVideoMute}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/30 hover:bg-black/50 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                title={isVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
              >
                {isVideoMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-pink-300" />
                    <span className="hidden sm:inline">Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                    <span className="hidden sm:inline">Audio Playing</span>
                  </>
                )}
              </button>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS / TRUST COUNTERS STRIP */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 rounded-xl hover:bg-sky-50/50 transition-colors fertiora-card">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0E5D94]">
                {homepage.stat1Value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {homepage.stat1Label}
              </div>
            </div>

            <div className="p-4 rounded-xl hover:bg-pink-50/50 transition-colors fertiora-card">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#E83E8C]">
                {homepage.stat2Value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {homepage.stat2Label}
              </div>
            </div>

            <div className="p-4 rounded-xl hover:bg-sky-50/50 transition-colors fertiora-card">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0E5D94]">
                {homepage.stat3Value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {homepage.stat3Label}
              </div>
            </div>

            <div className="p-4 rounded-xl hover:bg-pink-50/50 transition-colors fertiora-card">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#E83E8C]">
                {homepage.stat4Value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {homepage.stat4Label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PRISHA IVF SECTION */}
      <section className="py-20 lg:py-28 bg-[#f8fbfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={homepage.aboutImageUrl || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'}
                  alt="Prisha IVF Medical Facility"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E83E8C] text-xs font-bold uppercase tracking-wider mb-2">
                    Class 10,000 Cleanroom
                  </div>
                  <h4 className="text-lg font-bold">International Embryology Lab Standards</h4>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 max-w-xs animate-float">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0E5D94] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Highest Quality Embryos</div>
                  <div className="text-xs text-slate-500">Day 5 Extended Blastocyst Culture</div>
                </div>
              </div>
            </div>

            {/* About Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold badge-pink uppercase tracking-wider">
                About Prisha IVF
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {homepage.aboutHeading}
              </h2>

              <p className="text-slate-600 leading-relaxed">
                {homepage.aboutDescription}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {homepage.aboutFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#0E5D94]/10 text-[#0E5D94] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-5">
                <Link
                  to="/about"
                  className="px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#0E5D94] hover:bg-[#0a4975] transition-all shadow-md flex items-center gap-2"
                >
                  <span>Learn More About Us</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E83E8C] flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Helpline</div>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-sm font-bold text-slate-900 hover:text-[#0E5D94]">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE FERTILITY SERVICES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
              Comprehensive Care
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Advanced Fertility Treatments Under One Roof
            </h2>
            <p className="text-slate-600 text-base">
              Every reproductive challenge requires a customized, scientifically validated approach. Explore our specialized treatment solutions.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((srv) => (
              <div
                key={srv.slug}
                className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between fertiora-card hover:border-sky-200"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 group-hover:bg-[#0E5D94] text-[#0E5D94] group-hover:text-white flex items-center justify-center transition-colors mb-5 shadow-xs">
                    <Microscope className="w-7 h-7" />
                  </div>

                  <div className="text-xs font-semibold text-[#E83E8C] uppercase tracking-wider mb-1">
                    {srv.category}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0E5D94] transition-colors mb-2">
                    {srv.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                    {srv.shortDescription}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {srv.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-xs font-bold text-[#0E5D94] group-hover:text-[#E83E8C] flex items-center gap-1 transition-colors"
                  >
                    <span>Read Procedure Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#0E5D94] bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
            >
              <span>View All 14 Fertility Treatments &amp; Procedures</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE PRISHA IVF (Fertiora-style 4 Pillars) */}
      <section className="py-20 lg:py-28 bg-[#f8fbfe] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-pink uppercase tracking-wider">
              The Prisha Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {homepage.whyChooseHeading}
            </h2>
            <p className="text-slate-600">
              {homepage.whyChooseSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homepage.whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 relative group fertiora-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E5D94] to-[#0A4D7A] text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-[#E83E8C]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#0E5D94] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 4-STEP IVF TREATMENT PROCESS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
              Step-By-Step Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {homepage.treatmentProcessHeading}
            </h2>
            <p className="text-slate-600">
              {homepage.treatmentProcessSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {homepage.treatmentProcessSteps.map((step, idx) => (
              <div key={idx} className="relative bg-sky-50/40 rounded-2xl p-7 border border-sky-100 hover:bg-white hover:shadow-xl transition-all duration-300 fertiora-card">
                <div className="text-4xl font-black text-[#E83E8C] opacity-40 mb-4 font-mono">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEDICATED CONSULTATION REQUEST SECTION (Moved from Hero to its own luxury section) */}
      <section id="consultation-section" className="py-20 lg:py-28 bg-gradient-to-br from-[#073453] via-[#0E5D94] to-[#0A4D7A] text-white relative overflow-hidden">
        {/* Background decorative soft circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E83E8C]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-md border border-white/20">
                <HeartHandshake className="w-3.5 h-3.5 text-[#E83E8C]" />
                <span>Begin Your Journey</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Schedule Your Private Fertility Consultation
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Connect directly with our senior reproductive medicine specialists. In your 45-minute confidential consultation, we review your medical history, perform 3D pelvic ultrasound diagnostics, and map an evidence-based pathway forward.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#E83E8C] shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Full Medical History &amp; Test Audit</h4>
                    <p className="text-xs text-slate-300">Detailed review of past reports and hormone panels.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#E83E8C] shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Zero Pressure, Complete Financial Transparency</h4>
                    <p className="text-xs text-slate-300">All-inclusive package breakdowns and 0% EMI assistance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#E83E8C] shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Dedicated Patient Care Coordinator</h4>
                    <p className="text-xs text-slate-300">Continuous emotional and clinical support at every step.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6 border-t border-white/15">
                <div>
                  <div className="text-xs text-slate-300">Direct Consultation Line</div>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-lg font-bold text-white hover:underline">
                    {settings.phone}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-slate-300">WhatsApp Coordinator</div>
                  <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} className="text-lg font-bold text-emerald-300 hover:underline">
                    {settings.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Booking Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-800 border border-slate-100">
                {bookingSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Consultation Request Logged!</h3>
                    <p className="text-xs text-slate-600">
                      Your Reference ID: <span className="font-bold text-[#0E5D94] text-sm">{bookingSuccess}</span>
                    </p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Our clinical desk has sent an instant notification to our team and logged your slot. We will reach out shortly.
                    </p>
                    <button
                      onClick={() => setBookingSuccess(null)}
                      className="mt-4 px-6 py-2.5 text-xs font-bold text-[#0E5D94] bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
                    <div className="border-b border-slate-100 pb-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">Request Your Appointment</h3>
                      <p className="text-slate-500 text-[11px]">Free initial clinical review &amp; slot booking</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ananya Roy"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="ananya@example.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">City / Location</label>
                        <input
                          type="text"
                          placeholder="e.g. New Delhi / Gurugram"
                          value={patientCity}
                          onChange={(e) => setPatientCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Preferred Doctor</label>
                        <select
                          value={selectedDoctor}
                          onChange={(e) => setSelectedDoctor(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] outline-none bg-white"
                        >
                          <option value="">Any Available Specialist</option>
                          {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Treatment of Interest</label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] outline-none bg-white"
                        >
                          <option value="In Vitro Fertilization (IVF)">In Vitro Fertilization (IVF)</option>
                          <option value="ICSI Micro-Injection">ICSI Micro-Injection</option>
                          <option value="IUI Treatment">IUI Treatment</option>
                          <option value="Blastocyst Culture">Blastocyst Culture</option>
                          <option value="Egg Freezing">Egg Freezing</option>
                          <option value="Male Infertility & Micro-TESE">Male Infertility & Micro-TESE</option>
                          <option value="General Fertility Consultation">General Fertility Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Preferred Date *</label>
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Preferred Slot</label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] outline-none bg-white"
                        >
                          <option value="10:00 AM">10:00 AM - Morning</option>
                          <option value="11:30 AM">11:30 AM - Morning</option>
                          <option value="02:00 PM">02:00 PM - Afternoon</option>
                          <option value="04:00 PM">04:00 PM - Afternoon</option>
                          <option value="05:30 PM">05:30 PM - Evening</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Medical Notes (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about previous attempts or questions..."
                        value={patientMessage}
                        onChange={(e) => setPatientMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E5D94] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#E83E8C] to-[#d81b60] hover:from-[#d81b60] hover:to-[#b81b62] shadow-md hover:shadow-lg transition-all disabled:opacity-50 text-sm"
                    >
                      {bookingLoading ? 'Logging Appointment...' : 'Submit Consultation Request →'}
                    </button>

                    <p className="text-[10px] text-center text-slate-400">
                      🔒 Strictly confidential. 100% compliant with National ART Act data regulations.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEET OUR REPRODUCTIVE SPECIALISTS */}
      <section className="py-20 lg:py-28 bg-[#f8fbfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-pink uppercase tracking-wider mb-3">
                Clinical Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Renowned Fertility Specialists &amp; Embryologists
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mt-2">
                Decades of cumulative reproductive science, ethical commitment, and gentle bedside compassion dedicated to your family dreams.
              </p>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#0E5D94] bg-white border border-sky-200 hover:bg-sky-50 transition-colors shrink-0 shadow-xs"
            >
              <span>View All Specialists</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group fertiora-card"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 text-[11px] font-bold text-[#0E5D94] shadow-xs">
                      {doc.experience}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0E5D94] transition-colors">
                      {doc.name}
                    </h3>
                    <div className="text-xs text-[#E83E8C] font-semibold mt-0.5 mb-2 line-clamp-1">
                      {doc.designation}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {doc.shortBio}
                    </p>

                    <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                      <div><span className="font-semibold text-slate-800">Days:</span> {doc.consultingDays}</div>
                      <div><span className="font-semibold text-slate-800">Hours:</span> {doc.consultingHours}</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/doctors/${doc.slug}`}
                    className="w-full block text-center py-2.5 rounded-lg text-xs font-bold text-[#0E5D94] bg-sky-50 hover:bg-sky-100 group-hover:bg-[#0E5D94] group-hover:text-white transition-colors"
                  >
                    View Doctor Profile &amp; Bio →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PATIENT SUCCESS STORIES (Testimonials) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-blue uppercase tracking-wider">
              Parenthood Realized
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Heartwarming Success Stories from Real Families
            </h2>
            <p className="text-slate-600 text-sm">
              Read how couples turned years of heartache into the joyous laughter of their newborn babies at Prisha IVF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50/70 rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between fertiora-card"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    &ldquo;{t.testimonial}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3.5">
                  <img
                    src={t.image}
                    alt={t.patientName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.patientName}</div>
                    <div className="text-[11px] text-[#E83E8C] font-medium">{t.treatment}</div>
                    <div className="text-[10px] text-slate-400">{t.location} • {t.journeyYears}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0E5D94] hover:text-[#E83E8C] transition-colors"
            >
              <span>Read More Verified Patient Reviews &amp; Stories</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 lg:py-28 bg-[#f8fbfe]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-pink uppercase tracking-wider">
              Answers &amp; Clarity
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              We understand you have many questions. Here is straightforward, medically responsible information to guide you.
            </p>
          </div>

          <div className="space-y-4">
            {topFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#0E5D94] transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#E83E8C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-[#0E5D94] bg-white border border-sky-200 hover:bg-sky-50 shadow-xs transition-colors"
            >
              <span>Explore All Categorized FAQs (Costs, Procedures, Age) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FERTILITY BLOG & ARTICLES */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold badge-blue uppercase tracking-wider mb-3">
                Educational Insights
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Latest Fertility &amp; Reproductive Health Articles
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mt-2">
                Written by our certified clinical embryologists and reproductive medicine doctors to empower your choices.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#0E5D94] bg-sky-50 hover:bg-sky-100 transition-colors shrink-0"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group fertiora-card"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={b.featuredImage}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0E5D94] text-[11px] font-bold text-white shadow-xs">
                      {b.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-3">
                      <span>{b.publishDate}</span>
                      <span>•</span>
                      <span>{b.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0E5D94] transition-colors line-clamp-2 mb-2.5">
                      {b.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {b.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">By {b.author}</span>
                  <Link
                    to={`/blog/${b.slug}`}
                    className="font-bold text-[#E83E8C] group-hover:underline flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. LOCATION & CONTACT QUICK BAR */}
      <section className="bg-gradient-prisha text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#E83E8C]" />
              </div>
              <div>
                <div className="text-xs text-sky-200 font-semibold uppercase">Clinic Address</div>
                <div className="text-sm font-medium mt-1 leading-snug">{settings.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#E83E8C]" />
              </div>
              <div>
                <div className="text-xs text-sky-200 font-semibold uppercase">Call / WhatsApp</div>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-sm font-bold mt-1 block hover:underline">
                  {settings.phone}
                </a>
                <div className="text-xs text-sky-200">Emergency: {settings.emergencyPhone}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#E83E8C]" />
              </div>
              <div>
                <div className="text-xs text-sky-200 font-semibold uppercase">Consulting Hours</div>
                <div className="text-sm font-medium mt-1">{settings.openingHours}</div>
                <div className="text-xs text-sky-200">{settings.sundayHours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
