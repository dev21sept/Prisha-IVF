export interface Doctor {
  id: string;
  name: string;
  slug: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string[];
  shortBio: string;
  fullBio: string;
  image: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  consultingDays: string;
  consultingHours: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  icon: string;
  category: string;
  benefits: string[];
  process: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seoTitle: string;
  seoDescription: string;
  status: 'active' | 'inactive';
  displayOrder: number;
}

export interface Appointment {
  id: string;
  appointmentId: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  city?: string;
  preferredContactMethod?: 'phone' | 'whatsapp' | 'email';
  message?: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  createdAt: string;
  replyNotes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  shortDescription: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  publishDate: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  location: string;
  testimonial: string;
  image: string;
  rating: number;
  published: boolean;
  displayOrder: number;
  journeyYears?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  displayOrder: number;
}

export interface SiteSettings {
  clinicName: string;
  tagline: string;
  domain: string;
  logo: string;
  favicon: string;
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  address: string;
  cityStateZip: string;
  googleMapsUrl: string;
  openingHours: string;
  sundayHours: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    twitter: string;
  };
  footerText: string;
  copyrightText: string;
}

export interface HomepageContent {
  heroHeading: string;
  heroSubheading: string;
  heroVideoUrl: string;
  heroImageUrl: string;
  heroBadge: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  aboutHeading: string;
  aboutSubheading: string;
  aboutDescription: string;
  aboutFeatures: string[];
  aboutImageUrl: string;
  whyChooseHeading: string;
  whyChooseSubheading: string;
  whyChooseItems: {
    title: string;
    description: string;
    icon: string;
  }[];
  treatmentProcessHeading: string;
  treatmentProcessSubheading: string;
  treatmentProcessSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  alt: string;
  size: string;
  type: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'staff';
  token: string;
}
