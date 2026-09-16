import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { initialSiteSettings, initialHomepageContent } from '../services/seedData';
const ClinicContext = createContext(undefined);
export const ClinicProvider = ({ children }) => {
    const [settings, setSettings] = useState(initialSiteSettings);
    const [homepage, setHomepage] = useState(initialHomepageContent);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [media, setMedia] = useState([]);
    const [currentUser, setCurrentUser] = useState(api.getCurrentUser());
    const [loading, setLoading] = useState(true);
    const refreshData = async () => {
        try {
            const [s, hp, docs, srvs, blgs, tests, fqs, apts, cnts, meds] = await Promise.all([
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
        }
        catch (err) {
            console.error('Failed to load clinic data', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refreshData();
    }, []);
    const handleUpdateSettings = async (data) => {
        const updated = await api.updateSettings(data);
        setSettings(updated);
    };
    const handleUpdateHomepage = async (data) => {
        const updated = await api.updateHomepage(data);
        setHomepage(updated);
    };
    const handleSaveDoctor = async (doc) => {
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
    const handleDeleteDoctor = async (id) => {
        await api.deleteDoctor(id);
        setDoctors(prev => prev.filter(d => d.id !== id));
    };
    const handleSaveService = async (srv) => {
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
    const handleDeleteService = async (id) => {
        await api.deleteService(id);
        setServices(prev => prev.filter(s => s.id !== id));
    };
    const handleSaveBlog = async (blog) => {
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
    const handleDeleteBlog = async (id) => {
        await api.deleteBlog(id);
        setBlogs(prev => prev.filter(b => b.id !== id));
    };
    const handleSaveTestimonial = async (t) => {
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
    const handleDeleteTestimonial = async (id) => {
        await api.deleteTestimonial(id);
        setTestimonials(prev => prev.filter(t => t.id !== id));
    };
    const handleSaveFAQ = async (f) => {
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
    const handleDeleteFAQ = async (id) => {
        await api.deleteFAQ(id);
        setFaqs(prev => prev.filter(f => f.id !== id));
    };
    const handleBookAppointment = async (apt) => {
        const newApt = await api.createAppointment(apt);
        setAppointments(prev => [newApt, ...prev]);
        return newApt;
    };
    const handleUpdateAppointmentStatus = async (id, status, notes) => {
        await api.updateAppointmentStatus(id, status, notes);
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, ...(notes ? { adminNotes: notes } : {}) } : a));
    };
    const handleDeleteAppointment = async (id) => {
        await api.deleteAppointment(id);
        setAppointments(prev => prev.filter(a => a.id !== id));
    };
    const handleSendContactMessage = async (msg) => {
        const newMsg = await api.createContact(msg);
        setContacts(prev => [newMsg, ...prev]);
        return newMsg;
    };
    const handleUpdateContactStatus = async (id, status, notes) => {
        await api.updateContactStatus(id, status, notes);
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status, ...(notes ? { replyNotes: notes } : {}) } : c));
    };
    const handleDeleteContact = async (id) => {
        await api.deleteContact(id);
        setContacts(prev => prev.filter(c => c.id !== id));
    };
    const handleAddMedia = async (m) => {
        const item = await api.addMedia(m);
        setMedia(prev => [item, ...prev]);
        return item;
    };
    const handleDeleteMedia = async (id) => {
        await api.deleteMedia(id);
        setMedia(prev => prev.filter(m => m.id !== id));
    };
    const handleLogin = async (email, pass) => {
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
    return (<ClinicContext.Provider value={{
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
        }}>
      {children}
    </ClinicContext.Provider>);
};
export const useClinic = () => {
    const context = useContext(ClinicContext);
    if (!context) {
        throw new Error('useClinic must be used within a ClinicProvider');
    }
    return context;
};
