import {
  Doctor,
  Service,
  BlogPost,
  Testimonial,
  FAQ,
  SiteSettings,
  HomepageContent,
  Appointment,
  ContactMessage,
  MediaItem
} from '../types';

export const initialSiteSettings: SiteSettings = {
  clinicName: 'Prisha IVF',
  tagline: 'Center for Advanced Reproductive Medicine & Fertility Care',
  domain: 'prishaivf.in',
  logo: '/images/prisha-ivf-logo.png',
  favicon: '/images/prisha-ivf-logo.svg',
  phone: '+91 98982 26201',
  emergencyPhone: '+91 98982 26202',
  whatsapp: '+919898226201',
  email: 'care@prishaivf.in',
  address: 'Plot No. 42, Health City Avenue, Medical Enclave, New Delhi - 110029, India',
  cityStateZip: 'New Delhi, Delhi 110029, India',
  googleMapsUrl: 'https://maps.google.com/maps?q=AIIMS+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
  openingHours: 'Mon - Sat: 08:30 AM - 08:00 PM',
  sundayHours: '10:00 AM - 02:00 PM (Emergency & Scheduled Procedures)',
  socialLinks: {
    facebook: 'https://facebook.com/prishaivf',
    instagram: 'https://instagram.com/prishaivf',
    youtube: 'https://youtube.com/@prishaivf',
    linkedin: 'https://linkedin.com/company/prishaivf',
    twitter: 'https://twitter.com/prishaivf',
  },
  footerText: 'Prisha IVF is committed to providing compassionate, evidence-based reproductive healthcare with international cleanroom embryology laboratories and ethical clinical guidelines.',
  copyrightText: '© 2026 Prisha IVF (prishaivf.in). All clinical rights reserved. Empowering parenthood with medical excellence.',
};

export const initialHomepageContent: HomepageContent = {
  heroHeading: 'Your Journey to Parenthood Begins with Compassion & Science',
  heroSubheading: 'At Prisha IVF, we bring together world-class embryologists, state-of-the-art cleanroom laboratories, and personalized reproductive care to turn your dream of a family into reality.',
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-doctor-analyzing-results-with-a-microscope-41221-large.mp4',
  heroImageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  heroBadge: '✨ Certified Center of Reproductive Excellence',
  stat1Value: '12,500+',
  stat1Label: 'Parenthood Dreams Realized',
  stat2Value: '78.4%',
  stat2Label: 'High Clinical Cumulative Success',
  stat3Value: '22+',
  stat3Label: 'Years Cumulative Specialist Experience',
  stat4Value: '100%',
  stat4Label: 'Ethical & ICMR Guideline Compliant',
  aboutHeading: 'Dedicated to Turning Hope into the Joy of Holding Your Baby',
  aboutSubheading: 'WHY PRISHA IVF IS TRUSTED BY THOUSANDS OF FAMILIES',
  aboutDescription: 'Founded with a profound commitment to ethical, transparent, and patient-first reproductive medicine, Prisha IVF combines advanced micro-manipulation technology with deeply empathetic human care. Every family’s fertility journey is unique, which is why we never rely on one-size-fits-all treatments.',
  aboutFeatures: [
    'State-of-the-Art Class 10,000 Modular Cleanroom Embryology Lab',
    'Advanced Blastocyst & Laser-Assisted Hatching Expertise',
    'Zero Hidden Costs with Transparent Treatment Packages & Easy EMI',
    'Individualized Ovarian Protocols & Comprehensive Counseling Support',
  ],
  aboutImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  whyChooseHeading: 'Why Families Choose Prisha IVF as Their Trusted Fertility Partner',
  whyChooseSubheading: 'WORLD-CLASS CLINICAL EXCELLENCE WITH A GENTLE, PERSONAL TOUCH',
  whyChooseItems: [
    {
      title: 'Advanced Embryology Lab',
      description: 'Equipped with HEPA-filtered cleanrooms, benchtop tri-gas incubators, and cutting-edge micromanipulators for optimal embryo cultivation.',
      icon: 'Microscope',
    },
    {
      title: 'Individualized Clinical Protocols',
      description: 'Tailored stimulation protocols designed around your age, ovarian reserve (AMH), and past treatment history to maximize healthy blastocysts.',
      icon: 'Activity',
    },
    {
      title: 'Compassionate Mind-Body Support',
      description: 'Dedicated fertility counselors and clinical psychologists provide continuous emotional guidance through every stage of your cycle.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Transparent Pricing & EMI Options',
      description: 'Clear, ethical estimates from day one with 0% interest monthly installment assistance so financial stress never stands in your way.',
      icon: 'ShieldCheck',
    },
  ],
  treatmentProcessHeading: 'Our Proven 4-Step Pathway to Parenthood',
  treatmentProcessSubheading: 'TRANSPARENT, EVIDENCE-BASED FERTILITY CARE AT EVERY STEP',
  treatmentProcessSteps: [
    {
      step: '01',
      title: 'Initial Consultation & Diagnostic Mapping',
      description: 'Comprehensive pelvic scan, semen analysis, and hormonal evaluation to pinpoint underlying reproductive factors.',
    },
    {
      step: '02',
      title: 'Personalized Stimulation & Follicular Monitoring',
      description: 'Carefully titrated gonadotropin stimulation monitored via regular ultrasound and E2 levels to produce quality mature oocytes.',
    },
    {
      step: '03',
      title: 'Ovum Pick-Up & Cleanroom Embryo Culture',
      description: 'Painless egg retrieval followed by advanced ICSI and incubation in tri-gas micro-incubators to Day 5 blastocyst stage.',
    },
    {
      step: '04',
      title: 'Gentle Embryo Transfer & Post-Care',
      description: 'Ultrasound-guided transfer of the top-grade embryo into the prepared endometrium, followed by dedicated luteal phase support.',
    },
  ],
  ctaHeading: 'Ready to Take the First Step on Your Journey to Parenthood?',
  ctaDescription: 'Schedule a confidential consultation with our leading fertility specialists today. Let us help you discover the clearest, most supportive pathway forward.',
  ctaButtonText: 'Book Free Fertility Consultation',
};

export const initialDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Radhika Sharma',
    slug: 'dr-radhika-sharma',
    designation: 'Medical Director & Senior Reproductive Endocrinologist',
    qualification: 'MBBS, MS (OBGYN), Fellowship in Reproductive Medicine (Germany), FICOG',
    experience: '18+ Years Experience',
    specialization: ['Recurrent IVF Failure', 'Low Ovarian Reserve & Poor Responders', 'Endometriosis Management', 'Advanced ART Protocols'],
    shortBio: 'Leading reproductive endocrinologist with over 18 years of clinical expertise in complex IVF cases and recurrent implantation failure.',
    fullBio: 'Dr. Radhika Sharma is the Medical Director at Prisha IVF. Having trained extensively in Germany and premier Indian medical institutions, she is widely recognized for her patient-centric protocols and exceptional success rates in patients with diminished ovarian reserve and advanced maternal age. She has facilitated over 6,500 successful parenthood journeys.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    featured: true,
    published: true,
    displayOrder: 1,
    consultingDays: 'Mon, Tue, Thu, Sat',
    consultingHours: '09:00 AM - 03:00 PM',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Sen',
    slug: 'dr-ananya-sen',
    designation: 'Chief Clinical Embryologist & Lab Director',
    qualification: 'M.Sc, Ph.D. in Clinical Embryology (UK), Senior Embryologist (ESHRE Certified)',
    experience: '15+ Years Experience',
    specialization: ['Class 10,000 Cleanroom Operations', 'ICSI & Piezo-ICSI', 'Blastocyst Culture', 'Vitrification of Gametes & Embryos'],
    shortBio: 'Internationally certified senior embryologist overseeing laboratory protocols, micro-manipulation, and high-survival vitrification.',
    fullBio: 'Dr. Ananya Sen heads the embryology laboratories at Prisha IVF. A certified member of the European Society of Human Reproduction and Embryology (ESHRE), she brings unmatched precision to micromanipulation, laser-assisted hatching, and time-lapse blastocyst monitoring, ensuring world-class laboratory standards.',
    image: 'https://images.unsplash.com/photo-1594824813580-928929e06180?auto=format&fit=crop&w=600&q=80',
    featured: true,
    published: true,
    displayOrder: 2,
    consultingDays: 'Mon - Fri',
    consultingHours: '10:00 AM - 04:00 PM',
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikramaditya Rathore',
    slug: 'dr-vikramaditya-rathore',
    designation: 'Senior Andrologist & Male Infertility Specialist',
    qualification: 'MBBS, MS, MCh (Urology & Andrology), Fellowship in Male Reproductive Microsurgery',
    experience: '14+ Years Experience',
    specialization: ['Azoospermia Treatment', 'Micro-TESE & TESA', 'Varicocele Micro-Surgery', 'Erectile & Ejaculatory Dysfunction'],
    shortBio: 'Distinguished andrologist dedicated to advanced surgical sperm retrieval (Micro-TESE) and comprehensive male fertility treatments.',
    fullBio: 'Dr. Vikramaditya Rathore is a specialized male fertility microsurgeon with deep expertise in non-obstructive azoospermia and severe male factor infertility. His gentle approach and mastery of operating microscopes give renewed hope to couples where male fertility issues are primary barriers.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    featured: true,
    published: true,
    displayOrder: 3,
    consultingDays: 'Tue, Wed, Fri',
    consultingHours: '11:00 AM - 05:00 PM',
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'doc-4',
    name: 'Dr. Meenakshi Joshi',
    slug: 'dr-meenakshi-joshi',
    designation: 'Consultant Reproductive Medicine & High-Risk Pregnancy Care',
    qualification: 'MBBS, DNB (OBGYN), Fellowship in Infertility & Ultrasound (IMA-AMS)',
    experience: '12+ Years Experience',
    specialization: ['PCOS & Ovulatory Disorders', 'Recurrent Miscarriages', 'Pre-Conception Optimization', 'High-Risk Early Pregnancy'],
    shortBio: 'Compassionate fertility clinician specializing in polycystic ovary syndrome (PCOS), recurrent pregnancy loss, and personalized lifestyle medicine.',
    fullBio: 'Dr. Meenakshi Joshi works closely with couples facing unexplained infertility and PCOS. She blends medical ovulation induction with nutritional balancing and psychological readiness, guiding patients safely from positive beta-hCG test through healthy second-trimester handover.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    featured: false,
    published: true,
    displayOrder: 4,
    consultingDays: 'Mon, Wed, Fri, Sat',
    consultingHours: '09:30 AM - 02:30 PM',
  },
  {
    id: 'doc-5',
    name: 'Dr. Rajiv Oberoi',
    slug: 'dr-rajiv-oberoi',
    designation: 'Senior Laparoscopic & Hysteroscopic Pelvic Surgeon',
    qualification: 'MBBS, MS, FMAS, Fellowship in Advanced Pelvic Endoscopy (France)',
    experience: '16+ Years Experience',
    specialization: ['Minimally Invasive Fertility Surgery', 'Septum Resection & Asherman’s', 'Fibroid & Polyp Removal', 'Tubal Recanalization'],
    shortBio: 'Pioneering gynecological endoscopic surgeon correcting uterine anomalies, severe pelvic adhesions, and blocked fallopian tubes.',
    fullBio: 'Dr. Rajiv Oberoi ensures the uterine environment is anatomically optimized prior to embryo transfer. Using ultra-high-definition 4K hysteroscopy and 3D laparoscopy, his minimally invasive corrections significantly elevate embryo implantation rates.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    featured: false,
    published: true,
    displayOrder: 5,
    consultingDays: 'Tue, Thu, Sat',
    consultingHours: '10:00 AM - 03:00 PM',
  },
  {
    id: 'doc-6',
    name: 'Dr. Priya Narang',
    slug: 'dr-priya-narang',
    designation: 'Clinical Embryologist & Reproductive Genetic Counselor',
    qualification: 'M.Sc (Biotechnology), PG Diploma in Reproductive Genetics & Counseling',
    experience: '10+ Years Experience',
    specialization: ['PGT-A / PGT-M Genetic Screening', 'Embryo Biopsy & Tubing', 'Carrier Genetic Screening', 'Cryopreservation Banking'],
    shortBio: 'Expert in pre-implantation genetic counseling, assisting couples with hereditary chromosomal and single-gene disorder risks.',
    fullBio: 'Dr. Priya Narang bridges the gap between laboratory genetics and patient care. She conducts delicate Day-5 trophectoderm biopsies and interprets comprehensive Next-Generation Sequencing (NGS) genetic data to select only euploid, chromosomal normal embryos.',
    image: 'https://images.unsplash.com/photo-1594824813580-928929e06180?auto=format&fit=crop&w=600&q=80',
    featured: false,
    published: true,
    displayOrder: 6,
    consultingDays: 'Mon, Wed, Thu, Fri',
    consultingHours: '11:00 AM - 04:00 PM',
  },
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    name: 'In Vitro Fertilization (IVF)',
    slug: 'ivf',
    shortDescription: 'Advanced assisted reproductive technology combining mature eggs and sperm in a certified Class 10,000 cleanroom laboratory.',
    fullDescription: 'In Vitro Fertilization (IVF) at Prisha IVF is an evidence-based clinical procedure where mature oocytes retrieved from the ovaries are fertilized by sperm within our high-tech cleanroom laboratory. The developing embryos are closely monitored to the Day 5 blastocyst stage before being delicately transferred into the mother’s uterus. Our protocols are individualized to each patient’s ovarian reserve, age, and metabolic markers.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icon: 'Baby',
    category: 'Core ART',
    benefits: [
      'Highest cumulative pregnancy rates for complex infertility',
      'Overcomes severe fallopian tube blockage, endometriosis, and age-related factors',
      'Enables Day 5 blastocyst culture and pre-implantation genetic testing',
      'Provides option for embryo vitrification and future sibling pregnancies',
    ],
    process: [
      { stepNumber: 1, title: 'Ovarian Stimulation', description: 'Personalized hormone injections to mature multiple healthy follicles.' },
      { stepNumber: 2, title: 'Egg Retrieval (OPU)', description: 'Quick, painless 15-minute ultrasound-guided procedure under mild anesthesia.' },
      { stepNumber: 3, title: 'Fertilization & Culture', description: 'Cleanroom incubation in tri-gas benchtop micro-incubators to Day 5.' },
      { stepNumber: 4, title: 'Embryo Transfer', description: 'Gentle, pain-free transfer of the highest-grade blastocyst into the uterus.' },
    ],
    faqs: [
      { question: 'What is the ideal age for IVF?', answer: 'IVF can be performed across reproductive ages. Success rates are highest when begun earlier, but our personalized protocols ensure strong outcomes for women over 35 as well.' },
      { question: 'How many days of bed rest are needed after transfer?', answer: 'Complete bed rest is not medically required. We recommend restful normal routine with no strenuous lifting for 2-3 days.' },
    ],
    seoTitle: 'Best IVF Treatment Clinic in India | Prisha IVF',
    seoDescription: 'Prisha IVF offers world-class In Vitro Fertilization (IVF) with high success rates, certified cleanroom embryology labs, and individualized care.',
    status: 'active',
    displayOrder: 1,
  },
  {
    id: 'srv-2',
    name: 'Intracytoplasmic Sperm Injection (ICSI)',
    slug: 'icsi',
    shortDescription: 'Precision micromanipulation technique where a single healthy sperm is injected directly into a mature egg to overcome male factor infertility.',
    fullDescription: 'Intracytoplasmic Sperm Injection (ICSI) is an advanced micro-fertilization technology designed specifically for couples struggling with severe male factor infertility, including low sperm count (oligospermia), poor motility (asthenospermia), abnormal morphology (teratospermia), or previous poor fertilization with conventional IVF. Our embryologists use precision hydraulic micro-injectors under high-magnification inverted optics.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    icon: 'Microscope',
    category: 'Core ART',
    benefits: [
      'Achieves up to 85% fertilization even with extremely low sperm parameters',
      'Effective with surgically retrieved sperm from Micro-TESE or TESA',
      'Bypasses natural sperm-egg penetration barriers',
      'Recommended in cases of unexplained fertilization failure',
    ],
    process: [
      { stepNumber: 1, title: 'Sperm Preparation', description: 'Density-gradient centrifugation to isolate the most motile, morphologically ideal sperm.' },
      { stepNumber: 2, title: 'Oocyte Denudation', description: 'Gentle removal of cumulus cells to assess the maturity (Metaphase II) of the egg.' },
      { stepNumber: 3, title: 'Micromanipulation Injection', description: 'Immobilizing the selected sperm and delicately injecting it into the egg cytoplasm.' },
      { stepNumber: 4, title: 'Incubation & Monitoring', description: 'Confirming pronuclei formation 16-18 hours post-injection in cleanroom incubators.' },
    ],
    faqs: [
      { question: 'Is ICSI safe for the developing baby?', answer: 'Extensive global medical studies covering hundreds of thousands of births demonstrate that babies born through ICSI are just as healthy as those conceived naturally.' },
    ],
    seoTitle: 'Advanced ICSI Treatment for Male Infertility | Prisha IVF',
    seoDescription: 'Overcome severe male factor infertility with ICSI at Prisha IVF. Single-sperm micro-injection performed by certified senior embryologists.',
    status: 'active',
    displayOrder: 2,
  },
  {
    id: 'srv-3',
    name: 'Intrauterine Insemination (IUI)',
    slug: 'iui',
    shortDescription: 'Gentle, minimally invasive first-line fertility treatment placing concentrated motile sperm directly into the uterus at ovulation.',
    fullDescription: 'Intrauterine Insemination (IUI) is a gentle, natural first-line fertility procedure where washed, concentrated, and highly motile sperm are placed directly into the uterine cavity near the time of ovulation. It is particularly effective for mild male subfertility, cervical mucus hostility, mild endometriosis, and couples with unexplained infertility of shorter duration.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    icon: 'Heart',
    category: 'First-Line ART',
    benefits: [
      'Simple, fast, and completely non-surgical procedure taking just 10 minutes',
      'Significantly lower cost than full IVF cycles',
      'Can be performed in natural cycles or with mild oral ovulation induction',
      'Increases sperm density at the site of natural fertilization',
    ],
    process: [
      { stepNumber: 1, title: 'Cycle Monitoring', description: 'Ultrasound follicle tracking to identify the dominant developing egg.' },
      { stepNumber: 2, title: 'Trigger Shot', description: 'HCG administration to time precise ovulation within 36-38 hours.' },
      { stepNumber: 3, title: 'Sperm Washing', description: 'Laboratory purification of semen sample to concentrate high-speed sperm.' },
      { stepNumber: 4, title: 'Insemination', description: 'Pain-free insertion of soft catheter into the uterus with no anesthesia required.' },
    ],
    faqs: [
      { question: 'Does IUI hurt?', answer: 'No. IUI feels very similar to a routine cervical pap smear, with only momentary mild cramping occasionally reported.' },
    ],
    seoTitle: 'IUI Treatment Cost & Procedure | Prisha IVF Clinic',
    seoDescription: 'Gentle, affordable IUI fertility treatment at Prisha IVF. Expert ovulation tracking and sperm preparation for optimal conception.',
    status: 'active',
    displayOrder: 3,
  },
  {
    id: 'srv-4',
    name: 'Blastocyst Culture & Transfer',
    slug: 'blastocyst-culture',
    shortDescription: 'Culturing embryos to Day 5 or 6 blastocyst stage to select only the most viable embryos with highest implantation potential.',
    fullDescription: 'At Prisha IVF, we specialize in extended Day 5 blastocyst culture. While traditional clinics transfer Day 2 or 3 cleavage embryos, our world-class cleanroom incubators allow embryos to develop until they reach 100-200 cells (blastocyst stage). This natural self-selection ensures only developmentally robust embryos are chosen, dramatically improving pregnancy success per transfer.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    icon: 'Sparkles',
    category: 'Advanced Embryology',
    benefits: [
      'Significantly higher implantation rates (up to 70%+ per transfer)',
      'Allows safe elective Single Embryo Transfer (eSET), virtually eliminating multiple pregnancy risks',
      'Closer physiological timing to the uterus’s natural receptive window',
      'Ideal stage for safe Pre-implantation Genetic Testing (PGT)',
    ],
    process: [
      { stepNumber: 1, title: 'Fertilization Assessment', description: 'Day 1 confirmation of 2PN normal fertilization.' },
      { stepNumber: 2, title: 'Continuous Cleavage Monitoring', description: 'Day 2 and Day 3 evaluation of cell symmetry and fragmentation.' },
      { stepNumber: 3, title: 'Morula to Blastocyst Transition', description: 'Day 4 compaction and Day 5 cavity expansion into inner cell mass.' },
      { stepNumber: 4, title: 'Grading & Transfer/Freeze', description: 'Gardner system grading of inner cell mass and trophectoderm.' },
    ],
    faqs: [
      { question: 'What if an embryo does not reach blastocyst?', answer: 'Embryos that arrest before Day 5 typically carry fatal genetic abnormalities that would have resulted in failed implantation or early miscarriage. Blastocyst culture prevents unnecessary failed transfers.' },
    ],
    seoTitle: 'Day 5 Blastocyst Culture & Single Embryo Transfer | Prisha IVF',
    seoDescription: 'Maximize your IVF success with Day 5 blastocyst culture at Prisha IVF. Superior embryo selection and high implantation rates.',
    status: 'active',
    displayOrder: 4,
  },
  {
    id: 'srv-5',
    name: 'Laser-Assisted Hatching (LAH)',
    slug: 'laser-assisted-hatching',
    shortDescription: 'High-precision infrared diode laser thinning of the embryo outer shell (zona pellucida) to assist hatching and implantation.',
    fullDescription: 'Before an embryo can implant into the uterine lining, it must break out of its protective protein shell (zona pellucida). In women over 35, patients with previous failed IVF cycles, or frozen-thawed embryos with hardened shells, Laser-Assisted Hatching uses an ultra-precise diode laser beam to gently create a microscopic breach, making natural hatching and uterine adhesion significantly easier.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icon: 'Zap',
    category: 'Advanced Embryology',
    benefits: [
      'Proven higher implantation rates for women 35+ and frozen-thawed cycles',
      'Micro-second computer-guided laser pulse ensures zero thermal damage to embryonic cells',
      'Critical breakthrough for couples with unexplained implantation failure',
      'Performed right before embryo transfer in sterile conditions',
    ],
    process: [
      { stepNumber: 1, title: 'Microscopic Alignment', description: 'Blastocyst positioned on holding pipette under 400x inverted microscope.' },
      { stepNumber: 2, title: 'Laser Pulse Targeting', description: 'Computer software aims infrared pulse at the non-cellular zona sector.' },
      { stepNumber: 3, title: 'Zona Thinning', description: 'Precise 1.5 millisecond beam micro-thins outer layer without touching inner cells.' },
      { stepNumber: 4, title: 'Transfer Prep', description: 'Hatched embryo immediately placed in transfer catheter for uterine placement.' },
    ],
    faqs: [
      { question: 'Does the laser harm the embryo?', answer: 'No. The laser fires for only a fraction of a millisecond and is focused exclusively on the non-living outer coat, far away from the embryo’s inner cell mass.' },
    ],
    seoTitle: 'Laser Assisted Hatching (LAH) IVF | Prisha IVF',
    seoDescription: 'Boost embryo implantation with Laser-Assisted Hatching at Prisha IVF. Safe, computer-guided diode laser technology for higher success.',
    status: 'active',
    displayOrder: 5,
  },
  {
    id: 'srv-6',
    name: 'Egg Freezing (Oocyte Cryopreservation)',
    slug: 'egg-freezing',
    shortDescription: 'State-of-the-art flash-freezing (vitrification) of unfertilized eggs to preserve future biological fertility and family planning flexibility.',
    fullDescription: 'Social and medical egg freezing at Prisha IVF allows women to preserve their healthiest, most youthful eggs for future parenthood. Using ultra-rapid vitrification at -196°C in liquid nitrogen, we prevent ice crystal formation, achieving post-thaw egg survival rates of over 95%. It empowers women navigating career aspirations, late marriage, or medical treatments like chemotherapy.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    icon: 'Snowflake',
    category: 'Fertility Preservation',
    benefits: [
      'Preserves current egg biological age and genetic quality indefinitely',
      'Provides peace of mind and family planning on your own timeline',
      'Over 95% survival rate utilizing modern liquid nitrogen vitrification',
      'Zero deterioration in egg health over years of cryo-storage',
    ],
    process: [
      { stepNumber: 1, title: 'Ovarian Reserve Testing', description: 'AMH blood test and antral follicle count (AFC) ultrasound.' },
      { stepNumber: 2, title: 'Hormonal Stimulation', description: '10-12 days of mild injections to mature multiple healthy eggs.' },
      { stepNumber: 3, title: 'Egg Retrieval', description: 'Pain-free, needle-guided aspiration of follicular fluid under light sedation.' },
      { stepNumber: 4, title: 'Ultra-Rapid Vitrification', description: 'Dehydration with cryoprotectants and immediate immersion into -196°C storage tanks.' },
    ],
    faqs: [
      { question: 'How long can eggs remain frozen?', answer: 'Indefinitely. Studies show that eggs frozen for 10+ years have virtually identical fertilization and pregnancy outcomes to freshly retrieved eggs.' },
    ],
    seoTitle: 'Egg Freezing Cost & Process in India | Prisha IVF',
    seoDescription: 'Preserve your fertility with world-class egg freezing at Prisha IVF. High vitrification survival rates and secure bio-banking.',
    status: 'active',
    displayOrder: 6,
  },
  {
    id: 'srv-7',
    name: 'Embryo Freezing & Vitrification',
    slug: 'embryo-freezing',
    shortDescription: 'Cryopreservation of surplus high-grade blastocysts for future frozen embryo transfers (FET) or sibling planning.',
    fullDescription: 'Embryo vitrification enables couples to store surplus high-grade blastocysts resulting from an IVF cycle. In many instances, doing a Frozen Embryo Transfer (FET) in a subsequent cycle produces higher pregnancy rates than a fresh transfer, because the woman’s uterine endometrium is free from high stimulation hormone levels. Vitrified embryos remain viable for decades.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    icon: 'Shield',
    category: 'Fertility Preservation',
    benefits: [
      'Higher pregnancy rates with Frozen Embryo Transfer (FET)',
      'Eliminates the need for repeated ovarian stimulation injections for future pregnancies',
      'Virtually zero risk of Ovarian Hyperstimulation Syndrome (OHSS)',
      'Secure 24/7 monitored cryogenic bio-repository tanks',
    ],
    process: [
      { stepNumber: 1, title: 'Blastocyst Selection', description: 'Strict quality criteria applied to select only resilient, top-grade embryos.' },
      { stepNumber: 2, title: 'Cryoprotectant Bath', description: 'Gradual replacement of cellular water to eliminate ice crystallization risk.' },
      { stepNumber: 3, title: 'Flash Vitrification', description: 'Instantaneous cooling rate of -20,000°C/minute onto specialized micro-straws.' },
      { stepNumber: 4, title: 'Bio-Bank Storage', description: 'Secure alphanumeric cataloging in alarmed liquid nitrogen vapor containers.' },
    ],
    faqs: [
      { question: 'Is a frozen embryo transfer better than fresh?', answer: 'For many women, yes. The uterus is in a much more natural, receptive state during an FET cycle compared to the high-estrogen state of a fresh stimulation cycle.' },
    ],
    seoTitle: 'Embryo Vitrification & Frozen Embryo Transfer | Prisha IVF',
    seoDescription: 'Safe, advanced embryo freezing at Prisha IVF. Over 98% thaw survival rates with continuous cryogenic bio-monitoring.',
    status: 'active',
    displayOrder: 7,
  },
  {
    id: 'srv-8',
    name: 'PGD / PGS Genetic Screening',
    slug: 'pgd-pgs-genetic-screening',
    shortDescription: 'Pre-implantation genetic testing (PGT-A / PGT-M) on blastocyst biopsies to screen for chromosomal abnormalities and inherited conditions.',
    fullDescription: 'Pre-implantation Genetic Testing (PGT) represents the frontier of modern reproductive genetics. By taking a microscopic biopsy of 4-6 trophectoderm cells from a Day 5 blastocyst, our geneticists perform Next-Generation Sequencing (NGS) to evaluate all 23 pairs of chromosomes. This ensures only euploid (chromosomally balanced) embryos are transferred, drastically lowering miscarriage risks.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icon: 'Dna',
    category: 'Reproductive Genetics',
    benefits: [
      'Dramatically reduces miscarriage rates from chromosomal aneuploidies',
      'Significantly shortens the time to achieve a successful pregnancy',
      'Prevents transmission of serious single-gene hereditary disorders (PGT-M)',
      'Vital for women aged 35+ and couples with recurrent pregnancy loss',
    ],
    process: [
      { stepNumber: 1, title: 'Blastocyst Biopsy', description: 'Laser-assisted detachment of 4-6 outer trophectoderm cells on Day 5.' },
      { stepNumber: 2, title: 'Embryo Vitrification', description: 'Biopsied embryo safely frozen while DNA analysis is performed.' },
      { stepNumber: 3, title: 'Next-Gen Sequencing (NGS)', description: 'Comprehensive whole-genome chromosomal scanning in certified genetics lab.' },
      { stepNumber: 4, title: 'Targeted Euploid Transfer', description: 'Selected genetically normal embryo thawed and transferred in next cycle.' },
    ],
    faqs: [
      { question: 'Does biopsy damage the baby?', answer: 'No. The biopsy takes cells exclusively from the trophectoderm (which later forms the placenta), leaving the inner cell mass (which forms the baby) untouched.' },
    ],
    seoTitle: 'PGT-A Genetic Screening for IVF Embryos | Prisha IVF',
    seoDescription: 'Eliminate chromosomal abnormalities and reduce miscarriage risk with PGT-A genetic screening at Prisha IVF.',
    status: 'active',
    displayOrder: 8,
  },
  {
    id: 'srv-9',
    name: 'Advanced Laparoscopy Surgery',
    slug: 'laparoscopy',
    shortDescription: 'Minimally invasive keyhole surgery to diagnose and correct pelvic factors like severe endometriosis, fibroids, cysts, and tubal blocks.',
    fullDescription: 'Fertility laparoscopy at Prisha IVF is a keyhole surgical procedure performed through tiny 5mm incisions. Using high-definition 4K endoscopic cameras, our senior pelvic surgeons visualize the reproductive organs with extreme clarity, allowing delicate removal of endometriotic cysts, adhesiolysis, myomectomy (fibroid removal), and tubal repair to restore fertility naturally or prepare for IVF.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    icon: 'Activity',
    category: 'Fertility Surgery',
    benefits: [
      'Day-care or overnight procedure with rapid 24-48 hour recovery',
      'Clears pelvic inflammation and severe anatomical distortions',
      'High-precision preservation of healthy ovarian tissue (cortex sparing)',
      'Proven to increase natural conception and IVF success rates',
    ],
    process: [
      { stepNumber: 1, title: 'Pre-Op Evaluation', description: '3D Pelvic ultrasound and surgical clearance.' },
      { stepNumber: 2, title: 'Keyhole Entry', description: 'Gentle 5mm umbilical and lower abdominal ports under general anesthesia.' },
      { stepNumber: 3, title: 'Corrective Surgery', description: 'Laser or bipolar excision of endometriosis, adhesions, or fibroids.' },
      { stepNumber: 4, title: 'Post-Op Discharge', description: 'Same-day mobilization and discharge with comprehensive recovery guidance.' },
    ],
    faqs: [
      { question: 'How soon can I try to conceive after laparoscopy?', answer: 'Depending on the extent of surgical correction, most couples can begin natural attempts or their IVF protocol within 4 to 6 weeks.' },
    ],
    seoTitle: 'Fertility Laparoscopic Surgery Center | Prisha IVF',
    seoDescription: 'Minimally invasive fertility surgery for endometriosis, fibroids, and blocked tubes by senior gynecological surgeons at Prisha IVF.',
    status: 'active',
    displayOrder: 9,
  },
  {
    id: 'srv-10',
    name: 'Diagnostic & Operative Hysteroscopy',
    slug: 'hysteroscopy',
    shortDescription: 'Direct endoscopic visualization and micro-correction of the uterine cavity to optimize endometrial lining for embryo implantation.',
    fullDescription: 'The uterus is the cradle for your future baby. Hysteroscopy at Prisha IVF allows our fertility specialists to inspect the uterine cavity without any external cuts. Using an ultra-slim 2.9mm hysteroscope, we diagnose and simultaneously treat uterine septums, endometrial polyps, sub-mucosal fibroids, chronic endometritis, and intrauterine adhesions (Asherman’s syndrome) that prevent embryo implantation.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    icon: 'Eye',
    category: 'Fertility Surgery',
    benefits: [
      'Gold standard for optimizing uterine receptivity prior to embryo transfer',
      'Zero surgical scars; performed via natural cervical canal',
      'Can resolve recurrent implantation failure and repeated early miscarriages',
      'Same-day day-care procedure with virtually zero downtime',
    ],
    process: [
      { stepNumber: 1, title: 'Cervical Insertion', description: 'Gentle introduction of mini-hysteroscope with saline distension.' },
      { stepNumber: 2, title: 'Cavity Inspection', description: 'Full 360-degree high-definition review of endometrial architecture.' },
      { stepNumber: 3, title: 'Micro-Intervention', description: 'Scissors or resectoscope removal of any polyps, synechiae, or septa.' },
      { stepNumber: 4, title: 'Recovery', description: 'Patient walks home within 2 hours with minimal discomfort.' },
    ],
    faqs: [
      { question: 'Is hysteroscopy done under anesthesia?', answer: 'Diagnostic hysteroscopy is often performed with mild local sedation, while operative procedures use short, safe general anesthesia for total patient comfort.' },
    ],
    seoTitle: 'Uterine Hysteroscopy Treatment | Prisha IVF',
    seoDescription: 'Expert diagnostic and operative hysteroscopy at Prisha IVF. Correct uterine polyps, septa, and adhesions for optimal implantation.',
    status: 'active',
    displayOrder: 10,
  },
  {
    id: 'srv-11',
    name: 'Male Infertility & Micro-TESE',
    slug: 'male-infertility',
    shortDescription: 'Specialized andrological evaluation, hormonal therapy, and micro-surgical sperm retrieval for severe male factor subfertility and azoospermia.',
    fullDescription: 'Male infertility accounts for nearly 40-50% of conception challenges. Prisha IVF features a dedicated Andrology and Male Reproductive Microsurgery unit led by senior andrologists. From advanced Semen DNA Fragmentation Index (DFI) testing and lifestyle optimization to microscopic testicular sperm extraction (Micro-TESE) for non-obstructive azoospermia, we provide hope even when zero sperm are found in regular semen analysis.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    icon: 'ShieldAlert',
    category: 'Male Fertility',
    benefits: [
      'Overcomes non-obstructive and obstructive azoospermia',
      'High-magnification surgical microscopes isolate isolated sperm-producing tubules',
      'Comprehensive hormone balancing and lifestyle protocols',
      'Sperm retrieved can be immediately used for ICSI or cryopreserved',
    ],
    process: [
      { stepNumber: 1, title: 'Andrological Workup', description: 'Hormonal profile (FSH, LH, Testosterone), karyotype, and Y-chromosome microdeletion test.' },
      { stepNumber: 2, title: 'Medical Therapy', description: '3-6 months targeted antioxidant and endocrine therapy where applicable.' },
      { stepNumber: 3, title: 'Micro-TESE Surgery', description: 'Operating microscope dissection of testicular tissue under general anesthesia.' },
      { stepNumber: 4, title: 'Embryologist Search', description: 'Simultaneous benchtop search to isolate and vitrify viable sperm for ICSI.' },
    ],
    faqs: [
      { question: 'Can a man with zero sperm have his biological child?', answer: 'Yes! In many men with non-obstructive azoospermia, focal pockets of sperm production still exist in the testicles. Micro-TESE successfully locates viable sperm in up to 55-60% of cases.' },
    ],
    seoTitle: 'Male Infertility & Micro-TESE Treatment | Prisha IVF',
    seoDescription: 'Dedicated male fertility unit at Prisha IVF. Advanced Micro-TESE, DFI testing, and andrology surgical solutions for azoospermia.',
    status: 'active',
    displayOrder: 11,
  },
  {
    id: 'srv-12',
    name: 'Female Infertility & PCOS Protocol',
    slug: 'female-infertility',
    shortDescription: 'Tailored clinical management for Polycystic Ovarian Syndrome (PCOS), diminished ovarian reserve, advanced maternal age, and tubal factors.',
    fullDescription: 'Female reproductive health involves an intricate hormonal symphony. At Prisha IVF, our reproductive endocrinologists specialize in evidence-based management of PCOS, low AMH (poor ovarian reserve), hyperprolactinemia, thyroid imbalances, and unexplained infertility. We avoid hyperstimulation risks through gentle antagonist regimens, dual triggers, and holistic metabolic support.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icon: 'HeartHandshake',
    category: 'Female Fertility',
    benefits: [
      'Customized mild stimulation protocols to prevent OHSS in PCOS patients',
      'Nutritional and metabolic counseling for insulin resistance',
      'Specialized low-dose protocols for low AMH and diminished reserve',
      'Close follicular monitoring with high-resolution Doppler ultrasound',
    ],
    process: [
      { stepNumber: 1, title: 'Hormonal Mapping', description: 'Day 2 FSH, LH, Estradiol, AMH, Prolactin, and Thyroid screening.' },
      { stepNumber: 2, title: 'Sonographic Evaluation', description: 'Antral follicle count and 3D uterine endometrial assessment.' },
      { stepNumber: 3, title: 'Stepwise Therapy', description: 'Ovulation induction, IUI, or specialized IVF with antagonist protocol.' },
      { stepNumber: 4, title: 'Luteal Support', description: 'Targeted progesterone and vascular support for successful implantation.' },
    ],
    faqs: [
      { question: 'Can I get pregnant if I have PCOS?', answer: 'Absolutely. PCOS is one of the most treatable causes of female infertility. Over 85% of women with PCOS achieve a healthy pregnancy with appropriate medical support.' },
    ],
    seoTitle: 'Female Infertility & PCOS Treatment | Prisha IVF',
    seoDescription: 'Specialized fertility treatments for women with PCOS, low AMH, and hormonal imbalances at Prisha IVF. Evidence-based clinical protocols.',
    status: 'active',
    displayOrder: 12,
  },
  {
    id: 'srv-13',
    name: 'Comprehensive Fertility Assessment',
    slug: 'fertility-assessment',
    shortDescription: 'All-inclusive couple fertility evaluation package completed in one single visit to uncover your reproductive status clearly.',
    fullDescription: 'Knowledge is empowerment. Our Comprehensive Couple Fertility Assessment at Prisha IVF provides both partners with a rapid, detailed medical evaluation in one coordinated morning appointment. It encompasses high-resolution transvaginal sonography, detailed semen analysis, and key ovarian reserve hormone testing to give you immediate answers and proactive reproductive planning.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    icon: 'FileText',
    category: 'Diagnostics',
    benefits: [
      'Completed in a single 2-hour appointment with zero delays',
      'Clear, transparent medical summary and personalized recommendation report',
      'Covers both male and female biological parameters simultaneously',
      'Non-invasive, confidential, and comfortable clinical environment',
    ],
    process: [
      { stepNumber: 1, title: 'Clinical History', description: '30-minute in-depth consultation with senior fertility consultant.' },
      { stepNumber: 2, title: 'Female Screening', description: 'Pelvic 3D ultrasound for uterus and ovaries + AMH blood draw.' },
      { stepNumber: 3, title: 'Male Screening', description: 'WHO-standard semen analysis evaluating count, motility, and vitality.' },
      { stepNumber: 4, title: 'Review & Roadmap', description: 'Follow-up discussion detailing findings and tailored treatment options.' },
    ],
    faqs: [
      { question: 'When should a couple seek a fertility assessment?', answer: 'If you have been trying to conceive for 12 months without success (or 6 months if the female partner is 35 or older), scheduling an assessment is recommended.' },
    ],
    seoTitle: 'Couple Fertility Assessment Package | Prisha IVF',
    seoDescription: 'Get complete fertility clarity in a single visit at Prisha IVF. Comprehensive diagnostic assessment for both partners with specialist review.',
    status: 'active',
    displayOrder: 13,
  },
  {
    id: 'srv-14',
    name: 'Fertility Consultation & Second Opinion',
    slug: 'fertility-consultation',
    shortDescription: 'In-depth clinical consultation with our medical directors to review previous failed cycles and map an evidence-based pathway forward.',
    fullDescription: 'Experiencing failed IVF cycles or confusing medical advice can be emotionally overwhelming. At Prisha IVF, we offer dedicated 45-minute second opinion consultations. Our senior medical directors review your previous stimulation charts, embryology lab records, and surgical reports to provide clear, unbiased clinical clarity on what can be adjusted to transform your outcome.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    icon: 'MessageSquare',
    category: 'Consultation',
    benefits: [
      'Comprehensive 45-minute one-on-one session with senior medical director',
      'Unbiased, thorough audit of previous failed IVF stimulation & embryology data',
      'Clear explanation of alternative protocols and novel ART options',
      'Available in-person at our clinic or via secure telemedicine video consultation',
    ],
    process: [
      { stepNumber: 1, title: 'Record Submission', description: 'Secure upload of past medical history and test results.' },
      { stepNumber: 2, title: 'Case Audit', description: 'Our specialist team reviews dosage, blastocyst morphology, and endometrium logs.' },
      { stepNumber: 3, title: 'Consultation Session', description: 'Honest, in-depth conversation exploring root causes and novel solutions.' },
      { stepNumber: 4, title: 'Written Action Plan', description: 'Personalized treatment roadmap provided for your next steps.' },
    ],
    faqs: [
      { question: 'Can I do a video consultation if I live outside the city?', answer: 'Yes! We regularly conduct telemedicine fertility consultations for outstation and international couples.' },
    ],
    seoTitle: 'Fertility Consultation & Second Opinion | Prisha IVF',
    seoDescription: 'Book an expert second opinion fertility consultation at Prisha IVF. Comprehensive audit of previous failed cycles with senior medical directors.',
    status: 'active',
    displayOrder: 14,
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Understanding IVF: A Step-by-Step Medical Guide for Hopeful Parents',
    slug: 'understanding-ivf-step-by-step-medical-guide',
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Demystifying the In Vitro Fertilization journey: from initial ovarian stimulation and egg pick-up to cleanroom embryology and embryo transfer.',
    content: `For many couples encountering reproductive challenges, the term "IVF" can feel daunting. However, when broken down into logical clinical phases, In Vitro Fertilization is simply an extraordinary collaboration between modern reproductive biology and compassionate medicine.

### Phase 1: Ovarian Stimulation & Monitoring
In a natural monthly cycle, a woman typically matures and releases only one egg. In an IVF cycle, the goal is to gently encourage multiple follicles to mature safely. Under daily ultrasound monitoring and estradiol blood tests, individualized gonadotropin injections are titrated over 9 to 12 days.

### Phase 2: Painless Egg Retrieval (OPU)
Once follicles reach mature dimensions (18-20mm), an hCG or GnRH trigger injection is administered. Exactly 35-36 hours later, our specialist performs the retrieval under short, gentle intravenous sedation. Using a fine needle guided by transvaginal ultrasound, the follicular fluid is collected and immediately handed over to the waiting embryologist in our adjacent Class 10,000 cleanroom.

### Phase 3: Cleanroom Embryology & Blastocyst Culture
The retrieved eggs are prepared and fertilized using conventional IVF or ICSI. At Prisha IVF, we emphasize extended culture to Day 5 blastocyst stage. Developing inside specialized benchtop incubators that replicate the human fallopian tube with precise oxygen and carbon dioxide ratios, embryos are graded on cell count and cohesion.

### Phase 4: Gentle Embryo Transfer
The pinnacle of the cycle is the transfer. Guided by abdominal ultrasound so you can watch on screen, a microscopic, pliable catheter carries the selected embryo directly into the receptive mid-cavity of the uterus. The procedure is entirely pain-free, requiring no anesthesia and taking less than five minutes.

With today’s advanced laboratory standards, cumulative pregnancy rates across 2-3 transfers frequently exceed 75%. Remember, facing fertility challenges is not the end of your story—it is simply the beginning of your journey with expert guidance.`,
    author: 'Dr. Radhika Sharma',
    authorRole: 'Medical Director, Prisha IVF',
    category: 'IVF & Treatments',
    tags: ['IVF Process', 'Fertility Guide', 'Cleanroom Lab', 'Blastocyst'],
    published: true,
    featured: true,
    publishDate: '2026-08-15',
    readTime: '6 min read',
    seoTitle: 'Understanding IVF Step-by-Step Guide | Prisha IVF',
    seoDescription: 'Comprehensive step-by-step medical guide explaining the IVF process, egg retrieval, cleanroom embryology, and transfer at Prisha IVF.',
  },
  {
    id: 'blog-2',
    title: 'The Crucial Role of Blastocyst Culture in Boosting IVF Success Rates',
    slug: 'crucial-role-of-blastocyst-culture-in-ivf-success',
    featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Why culturing embryos to Day 5 blastocyst stage significantly improves implantation rates and enables safe single-embryo transfer.',
    content: `Historically in IVF, embryos were transferred back to the uterus on Day 2 or Day 3, when they were only at the 4-to-8 cell stage. While this achieved pregnancies, it also led to higher failure rates and prompted physicians to transfer three or four embryos at once, resulting in risky triplet and quadruplet pregnancies.

### What is a Blastocyst?
By Day 5 or 6, a fertilized embryo transitions from a simple cluster of dividing cells into an organized, hollow ball of 100 to 200 cells known as a blastocyst. It possesses two distinct structures:
1. **The Inner Cell Mass (ICM)**: The cells that will develop into the fetus.
2. **The Trophectoderm (TE)**: The outer layer that will form the placenta and amniotic sac.

### Why Day 5 Transfer Outperforms Day 3
- **Natural Biological Synchronization**: In natural conception, a Day 3 embryo is still traveling down the fallopian tube. It only reaches the uterine cavity around Day 5. Transferring at blastocyst stage matches nature's timing.
- **Genetic Self-Selection**: Many embryos that carry severe genetic or chromosomal abnormalities arrest naturally between Day 3 and Day 4. Only embryos with intact developmental potential can form a robust blastocyst.
- **Safe Single Embryo Transfer (eSET)**: Because a top-grade blastocyst has an individual implantation potential of 60-70%, we can transfer just one embryo with confidence, eliminating the medical hazards of multiple gestations.`,
    author: 'Dr. Ananya Sen',
    authorRole: 'Chief Embryologist, Prisha IVF',
    category: 'Embryology Insights',
    tags: ['Blastocyst', 'Embryo Grading', 'Lab Standards', 'Success Rates'],
    published: true,
    featured: true,
    publishDate: '2026-08-02',
    readTime: '5 min read',
    seoTitle: 'Why Blastocyst Culture Increases IVF Success | Prisha IVF',
    seoDescription: 'Learn how Day 5 blastocyst culture and advanced incubator technology maximize embryo implantation and enable single embryo transfer.',
  },
  {
    id: 'blog-3',
    title: 'Demystifying Ovarian Reserve: AMH, AFC, and Your Biological Clock',
    slug: 'demystifying-ovarian-reserve-amh-afc-biological-clock',
    featuredImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'What Anti-Müllerian Hormone (AMH) and Antral Follicle Count (AFC) actually measure, and how modern protocols help women with low reserve.',
    content: `Few blood tests generate as much emotional anxiety among fertility patients as Anti-Müllerian Hormone (AMH). When a woman receives a report indicating "Low AMH," the immediate psychological fear is that pregnancy has become impossible.

Let us clarify the medical reality: **AMH measures the quantity of remaining eggs, not their individual genetic quality.**

### The Biology of Ovarian Reserve
Women are born with their lifetime supply of eggs, which gradually declines over time. AMH is produced by the granulosa cells of small growing follicles in the ovary. 
- A high AMH (above 3.5 ng/mL) frequently points toward Polycystic Ovarian Syndrome (PCOS).
- A normal AMH ranges between 1.5 and 3.5 ng/mL.
- Low AMH is generally considered below 1.1 ng/mL.

### Does Low AMH Mean You Cannot Conceive?
No. Every month, a woman only needs one good, chromosomally normal egg to achieve a healthy pregnancy. While low AMH indicates that fewer eggs will be retrieved in an IVF stimulation cycle, the genetic quality of those eggs depends primarily on maternal age and mitochondrial health.

At Prisha IVF, we utilize specialized **Mild Stimulation**, **DHEA/CoQ10 priming**, and **Dual Stimulation (DuoStim)** protocols specifically designed to optimize egg yield for women with low AMH without exhausting their emotional and financial reserves.`,
    author: 'Dr. Meenakshi Joshi',
    authorRole: 'Consultant Reproductive Medicine, Prisha IVF',
    category: 'Female Fertility',
    tags: ['Ovarian Reserve', 'Low AMH', 'Egg Quality', 'PCOS'],
    published: true,
    featured: false,
    publishDate: '2026-07-20',
    readTime: '7 min read',
    seoTitle: 'Understanding Low AMH and Ovarian Reserve | Prisha IVF',
    seoDescription: 'Understand what AMH and AFC tests reveal about your fertility and how Prisha IVF protocols help women with low ovarian reserve conceive.',
  },
  {
    id: 'blog-4',
    title: 'Male Factor Infertility: Overcoming Low Sperm Count & Motility with ICSI',
    slug: 'male-factor-infertility-overcoming-low-sperm-count-with-icsi',
    featuredImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Modern andrology solutions for male infertility, including DNA fragmentation index, Micro-TESE surgical retrieval, and ICSI.',
    content: `For decades, societal misconceptions placed the primary focus of fertility investigations on women. In clinical reality, male factors contribute to nearly 50% of all infertility cases.

Fortunately, reproductive andrology has made unprecedented technological leaps. Even in cases where a semen analysis shows near-zero sperm count or zero motility, biological fatherhood is achievable.

### Understanding Semen Parameters
A comprehensive semen analysis evaluates:
- **Count**: Normal is 15+ million sperm per milliliter.
- **Motility**: At least 40% should be moving forward actively.
- **Morphology**: At least 4% should have normal head and tail architecture according to strict Kruger criteria.
- **DNA Fragmentation Index (DFI)**: Evaluates the structural integrity of genetic material inside the sperm head.

### The Power of ICSI & Micro-TESE
In standard IVF, 50,000 sperm are placed in a dish with an egg, hoping one will penetrate. When sperm count or motility is compromised, this natural penetration often fails. 

With **ICSI (Intracytoplasmic Sperm Injection)**, our embryologist selects one single, motile, morphologically optimal sperm and directly micro-injects it into the egg cytoplasm under 400x magnification. 

For men with **Azoospermia (no sperm in ejaculate)**, our andrologists perform **Micro-TESE**, using an operating microscope to inspect the seminiferous tubules and locate isolated pockets of sperm production. These sperm can then be vitrified or immediately utilized for ICSI.`,
    author: 'Dr. Vikramaditya Rathore',
    authorRole: 'Senior Andrologist, Prisha IVF',
    category: 'Male Fertility',
    tags: ['Male Infertility', 'Low Sperm Count', 'Micro-TESE', 'ICSI'],
    published: true,
    featured: false,
    publishDate: '2026-07-08',
    readTime: '6 min read',
    seoTitle: 'Male Infertility & ICSI Solutions | Prisha IVF',
    seoDescription: 'Learn how modern andrology, ICSI, and Micro-TESE surgical sperm retrieval overcome male factor infertility at Prisha IVF.',
  },
  {
    id: 'blog-5',
    title: 'Egg Freezing in Your 20s & 30s: What Every Modern Woman Should Know',
    slug: 'egg-freezing-in-your-20s-and-30s-complete-guide',
    featuredImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'A practical, empowering guide to elective egg freezing, vitrification technology, costs, and timeline planning.',
    content: `Fertility preservation through oocyte cryopreservation (egg freezing) has evolved from an experimental procedure into an empowering medical technology. Today, women are pursuing higher education, building businesses, and prioritizing emotional compatibility before starting families.

Egg freezing allows you to "lock in" the biological age of your eggs today, preserving their youthful chromosomal integrity for whenever you feel ready for parenthood.

### When is the Ideal Time to Freeze?
Biologically, the highest yield of genetically normal eggs is retrieved between ages 25 and 35. Freezing before 35 typically requires fewer stimulation cycles to bank the recommended 15 to 20 mature oocytes needed for a high likelihood of future live birth.

### The Freezing Process in 3 Steps
1. **Initial Assessment**: An AMH blood test and transvaginal ultrasound to measure your baseline ovarian reserve.
2. **10-Day Stimulation**: Subcutaneous hormone injections given daily with tiny insulin needles to mature multiple follicles.
3. **Painless Retrieval**: Under a short 15-minute sleep sedation, eggs are collected and immediately flash-frozen at -196°C using vitrification.

There is zero biological deterioration over time in liquid nitrogen, giving you true peace of mind and freedom of choice.`,
    author: 'Dr. Radhika Sharma',
    authorRole: 'Medical Director, Prisha IVF',
    category: 'Fertility Preservation',
    tags: ['Egg Freezing', 'Oocyte Cryopreservation', 'Women Health', 'Family Planning'],
    published: true,
    featured: false,
    publishDate: '2026-06-25',
    readTime: '5 min read',
    seoTitle: 'Complete Guide to Egg Freezing in 20s & 30s | Prisha IVF',
    seoDescription: 'Empowering guide on elective egg freezing, ideal biological timing, and vitrification technology at Prisha IVF clinic.',
  },
  {
    id: 'blog-6',
    title: 'Nutrition and Lifestyle Strategies to Optimize Embryo Implantation',
    slug: 'nutrition-and-lifestyle-strategies-to-optimize-embryo-implantation',
    featuredImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Evidence-based dietary habits, micronutrients, and lifestyle adjustments that support healthy endometrial receptivity and uterine blood flow.',
    content: `While clinical protocols and embryology cleanroom standards are paramount, the cellular environment of your body plays a powerful supporting role during embryo transfer.

### 1. The Mediterranean Dietary Pattern
Clinical research repeatedly highlights that a Mediterranean-style dietary pattern—rich in anti-inflammatory monounsaturated fats (extra virgin olive oil, avocados, nuts), leafy greens, berries, and clean proteins—promotes optimal blood perfusion to the uterine endometrium and reduces systemic inflammatory cytokines.

### 2. Key Micronutrients for Endometrial Health
- **Methylfolate**: Active form of Vitamin B9 for cell division and vascular support.
- **Vitamin D3**: Regulates local immune tolerance in the uterine endometrium. Optimal blood levels should be 40-60 ng/mL.
- **CoQ10 (Ubiquinol)**: Crucial for mitochondrial ATP energy production in developing oocytes and early dividing cells.
- **L-Arginine & Vitamin E**: Clinically observed to improve thin endometrial lining thickness.

### 3. Mind-Body Stress Reduction
High cortisol and adrenaline levels cause peripheral vasoconstriction, potentially reducing blood flow to the reproductive organs. Gentle walks, restful 8-hour sleep cycles, and daily diaphragmatic breathing soothe the autonomic nervous system, optimizing the receptive window.`,
    author: 'Dr. Meenakshi Joshi',
    authorRole: 'Consultant Infertility Specialist, Prisha IVF',
    category: 'Lifestyle & Wellness',
    tags: ['Implantation Diet', 'Endometrial Receptivity', 'Fertility Nutrition', 'Wellness'],
    published: true,
    featured: false,
    publishDate: '2026-06-12',
    readTime: '6 min read',
    seoTitle: 'Fertility Diet and Embryo Implantation Tips | Prisha IVF',
    seoDescription: 'Discover evidence-based nutrition, micronutrients, and lifestyle adjustments to support embryo implantation and uterine receptivity.',
  },
  {
    id: 'blog-7',
    title: 'Navigating the Two-Week Wait (2WW): Emotional Care & Early Symptoms',
    slug: 'navigating-the-two-week-wait-emotional-care-and-early-symptoms',
    featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'How to manage the emotional rollercoaster between embryo transfer and your pregnancy blood test, and what symptoms actually mean.',
    content: `Ask any patient who has undergone IVF, and they will tell you that the most psychologically taxing period of the entire journey is not the injections or the egg retrieval—it is the "Two-Week Wait" (2WW).

This is the 10-to-14 day window between your embryo transfer and the definitive serum Beta-hCG blood test.

### What Symptoms Should You Expect?
Many patients hyper-analyze every bodily twinge:
- Mild cramping and lower back fullness are common and usually caused by progesterone support and mild uterine settling.
- Light spotting or pink discharge around Day 3 to Day 6 post-transfer can be normal implantation spotting.
- Breast tenderness and mild nausea are very frequently side effects of oral and vaginal progesterone medication, not necessarily early pregnancy.
- **Crucial note**: Having zero symptoms is completely normal as well! Many successful pregnancies begin with absolutely no physical sensations during the 2WW.

### Practical Coping Strategies
1. **Do not take early urine pregnancy tests (UPTs)**: Early home tests frequently produce false negatives or false positives (from residual trigger injection hCG), causing unnecessary heartbreak.
2. **Engage in gentle distraction**: Watch lighthearted movies, read books, and continue peaceful, non-strenuous daily routines.
3. **Reach out to our counselor**: Prisha IVF provides dedicated counseling sessions during the 2WW to help you ground your emotions in calmness and hope.`,
    author: 'Dr. Radhika Sharma',
    authorRole: 'Medical Director, Prisha IVF',
    category: 'Emotional Wellness',
    tags: ['Two Week Wait', '2WW', 'Beta hCG', 'Emotional Support'],
    published: true,
    featured: false,
    publishDate: '2026-05-28',
    readTime: '5 min read',
    seoTitle: 'Surviving the Two Week Wait (2WW) After IVF | Prisha IVF',
    seoDescription: 'Compassionate guidance on managing emotions, understanding early symptoms, and waiting for your Beta-hCG test after embryo transfer.',
  },
  {
    id: 'blog-8',
    title: 'How Pre-implantation Genetic Testing (PGT-A) Prevents Recurrent IVF Failures',
    slug: 'how-pgt-a-genetic-testing-prevents-recurrent-ivf-failures',
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Deep-dive into Next-Generation Sequencing (NGS) and chromosomal screening to identify euploid embryos and stop recurrent miscarriages.',
    content: `When a visibly "grade A" embryo fails to implant, or results in a heartbreaking early chemical pregnancy or miscarriage, the question is always: *Why did this happen?*

In over 70% of early pregnancy losses, the underlying cause is not the mother’s uterus or hormones—it is a microscopic chromosomal aneuploidy (an abnormal number of chromosomes) inside the embryo that cannot be seen with regular microscopes.

### How PGT-A Solves the Invisible Problem
Pre-implantation Genetic Testing for Aneuploidies (PGT-A) utilizes Next-Generation Sequencing (NGS) to count all 23 pairs of chromosomes.

1. On Day 5, an embryologist removes 4 to 6 cells from the trophectoderm using a laser.
2. The blastocyst is safely vitrified.
3. The genetic sample is sequenced. Embryos are classified as:
   - **Euploid**: Normal 46 chromosomes. Highest implantation rate (70-75%).
   - **Aneuploid**: Missing or extra chromosomes (like Trisomy 21). Transferred embryos would either fail or miscarry.
   - **Mosaic**: Contains a mixture of normal and abnormal cells.

By transferring only verified euploid embryos, PGT-A reduces miscarriage rates to below 8%, drastically shortens time-to-pregnancy, and provides profound peace of mind.`,
    author: 'Dr. Priya Narang',
    authorRole: 'Reproductive Genetic Counselor, Prisha IVF',
    category: 'Reproductive Genetics',
    tags: ['PGT-A', 'Genetic Screening', 'Recurrent Miscarriage', 'Aneuploidy'],
    published: true,
    featured: false,
    publishDate: '2026-05-14',
    readTime: '6 min read',
    seoTitle: 'How PGT-A Prevents Recurrent IVF Implantation Failure | Prisha IVF',
    seoDescription: 'Discover how PGT-A pre-implantation genetic testing screens embryos to prevent recurrent miscarriage and improve IVF live birth rates.',
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Pooja & Rajesh Verma',
    treatment: 'IVF with Blastocyst Transfer',
    location: 'New Delhi',
    testimonial: 'After seven painful years of unexplained infertility and two failed attempts at other clinics, we were emotionally exhausted. The transparency, scientific precision, and gentle warmth of Dr. Radhika Sharma gave us renewed confidence. Today, our 8-month-old twin boys are playing in our arms. Prisha IVF made our impossible dream real.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 1,
    journeyYears: '7 Years Infertility Journey',
  },
  {
    id: 'test-2',
    patientName: 'Sanya & Rohan Malhotra',
    treatment: 'ICSI & Micro-TESE Treatment',
    location: 'Gurugram',
    testimonial: 'My husband had been diagnosed with severe oligospermia and we were told donor sperm was our only route. Dr. Vikramaditya and the embryology team at Prisha IVF believed in our biological potential. Through Micro-TESE and ICSI, we conceived our beautiful baby boy on our very first attempt. We are forever indebted to their medical skill.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 2,
    journeyYears: '4 Years Infertility Journey',
  },
  {
    id: 'test-3',
    patientName: 'Deepa & Amit Trivedi',
    treatment: 'Laser-Assisted Hatching & PGT-A',
    location: 'Jaipur',
    testimonial: 'At age 38, I had suffered three consecutive heart-wrenching early miscarriages. Dr. Radhika investigated deeply and recommended PGT-A screening and laser-assisted hatching. Knowing we were transferring a healthy euploid embryo removed all our fear. I delivered a healthy baby girl this January. The lab standards here are truly world-class.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 3,
    journeyYears: '5 Years Infertility Journey',
  },
  {
    id: 'test-4',
    patientName: 'Dr. Nidhi & Dr. Sandeep Goyal',
    treatment: 'Single Embryo Transfer (eSET)',
    location: 'Chandigarh',
    testimonial: 'Being physicians ourselves, we scrutinized every cleanroom parameter, incubator specification, and protocol. Prisha IVF impressed us immensely. The clean air filtration, ethical clarity, and absence of commercial gimmicks stand out. Our daughter Aadhya is the joy of our lives. We recommend Prisha IVF wholeheartedly to anyone seeking genuine medical integrity.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 4,
    journeyYears: '3 Years Infertility Journey',
  },
  {
    id: 'test-5',
    patientName: 'Kavita & Manav Deshmukh',
    treatment: 'Laparoscopic Surgery + IVF',
    location: 'Pune',
    testimonial: 'I suffered from Stage 4 severe endometriosis with severe pelvic pain. Dr. Rajiv Oberoi performed a gentle laparoscopy, followed by an individualized IVF protocol by Dr. Meenakshi. From day one, the clinic staff treated us like family rather than case numbers. We are now blessed parents to our son Veer.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 5,
    journeyYears: '6 Years Infertility Journey',
  },
  {
    id: 'test-6',
    patientName: 'Sunita & Rakesh Patel',
    treatment: 'Personalized Low AMH Protocol',
    location: 'Ahmedabad',
    testimonial: 'With an AMH of just 0.6, other clinics told us to abandon hope of using my own eggs. The team at Prisha IVF took a different approach—nutritional priming and mild natural stimulation. We retrieved 4 high-quality eggs, formed two grade-A blastocysts, and one took! Never lose hope before speaking with Prisha IVF.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 6,
    journeyYears: '5 Years Infertility Journey',
  },
  {
    id: 'test-7',
    patientName: 'Meera & Kunal Bansal',
    treatment: 'Elective Oocyte Vitrification',
    location: 'Noida',
    testimonial: 'I decided to freeze my eggs at 31 before taking on an intense overseas corporate project. The medical team walked me through every step transparently. The retrieval was completely painless, and 16 mature eggs are now safely frozen. It gave me immense peace of mind and reproductive freedom.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 7,
    journeyYears: 'Fertility Preservation',
  },
  {
    id: 'test-8',
    patientName: 'Rashmi & Vivek Nair',
    treatment: 'Recurrent Implantation Protocol',
    location: 'Bengaluru',
    testimonial: 'The emotional guidance we received from the counselors at Prisha IVF during the difficult two-week wait made all the difference. When the clinic called with our positive Beta-hCG numbers, our entire family cried tears of joy. Thank you Prisha IVF for your kindness and excellence.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    published: true,
    displayOrder: 8,
    journeyYears: '4 Years Infertility Journey',
  },
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is IVF and how does it work?',
    answer: 'In Vitro Fertilization (IVF) is a medical treatment where eggs are gently collected from the ovaries and fertilized with sperm outside the body in our state-of-the-art cleanroom embryology laboratory. The developing embryos are carefully cultured to the Day 5 blastocyst stage, after which one top-quality embryo is gently placed into the woman’s prepared uterus to achieve pregnancy.',
    category: 'General IVF',
    published: true,
    displayOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'What is the clinical difference between IVF and IUI?',
    answer: 'IUI (Intrauterine Insemination) is a less invasive procedure where concentrated, washed sperm is placed directly inside the uterus around the time of natural ovulation, meaning fertilization happens naturally inside the fallopian tubes. In IVF, fertilization happens in our cleanroom laboratory, providing significantly higher success rates for blocked tubes, severe male infertility, advanced maternal age, or past IUI failures.',
    category: 'General IVF',
    published: true,
    displayOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'What is ICSI and when is it recommended?',
    answer: 'ICSI (Intracytoplasmic Sperm Injection) is an advanced micromanipulation procedure where an embryologist injects a single selected healthy sperm directly into the center of each mature egg. It is primarily recommended for severe male factor infertility (low sperm count, poor motility, or surgical sperm extraction) and in cases with previous poor fertilization in conventional IVF.',
    category: 'Procedures',
    published: true,
    displayOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'What success rates can I expect at Prisha IVF?',
    answer: 'At Prisha IVF, our clinical cumulative pregnancy rates across up to three embryo transfers reach 78.4%. Individual success depends on factors like maternal age, ovarian reserve (AMH), and blastocyst quality. During your initial consultation, our medical directors provide an honest, transparent appraisal tailored to your specific clinical diagnostic profile.',
    category: 'Success & Rates',
    published: true,
    displayOrder: 4,
  },
  {
    id: 'faq-5',
    question: 'When should someone consult a fertility specialist?',
    answer: 'Medical guidelines recommend consulting a specialist if you have been trying to conceive for 12 months without success (if the female partner is under 35), or 6 months (if 35 or older). Immediate consultation is also advisable if you have known conditions such as irregular cycles, PCOS, endometriosis, previous pelvic surgery, or known male factor abnormalities.',
    category: 'Consultation',
    published: true,
    displayOrder: 5,
  },
  {
    id: 'faq-6',
    question: 'What happens during the first consultation at Prisha IVF?',
    answer: 'Your first visit is a relaxed, comprehensive 45-minute discussion. Our senior reproductive endocrinologist reviews your medical history and past tests, performs a gentle pelvic ultrasound to assess antral follicles and uterine health, and arranges semen analysis if needed. We outline clear, step-by-step diagnostic or treatment options with zero pressure.',
    category: 'Consultation',
    published: true,
    displayOrder: 6,
  },
  {
    id: 'faq-7',
    question: 'Is the egg retrieval procedure painful?',
    answer: 'No. The egg collection (ovum pick-up) is performed under short, gentle intravenous sedation managed by an experienced anesthesiologist. You will be asleep for the 15-minute procedure and will not feel pain. Most patients wake up comfortably, rest in our recovery suite for 2 hours, and return home the same morning.',
    category: 'Procedures',
    published: true,
    displayOrder: 7,
  },
  {
    id: 'faq-8',
    question: 'What is blastocyst culture and why is it superior?',
    answer: 'Blastocyst culture involves allowing embryos to develop in our specialized benchtop incubators until Day 5 or Day 6 (when they have 100-200 cells). Culturing to blastocyst stage allows natural genetic self-selection, ensuring only the most resilient embryos with high implantation rates (up to 70%) are transferred, enabling safe single embryo transfers.',
    category: 'Procedures',
    published: true,
    displayOrder: 8,
  },
  {
    id: 'faq-9',
    question: 'How much does fertility treatment cost and are EMI options available?',
    answer: 'At Prisha IVF, we practice complete financial transparency. You will receive an all-inclusive, itemized estimate prior to starting your cycle with no hidden costs. We also partner with leading healthcare financial institutions to provide 0% interest monthly installment (EMI) plans to ensure finances never delay your family dreams.',
    category: 'Costs & Financials',
    published: true,
    displayOrder: 9,
  },
  {
    id: 'faq-10',
    question: 'What factors affect fertility and how can we prepare before treatment?',
    answer: 'Key factors include maternal age, ovarian reserve, sperm DNA integrity, uterine cavity health, and lifestyle factors like smoking, chronic stress, and metabolic health. We recommend optimizing pre-conception nutrition, maintaining Vitamin D3 levels, taking methylfolate, and avoiding tobacco or alcohol for 3 months prior to treatment.',
    category: 'General IVF',
    published: true,
    displayOrder: 10,
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    appointmentId: 'PIVF-2026-1001',
    fullName: 'Sunita Sharma',
    mobileNumber: '+91 98111 22334',
    email: 'sunita.sharma@example.com',
    preferredDate: '2026-09-22',
    preferredTime: '10:30 AM',
    doctorId: 'doc-1',
    doctorName: 'Dr. Radhika Sharma',
    serviceId: 'srv-1',
    serviceName: 'In Vitro Fertilization (IVF)',
    city: 'New Delhi',
    preferredContactMethod: 'phone',
    message: 'We have been trying to conceive for 3 years. Looking for a comprehensive first consultation.',
    status: 'New',
    createdAt: '2026-09-16T14:20:00Z',
    adminNotes: 'Assigned to counseling desk for slot confirmation call.',
  },
  {
    id: 'apt-2',
    appointmentId: 'PIVF-2026-1002',
    fullName: 'Rohan & Neha Kapur',
    mobileNumber: '+91 98222 33445',
    email: 'rohan.kapur@example.com',
    preferredDate: '2026-09-23',
    preferredTime: '02:00 PM',
    doctorId: 'doc-3',
    doctorName: 'Dr. Vikramaditya Rathore',
    serviceId: 'srv-11',
    serviceName: 'Male Infertility & Micro-TESE',
    city: 'Gurugram',
    preferredContactMethod: 'whatsapp',
    message: 'Seeking expert evaluation for low sperm motility and DFI report review.',
    status: 'Contacted',
    createdAt: '2026-09-16T11:05:00Z',
    adminNotes: 'Patient contacted via WhatsApp; shared pre-consultation guidelines.',
  },
  {
    id: 'apt-3',
    appointmentId: 'PIVF-2026-1003',
    fullName: 'Anjali Verma',
    mobileNumber: '+91 98333 44556',
    email: 'anjali.v@example.com',
    preferredDate: '2026-09-24',
    preferredTime: '11:00 AM',
    doctorId: 'doc-1',
    doctorName: 'Dr. Radhika Sharma',
    serviceId: 'srv-6',
    serviceName: 'Egg Freezing (Oocyte Cryopreservation)',
    city: 'Noida',
    preferredContactMethod: 'email',
    message: 'Interested in elective egg freezing before moving abroad for work.',
    status: 'Confirmed',
    createdAt: '2026-09-15T09:40:00Z',
    adminNotes: 'Slot confirmed. Ultrasound room scheduled.',
  },
  {
    id: 'apt-4',
    appointmentId: 'PIVF-2026-1004',
    fullName: 'Vikas & Shruti Saxena',
    mobileNumber: '+91 98444 55667',
    email: 'vikas.saxena@example.com',
    preferredDate: '2026-09-25',
    preferredTime: '12:30 PM',
    doctorId: 'doc-4',
    doctorName: 'Dr. Meenakshi Joshi',
    serviceId: 'srv-12',
    serviceName: 'Female Infertility & PCOS Protocol',
    city: 'Faridabad',
    preferredContactMethod: 'phone',
    message: 'Diagnosed with severe PCOS and irregular cycles for 4 years.',
    status: 'Confirmed',
    createdAt: '2026-09-14T16:15:00Z',
    adminNotes: 'Confirmed for 12:30 PM consultation.',
  },
  {
    id: 'apt-5',
    appointmentId: 'PIVF-2026-1005',
    fullName: 'Meenakshi & Alok Rao',
    mobileNumber: '+91 98555 66778',
    email: 'alok.rao@example.com',
    preferredDate: '2026-09-21',
    preferredTime: '04:00 PM',
    doctorId: 'doc-1',
    doctorName: 'Dr. Radhika Sharma',
    serviceId: 'srv-14',
    serviceName: 'Fertility Consultation & Second Opinion',
    city: 'Jaipur',
    preferredContactMethod: 'phone',
    message: 'Had 2 failed IVF attempts at another center. Seeking second opinion.',
    status: 'New',
    createdAt: '2026-09-16T18:30:00Z',
  },
  {
    id: 'apt-6',
    appointmentId: 'PIVF-2026-1006',
    fullName: 'Preeti Deshmukh',
    mobileNumber: '+91 98666 77889',
    email: 'preeti.d@example.com',
    preferredDate: '2026-09-18',
    preferredTime: '01:00 PM',
    doctorId: 'doc-5',
    doctorName: 'Dr. Rajiv Oberoi',
    serviceId: 'srv-10',
    serviceName: 'Diagnostic & Operative Hysteroscopy',
    city: 'New Delhi',
    preferredContactMethod: 'phone',
    message: 'Ultrasound indicated uterine polyp. Referred for hysteroscopy evaluation.',
    status: 'Completed',
    createdAt: '2026-09-12T10:00:00Z',
    adminNotes: 'Procedure completed successfully.',
  },
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Gaurav Singhal',
    phone: '+91 98777 88990',
    email: 'gaurav.s@example.com',
    subject: 'Inquiry regarding IVF cost and 0% EMI financing',
    message: 'Hello, I would like to know the cost breakdown for an IVF cycle with blastocyst transfer and what EMI documentation is required.',
    status: 'Unread',
    createdAt: '2026-09-16T17:45:00Z',
  },
  {
    id: 'msg-2',
    name: 'Kavita Menon',
    phone: '+91 98888 99001',
    email: 'kavita.m@example.com',
    subject: 'Consultation with Dr. Radhika Sharma for low AMH',
    message: 'My recent AMH is 0.8. Does Dr. Radhika consult on weekends? We are traveling from Lucknow.',
    status: 'Read',
    createdAt: '2026-09-16T13:10:00Z',
    replyNotes: 'Informed regarding Saturday morning clinic timings.',
  },
  {
    id: 'msg-3',
    name: 'Nitin Chopra',
    phone: '+91 98999 00112',
    email: 'nitin.c@example.com',
    subject: 'Sperm DNA Fragmentation Index (DFI) Test availability',
    message: 'Is the DFI test performed in-house at your cleanroom lab and how long do results take?',
    status: 'Replied',
    createdAt: '2026-09-15T11:20:00Z',
    replyNotes: 'Replied via email that DFI is conducted in-house with same-day evening results.',
  },
  {
    id: 'msg-4',
    name: 'Pooja Agarwal',
    phone: '+91 97111 22334',
    email: 'pooja.a@example.com',
    subject: 'Second opinion on repeated blastocyst implantation failure',
    message: 'We have all our embryology photographs and reports. Can we book a dedicated second opinion session?',
    status: 'Read',
    createdAt: '2026-09-14T15:30:00Z',
  },
];

export const initialMediaItems: MediaItem[] = [
  {
    id: 'med-1',
    name: 'prisha-ivf-logo.png',
    url: '/images/prisha-ivf-logo.png',
    alt: 'Prisha IVF Official Brand Logo',
    size: '265 KB',
    type: 'image/png',
    createdAt: '2026-09-17',
  },
  {
    id: 'med-2',
    name: 'cleanroom-embryology-lab.jpg',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    alt: 'Class 10,000 Cleanroom Embryology Laboratory',
    size: '340 KB',
    type: 'image/jpeg',
    createdAt: '2026-09-17',
  },
  {
    id: 'med-3',
    name: 'ivf-doctor-consultation.jpg',
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    alt: 'Doctor Patient Compassionate Fertility Consultation',
    size: '290 KB',
    type: 'image/jpeg',
    createdAt: '2026-09-17',
  },
  {
    id: 'med-4',
    name: 'micromanipulation-icsi.jpg',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    alt: 'Microscope and ICSI Micro-Injection',
    size: '310 KB',
    type: 'image/jpeg',
    createdAt: '2026-09-17',
  },
];
