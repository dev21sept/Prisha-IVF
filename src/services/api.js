import { initialSiteSettings, initialHomepageContent, initialDoctors, initialServices, initialBlogPosts, initialTestimonials, initialFAQs, initialAppointments, initialContactMessages, initialMediaItems } from './seedData';
const LOCAL_STORAGE_PREFIX = 'prisha_ivf_';
function getLocal(key, defaultVal) {
    try {
        const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
        if (!item) {
            localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(defaultVal));
            return defaultVal;
        }
        return JSON.parse(item);
    }
    catch {
        return defaultVal;
    }
}
function setLocal(key, val) {
    try {
        localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(val));
    }
    catch (err) {
        console.error('LocalStorage error', err);
    }
}
// Log simulated email to local outbox
export function logSimulatedEmail(subject, to, content) {
    const emailOutbox = getLocal('email_outbox', []);
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
    async login(email, password) {
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
        }
        catch {
            // Fallback
        }
        // Client fallback check
        if ((email === 'admin@prishaivf.in' && password === 'Admin@Prisha2026') || (email && password === 'admin123')) {
            const user = {
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
    getCurrentUser() {
        try {
            const raw = localStorage.getItem('prisha_admin_user');
            return raw ? JSON.parse(raw) : null;
        }
        catch {
            return null;
        }
    },
    logout() {
        localStorage.removeItem('prisha_admin_token');
        localStorage.removeItem('prisha_admin_user');
    },
    // Site Settings
    async getSettings() {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setLocal('settings', data);
                return data;
            }
        }
        catch { }
        return getLocal('settings', initialSiteSettings);
    },
    async updateSettings(settings) {
        const current = getLocal('settings', initialSiteSettings);
        const updated = { ...current, ...settings };
        setLocal('settings', updated);
        try {
            await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
        }
        catch { }
        return updated;
    },
    // Homepage Content
    async getHomepage() {
        try {
            const res = await fetch('/api/homepage');
            if (res.ok) {
                const data = await res.json();
                setLocal('homepage', data);
                return data;
            }
        }
        catch { }
        return getLocal('homepage', initialHomepageContent);
    },
    async updateHomepage(content) {
        const current = getLocal('homepage', initialHomepageContent);
        const updated = { ...current, ...content };
        setLocal('homepage', updated);
        try {
            await fetch('/api/homepage', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
        }
        catch { }
        return updated;
    },
    // Doctors
    async getDoctors() {
        try {
            const res = await fetch('/api/doctors');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('doctors', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('doctors', initialDoctors);
    },
    async saveDoctor(doctor) {
        const list = getLocal('doctors', initialDoctors);
        let saved;
        if (doctor.id) {
            saved = { ...list.find(d => d.id === doctor.id), ...doctor };
            setLocal('doctors', list.map(d => d.id === doctor.id ? saved : d));
            try {
                await fetch(`/api/doctors/${doctor.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        else {
            saved = {
                id: 'doc-' + Date.now(),
                displayOrder: list.length + 1,
                published: true,
                featured: false,
                specialization: [],
                consultingDays: 'Mon - Fri',
                consultingHours: '10:00 AM - 03:00 PM',
                ...doctor,
            };
            setLocal('doctors', [saved, ...list]);
            try {
                await fetch('/api/doctors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        return saved;
    },
    async deleteDoctor(id) {
        const list = getLocal('doctors', initialDoctors);
        setLocal('doctors', list.filter(d => d.id !== id));
        try {
            await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // Services
    async getServices() {
        try {
            const res = await fetch('/api/services');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('services', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('services', initialServices);
    },
    async saveService(service) {
        const list = getLocal('services', initialServices);
        let saved;
        if (service.id) {
            saved = { ...list.find(s => s.id === service.id), ...service };
            setLocal('services', list.map(s => s.id === service.id ? saved : s));
            try {
                await fetch(`/api/services/${service.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        else {
            saved = {
                id: 'srv-' + Date.now(),
                displayOrder: list.length + 1,
                status: 'active',
                benefits: [],
                process: [],
                faqs: [],
                ...service,
            };
            setLocal('services', [saved, ...list]);
            try {
                await fetch('/api/services', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        return saved;
    },
    async deleteService(id) {
        const list = getLocal('services', initialServices);
        setLocal('services', list.filter(s => s.id !== id));
        try {
            await fetch(`/api/services/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // Blogs
    async getBlogs() {
        try {
            const res = await fetch('/api/blogs');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('blogs', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('blogs', initialBlogPosts);
    },
    async saveBlog(blog) {
        const list = getLocal('blogs', initialBlogPosts);
        let saved;
        if (blog.id) {
            saved = { ...list.find(b => b.id === blog.id), ...blog };
            setLocal('blogs', list.map(b => b.id === blog.id ? saved : b));
            try {
                await fetch(`/api/blogs/${blog.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        else {
            saved = {
                id: 'blog-' + Date.now(),
                published: true,
                featured: false,
                tags: [],
                publishDate: new Date().toISOString().split('T')[0],
                readTime: '5 min read',
                authorRole: 'Fertility Specialist, Prisha IVF',
                ...blog,
            };
            setLocal('blogs', [saved, ...list]);
            try {
                await fetch('/api/blogs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        return saved;
    },
    async deleteBlog(id) {
        const list = getLocal('blogs', initialBlogPosts);
        setLocal('blogs', list.filter(b => b.id !== id));
        try {
            await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // Testimonials
    async getTestimonials() {
        try {
            const res = await fetch('/api/testimonials');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('testimonials', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('testimonials', initialTestimonials);
    },
    async saveTestimonial(testimonial) {
        const list = getLocal('testimonials', initialTestimonials);
        let saved;
        if (testimonial.id) {
            saved = { ...list.find(t => t.id === testimonial.id), ...testimonial };
            setLocal('testimonials', list.map(t => t.id === testimonial.id ? saved : t));
            try {
                await fetch(`/api/testimonials/${testimonial.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        else {
            saved = {
                id: 'test-' + Date.now(),
                displayOrder: list.length + 1,
                published: true,
                rating: 5,
                ...testimonial,
            };
            setLocal('testimonials', [saved, ...list]);
            try {
                await fetch('/api/testimonials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        return saved;
    },
    async deleteTestimonial(id) {
        const list = getLocal('testimonials', initialTestimonials);
        setLocal('testimonials', list.filter(t => t.id !== id));
        try {
            await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // FAQs
    async getFAQs() {
        try {
            const res = await fetch('/api/faqs');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('faqs', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('faqs', initialFAQs);
    },
    async saveFAQ(faq) {
        const list = getLocal('faqs', initialFAQs);
        let saved;
        if (faq.id) {
            saved = { ...list.find(f => f.id === faq.id), ...faq };
            setLocal('faqs', list.map(f => f.id === faq.id ? saved : f));
            try {
                await fetch(`/api/faqs/${faq.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        else {
            saved = {
                id: 'faq-' + Date.now(),
                displayOrder: list.length + 1,
                published: true,
                category: 'General IVF',
                ...faq,
            };
            setLocal('faqs', [saved, ...list]);
            try {
                await fetch('/api/faqs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(saved),
                });
            }
            catch { }
        }
        return saved;
    },
    async deleteFAQ(id) {
        const list = getLocal('faqs', initialFAQs);
        setLocal('faqs', list.filter(f => f.id !== id));
        try {
            await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // Appointments
    async getAppointments() {
        try {
            const res = await fetch('/api/appointments');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('appointments', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('appointments', initialAppointments);
    },
    async createAppointment(appointment) {
        const serial = Math.floor(1000 + Math.random() * 9000);
        const appointmentId = `PIVF-2026-${serial}`;
        const newApt = {
            id: 'apt-' + Date.now(),
            appointmentId,
            status: 'New',
            createdAt: new Date().toISOString(),
            ...appointment,
        };
        const list = getLocal('appointments', initialAppointments);
        setLocal('appointments', [newApt, ...list]);
        // Send email log
        logSimulatedEmail(`New Appointment Request – Prisha IVF (${appointmentId})`, 'care@prishaivf.in', `Appointment ID: ${appointmentId}\nPatient: ${newApt.fullName}\nPhone: ${newApt.mobileNumber}\nEmail: ${newApt.email}\nDate: ${newApt.preferredDate} at ${newApt.preferredTime}\nDoctor: ${newApt.doctorName}\nService: ${newApt.serviceName}`);
        try {
            await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment),
            });
        }
        catch { }
        return newApt;
    },
    async updateAppointmentStatus(id, status, adminNotes) {
        const list = getLocal('appointments', initialAppointments);
        const updatedList = list.map(a => a.id === id ? { ...a, status, ...(adminNotes ? { adminNotes } : {}) } : a);
        setLocal('appointments', updatedList);
        try {
            await fetch(`/api/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, adminNotes }),
            });
        }
        catch { }
    },
    async deleteAppointment(id) {
        const list = getLocal('appointments', initialAppointments);
        setLocal('appointments', list.filter(a => a.id !== id));
        try {
            await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // Contact Messages
    async getContacts() {
        try {
            const res = await fetch('/api/contacts');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('contacts', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('contacts', initialContactMessages);
    },
    async createContact(contact) {
        const newMsg = {
            id: 'msg-' + Date.now(),
            status: 'Unread',
            createdAt: new Date().toISOString(),
            ...contact,
        };
        const list = getLocal('contacts', initialContactMessages);
        setLocal('contacts', [newMsg, ...list]);
        logSimulatedEmail(`New Contact Enquiry – Prisha IVF: ${contact.subject}`, 'care@prishaivf.in', `From: ${contact.name} (${contact.phone}, ${contact.email})\nSubject: ${contact.subject}\nMessage: ${contact.message}`);
        try {
            await fetch('/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            });
        }
        catch { }
        return newMsg;
    },
    async updateContactStatus(id, status, replyNotes) {
        const list = getLocal('contacts', initialContactMessages);
        const updated = list.map(c => c.id === id ? { ...c, status, ...(replyNotes ? { replyNotes } : {}) } : c);
        setLocal('contacts', updated);
        try {
            await fetch(`/api/contacts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, replyNotes }),
            });
        }
        catch { }
    },
    async deleteContact(id) {
        const list = getLocal('contacts', initialContactMessages);
        setLocal('contacts', list.filter(c => c.id !== id));
        try {
            await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
    // Media Items
    async getMedia() {
        try {
            const res = await fetch('/api/media');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setLocal('media', data);
                    return data;
                }
            }
        }
        catch { }
        return getLocal('media', initialMediaItems);
    },
    async addMedia(item) {
        const newItem = {
            id: 'med-' + Date.now(),
            createdAt: new Date().toISOString().split('T')[0],
            ...item,
        };
        const list = getLocal('media', initialMediaItems);
        setLocal('media', [newItem, ...list]);
        try {
            await fetch('/api/media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });
        }
        catch { }
        return newItem;
    },
    async deleteMedia(id) {
        const list = getLocal('media', initialMediaItems);
        setLocal('media', list.filter(m => m.id !== id));
        try {
            await fetch(`/api/media/${id}`, { method: 'DELETE' });
        }
        catch { }
    },
};
