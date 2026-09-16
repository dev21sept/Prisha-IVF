import React, { createContext, useContext, useState, useEffect } from 'react';
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
import { api } from '../services/api';
import { initialSiteSettings, initialHomepageContent } from '../services/seedData';

interface ClinicContextType {
  settings: SiteSettings;
  homepage: HomepageContent;
  doctors: Doctor[];
  services: Service[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  appointments: Appointment[];
  contacts: ContactMessage[];
  media: MediaItem[];
  currentUser: AdminUser | null;
  loading: boolean;
  refreshData: () => Promise<void>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateHomepage: (content: Partial<HomepageContent>) => Promise<void>;
  saveDoctor: (doctor: Partial<Doctor>) => Promise<Doctor>;
  deleteDoctor: (id: string) => Promise<void>;
  saveService: (service: Partial<Service>) => Promise<Service>;
  deleteService: (id: string) => Promise<void>;
  saveBlog: (blog: Partial<BlogPost>) => Promise<BlogPost>;
  deleteBlog: (id: string) => Promise<void>;
  saveTestimonial: (item: Partial<Testimonial>) => Promise<Testimonial>;
  deleteTestimonial: (id: string) => Promise<void>;
  saveFAQ: (item: Partial<FAQ>) => Promise<FAQ>;
  deleteFAQ: (id: string) => Promise<void>;
  bookAppointment: (apt: Omit<Appointment, 'id' | 'appointmentId' | 'status' | 'createdAt'>) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: Appointment['status'], notes?: string) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  sendContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => Promise<ContactMessage>;
  updateContactStatus: (id: string, status: ContactMessage['status'], notes?: string) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  addMedia: (media: Omit<MediaItem, 'id' | 'createdAt'>) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [homepage, setHomepage] = useState<HomepageContent>(initialHomepageContent);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(api.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);

  const refreshData = async () => {
    try {
      const [
        s,
        hp,
        docs,
        srvs,
        blgs,
        tests,
        fqs,
        apts,
        cnts,
        meds
      ] = await Promise.all([
        api.getSettings(),
        api.getHomepage(),
        api.getDoctors(),
        api.getServices(),
        api.getBlogs(),
        api.getTestimonials(),
        api.getFAQs(),
        api.getAppointments(),
        api.getContacts(),
        api.getMedia(),
      ]);

      setSettings(s);
      setHomepage(hp);
      setDoctors(docs);
      setServices(srvs);
      setBlogs(blgs);
      setTestimonials(tests);
      setFaqs(fqs);
      setAppointments(apts);
      setContacts(cnts);
      setMedia(meds);
    } catch (err) {
      console.error('Failed to load clinic data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleUpdateSettings = async (data: Partial<SiteSettings>) => {
    const updated = await api.updateSettings(data);
    setSettings(updated);
  };

  const handleUpdateHomepage = async (data: Partial<HomepageContent>) => {
    const updated = await api.updateHomepage(data);
    setHomepage(updated);
  };

  const handleSaveDoctor = async (doc: Partial<Doctor>) => {
    const saved = await api.saveDoctor(doc);
    setDoctors(prev => {
      const idx = prev.findIndex(d => d.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    return saved;
  };

  const handleDeleteDoctor = async (id: string) => {
    await api.deleteDoctor(id);
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  const handleSaveService = async (srv: Partial<Service>) => {
    const saved = await api.saveService(srv);
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    return saved;
  };

  const handleDeleteService = async (id: string) => {
    await api.deleteService(id);
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveBlog = async (blog: Partial<BlogPost>) => {
    const saved = await api.saveBlog(blog);
    setBlogs(prev => {
      const idx = prev.findIndex(b => b.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    return saved;
  };

  const handleDeleteBlog = async (id: string) => {
    await api.deleteBlog(id);
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const handleSaveTestimonial = async (t: Partial<Testimonial>) => {
    const saved = await api.saveTestimonial(t);
    setTestimonials(prev => {
      const idx = prev.findIndex(x => x.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    return saved;
  };

  const handleDeleteTestimonial = async (id: string) => {
    await api.deleteTestimonial(id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveFAQ = async (f: Partial<FAQ>) => {
    const saved = await api.saveFAQ(f);
    setFaqs(prev => {
      const idx = prev.findIndex(x => x.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    return saved;
  };

  const handleDeleteFAQ = async (id: string) => {
    await api.deleteFAQ(id);
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const handleBookAppointment = async (apt: Omit<Appointment, 'id' | 'appointmentId' | 'status' | 'createdAt'>) => {
    const newApt = await api.createAppointment(apt);
    setAppointments(prev => [newApt, ...prev]);
    return newApt;
  };

  const handleUpdateAppointmentStatus = async (id: string, status: Appointment['status'], notes?: string) => {
    await api.updateAppointmentStatus(id, status, notes);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, ...(notes ? { adminNotes: notes } : {}) } : a));
  };

  const handleDeleteAppointment = async (id: string) => {
    await api.deleteAppointment(id);
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleSendContactMessage = async (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg = await api.createContact(msg);
    setContacts(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const handleUpdateContactStatus = async (id: string, status: ContactMessage['status'], notes?: string) => {
    await api.updateContactStatus(id, status, notes);
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status, ...(notes ? { replyNotes: notes } : {}) } : c));
  };

  const handleDeleteContact = async (id: string) => {
    await api.deleteContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleAddMedia = async (m: Omit<MediaItem, 'id' | 'createdAt'>) => {
    const item = await api.addMedia(m);
    setMedia(prev => [item, ...prev]);
    return item;
  };

  const handleDeleteMedia = async (id: string) => {
    await api.deleteMedia(id);
    setMedia(prev => prev.filter(m => m.id !== id));
  };

  const handleLogin = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
  };

  return (
    <ClinicContext.Provider
      value={{
        settings,
        homepage,
        doctors,
        services,
        blogs,
        testimonials,
        faqs,
        appointments,
        contacts,
        media,
        currentUser,
        loading,
        refreshData,
        updateSettings: handleUpdateSettings,
        updateHomepage: handleUpdateHomepage,
        saveDoctor: handleSaveDoctor,
        deleteDoctor: handleDeleteDoctor,
        saveService: handleSaveService,
        deleteService: handleDeleteService,
        saveBlog: handleSaveBlog,
        deleteBlog: handleDeleteBlog,
        saveTestimonial: handleSaveTestimonial,
        deleteTestimonial: handleDeleteTestimonial,
        saveFAQ: handleSaveFAQ,
        deleteFAQ: handleDeleteFAQ,
        bookAppointment: handleBookAppointment,
        updateAppointmentStatus: handleUpdateAppointmentStatus,
        deleteAppointment: handleDeleteAppointment,
        sendContactMessage: handleSendContactMessage,
        updateContactStatus: handleUpdateContactStatus,
        deleteContact: handleDeleteContact,
        addMedia: handleAddMedia,
        deleteMedia: handleDeleteMedia,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
