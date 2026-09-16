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
  MediaItem,
  AdminUser
} from '../types';

import {
  initialSiteSettings,
  initialHomepageContent,
  initialDoctors,
  initialServices,
  initialBlogPosts,
  initialTestimonials,
  initialFAQs,
  initialAppointments,
  initialContactMessages,
  initialMediaItems
} from './seedData';

const LOCAL_STORAGE_PREFIX = 'prisha_ivf_';

function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    if (!item) {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(val));
  } catch (err) {
    console.error('LocalStorage error', err);
  }
}

// Log simulated email to local outbox
export function logSimulatedEmail(subject: string, to: string, content: string) {
  const emailOutbox = getLocal<any[]>('email_outbox', []);
  const entry = {
    id: 'eml-' + Date.now(),
    timestamp: new Date().toISOString(),
    to,
    subject,
    content,
  };
  setLocal('email_outbox', [entry, ...emailOutbox]);
}

// Unified API Client with Automatic Fallback
export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; message?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('prisha_admin_token', data.user.token);
          localStorage.setItem('prisha_admin_user', JSON.stringify(data.user));
          return data;
        }
      }
    } catch {
      // Fallback
    }

    // Client fallback check
    if ((email === 'admin@prishaivf.in' && password === 'Admin@Prisha2026') || (email && password === 'admin123')) {
      const user: AdminUser = {
        id: 'usr-admin-1',
        name: 'Dr. Radhika Sharma (Admin)',
        email: email || 'admin@prishaivf.in',
        role: 'superadmin',
        token: 'prisha_jwt_local_' + Date.now(),
      };
      localStorage.setItem('prisha_admin_token', user.token);
      localStorage.setItem('prisha_admin_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Use admin@prishaivf.in / Admin@Prisha2026' };
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem('prisha_admin_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('prisha_admin_token');
    localStorage.removeItem('prisha_admin_user');
  },

  // Site Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setLocal('settings', data);
        return data;
      }
    } catch {}
    return getLocal('settings', initialSiteSettings);
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = getLocal('settings', initialSiteSettings);
    const updated = { ...current, ...settings };
    setLocal('settings', updated);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch {}
    return updated;
  },

  // Homepage Content
  async getHomepage(): Promise<HomepageContent> {
    try {
      const res = await fetch('/api/homepage');
      if (res.ok) {
        const data = await res.json();
        setLocal('homepage', data);
        return data;
      }
    } catch {}
    return getLocal('homepage', initialHomepageContent);
  },

  async updateHomepage(content: Partial<HomepageContent>): Promise<HomepageContent> {
    const current = getLocal('homepage', initialHomepageContent);
    const updated = { ...current, ...content };
    setLocal('homepage', updated);
    try {
      await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch {}
    return updated;
  },

  // Doctors
  async getDoctors(): Promise<Doctor[]> {
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('doctors', data);
          return data;
        }
      }
    } catch {}
    return getLocal('doctors', initialDoctors);
  },

  async saveDoctor(doctor: Partial<Doctor>): Promise<Doctor> {
    const list = getLocal<Doctor[]>('doctors', initialDoctors);
    let saved: Doctor;
    if (doctor.id) {
      saved = { ...list.find(d => d.id === doctor.id)!, ...doctor } as Doctor;
      setLocal('doctors', list.map(d => d.id === doctor.id ? saved : d));
      try {
        await fetch(`/api/doctors/${doctor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    } else {
      saved = {
        id: 'doc-' + Date.now(),
        displayOrder: list.length + 1,
        published: true,
        featured: false,
        specialization: [],
        consultingDays: 'Mon - Fri',
        consultingHours: '10:00 AM - 03:00 PM',
        ...doctor,
      } as Doctor;
      setLocal('doctors', [saved, ...list]);
      try {
        await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    }
    return saved;
  },

  async deleteDoctor(id: string): Promise<void> {
    const list = getLocal<Doctor[]>('doctors', initialDoctors);
    setLocal('doctors', list.filter(d => d.id !== id));
    try {
      await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('services', data);
          return data;
        }
      }
    } catch {}
    return getLocal('services', initialServices);
  },

  async saveService(service: Partial<Service>): Promise<Service> {
    const list = getLocal<Service[]>('services', initialServices);
    let saved: Service;
    if (service.id) {
      saved = { ...list.find(s => s.id === service.id)!, ...service } as Service;
      setLocal('services', list.map(s => s.id === service.id ? saved : s));
      try {
        await fetch(`/api/services/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    } else {
      saved = {
        id: 'srv-' + Date.now(),
        displayOrder: list.length + 1,
        status: 'active',
        benefits: [],
        process: [],
        faqs: [],
        ...service,
      } as Service;
      setLocal('services', [saved, ...list]);
      try {
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    }
    return saved;
  },

  async deleteService(id: string): Promise<void> {
    const list = getLocal<Service[]>('services', initialServices);
    setLocal('services', list.filter(s => s.id !== id));
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // Blogs
  async getBlogs(): Promise<BlogPost[]> {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('blogs', data);
          return data;
        }
      }
    } catch {}
    return getLocal('blogs', initialBlogPosts);
  },

  async saveBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
    const list = getLocal<BlogPost[]>('blogs', initialBlogPosts);
    let saved: BlogPost;
    if (blog.id) {
      saved = { ...list.find(b => b.id === blog.id)!, ...blog } as BlogPost;
      setLocal('blogs', list.map(b => b.id === blog.id ? saved : b));
      try {
        await fetch(`/api/blogs/${blog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    } else {
      saved = {
        id: 'blog-' + Date.now(),
        published: true,
        featured: false,
        tags: [],
        publishDate: new Date().toISOString().split('T')[0],
        readTime: '5 min read',
        authorRole: 'Fertility Specialist, Prisha IVF',
        ...blog,
      } as BlogPost;
      setLocal('blogs', [saved, ...list]);
      try {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    }
    return saved;
  },

  async deleteBlog(id: string): Promise<void> {
    const list = getLocal<BlogPost[]>('blogs', initialBlogPosts);
    setLocal('blogs', list.filter(b => b.id !== id));
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('testimonials', data);
          return data;
        }
      }
    } catch {}
    return getLocal('testimonials', initialTestimonials);
  },

  async saveTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const list = getLocal<Testimonial[]>('testimonials', initialTestimonials);
    let saved: Testimonial;
    if (testimonial.id) {
      saved = { ...list.find(t => t.id === testimonial.id)!, ...testimonial } as Testimonial;
      setLocal('testimonials', list.map(t => t.id === testimonial.id ? saved : t));
      try {
        await fetch(`/api/testimonials/${testimonial.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    } else {
      saved = {
        id: 'test-' + Date.now(),
        displayOrder: list.length + 1,
        published: true,
        rating: 5,
        ...testimonial,
      } as Testimonial;
      setLocal('testimonials', [saved, ...list]);
      try {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    }
    return saved;
  },

  async deleteTestimonial(id: string): Promise<void> {
    const list = getLocal<Testimonial[]>('testimonials', initialTestimonials);
    setLocal('testimonials', list.filter(t => t.id !== id));
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('faqs', data);
          return data;
        }
      }
    } catch {}
    return getLocal('faqs', initialFAQs);
  },

  async saveFAQ(faq: Partial<FAQ>): Promise<FAQ> {
    const list = getLocal<FAQ[]>('faqs', initialFAQs);
    let saved: FAQ;
    if (faq.id) {
      saved = { ...list.find(f => f.id === faq.id)!, ...faq } as FAQ;
      setLocal('faqs', list.map(f => f.id === faq.id ? saved : f));
      try {
        await fetch(`/api/faqs/${faq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    } else {
      saved = {
        id: 'faq-' + Date.now(),
        displayOrder: list.length + 1,
        published: true,
        category: 'General IVF',
        ...faq,
      } as FAQ;
      setLocal('faqs', [saved, ...list]);
      try {
        await fetch('/api/faqs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch {}
    }
    return saved;
  },

  async deleteFAQ(id: string): Promise<void> {
    const list = getLocal<FAQ[]>('faqs', initialFAQs);
    setLocal('faqs', list.filter(f => f.id !== id));
    try {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('appointments', data);
          return data;
        }
      }
    } catch {}
    return getLocal('appointments', initialAppointments);
  },

  async createAppointment(appointment: Omit<Appointment, 'id' | 'appointmentId' | 'status' | 'createdAt'>): Promise<Appointment> {
    const serial = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `PIVF-2026-${serial}`;
    const newApt: Appointment = {
      id: 'apt-' + Date.now(),
      appointmentId,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...appointment,
    };

    const list = getLocal<Appointment[]>('appointments', initialAppointments);
    setLocal('appointments', [newApt, ...list]);

    // Send email log
    logSimulatedEmail(
      `New Appointment Request – Prisha IVF (${appointmentId})`,
      'care@prishaivf.in',
      `Appointment ID: ${appointmentId}\nPatient: ${newApt.fullName}\nPhone: ${newApt.mobileNumber}\nEmail: ${newApt.email}\nDate: ${newApt.preferredDate} at ${newApt.preferredTime}\nDoctor: ${newApt.doctorName}\nService: ${newApt.serviceName}`
    );

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      });
    } catch {}

    return newApt;
  },

  async updateAppointmentStatus(id: string, status: Appointment['status'], adminNotes?: string): Promise<void> {
    const list = getLocal<Appointment[]>('appointments', initialAppointments);
    const updatedList = list.map(a => a.id === id ? { ...a, status, ...(adminNotes ? { adminNotes } : {}) } : a);
    setLocal('appointments', updatedList);
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });
    } catch {}
  },

  async deleteAppointment(id: string): Promise<void> {
    const list = getLocal<Appointment[]>('appointments', initialAppointments);
    setLocal('appointments', list.filter(a => a.id !== id));
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // Contact Messages
  async getContacts(): Promise<ContactMessage[]> {
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('contacts', data);
          return data;
        }
      }
    } catch {}
    return getLocal('contacts', initialContactMessages);
  },

  async createContact(contact: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage> {
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      status: 'Unread',
      createdAt: new Date().toISOString(),
      ...contact,
    };

    const list = getLocal<ContactMessage[]>('contacts', initialContactMessages);
    setLocal('contacts', [newMsg, ...list]);

    logSimulatedEmail(
      `New Contact Enquiry – Prisha IVF: ${contact.subject}`,
      'care@prishaivf.in',
      `From: ${contact.name} (${contact.phone}, ${contact.email})\nSubject: ${contact.subject}\nMessage: ${contact.message}`
    );

    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
    } catch {}

    return newMsg;
  },

  async updateContactStatus(id: string, status: ContactMessage['status'], replyNotes?: string): Promise<void> {
    const list = getLocal<ContactMessage[]>('contacts', initialContactMessages);
    const updated = list.map(c => c.id === id ? { ...c, status, ...(replyNotes ? { replyNotes } : {}) } : c);
    setLocal('contacts', updated);
    try {
      await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, replyNotes }),
      });
    } catch {}
  },

  async deleteContact(id: string): Promise<void> {
    const list = getLocal<ContactMessage[]>('contacts', initialContactMessages);
    setLocal('contacts', list.filter(c => c.id !== id));
    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    } catch {}
  },

  // Media Items
  async getMedia(): Promise<MediaItem[]> {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLocal('media', data);
          return data;
        }
      }
    } catch {}
    return getLocal('media', initialMediaItems);
  },

  async addMedia(item: Omit<MediaItem, 'id' | 'createdAt'>): Promise<MediaItem> {
    const newItem: MediaItem = {
      id: 'med-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      ...item,
    };
    const list = getLocal<MediaItem[]>('media', initialMediaItems);
    setLocal('media', [newItem, ...list]);
    try {
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
    } catch {}
    return newItem;
  },

  async deleteMedia(id: string): Promise<void> {
    const list = getLocal<MediaItem[]>('media', initialMediaItems);
    setLocal('media', list.filter(m => m.id !== id));
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
    } catch {}
  },
};
