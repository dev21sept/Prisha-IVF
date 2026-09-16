const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const EMAIL_LOG_FILE = path.join(DATA_DIR, 'email-outbox.log');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Database Loader
function loadDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading db.json, re-initializing...', err);
    }
  }

  // Fallback / Initial Seed
  const initialData = {
    settings: {
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
    },
    homepage: {
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
    },
    doctors: [],
    services: [],
    blogs: [],
    testimonials: [],
    faqs: [],
    appointments: [],
    contacts: [],
    media: [],
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

let db = loadDatabase();

function saveDatabase() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// Simulated Email Sender
function sendEmailNotification({ to, subject, html, plainText }) {
  const timestamp = new Date().toISOString();
  const logEntry = `\n======================================================
TIMESTAMP: ${timestamp}
TO: ${to || 'care@prishaivf.in'}
SUBJECT: ${subject}
------------------------------------------------------
${plainText || html}
======================================================\n`;

  console.log(`[EMAIL DISPATCHED] -> ${subject} to ${to || 'Admin'}`);
  fs.appendFileSync(EMAIL_LOG_FILE, logEntry, 'utf-8');
}

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// Admin Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Default master admin credentials
  if (email === 'admin@prishaivf.in' && password === 'Admin@Prisha2026') {
    return res.json({
      success: true,
      user: {
        id: 'usr-admin-1',
        name: 'Dr. Radhika Sharma (Admin)',
        email: 'admin@prishaivf.in',
        role: 'superadmin',
        token: 'prisha_jwt_sec_' + Date.now(),
      },
    });
  }
  // Demo easy login fallback for testing
  if (email && password === 'admin123') {
    return res.json({
      success: true,
      user: {
        id: 'usr-admin-demo',
        name: 'Prisha Admin User',
        email,
        role: 'admin',
        token: 'prisha_jwt_demo_' + Date.now(),
      },
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials. Use admin@prishaivf.in / Admin@Prisha2026' });
});

// Site Settings
app.get('/api/settings', (req, res) => res.json(db.settings));
app.put('/api/settings', (req, res) => {
  db.settings = { ...db.settings, ...req.body };
  saveDatabase();
  res.json(db.settings);
});

// Homepage Content
app.get('/api/homepage', (req, res) => res.json(db.homepage));
app.put('/api/homepage', (req, res) => {
  db.homepage = { ...db.homepage, ...req.body };
  saveDatabase();
  res.json(db.homepage);
});

// Doctors CRUD
app.get('/api/doctors', (req, res) => res.json(db.doctors || []));
app.post('/api/doctors', (req, res) => {
  const newDoctor = { id: 'doc-' + Date.now(), ...req.body };
  db.doctors = [newDoctor, ...(db.doctors || [])];
  saveDatabase();
  res.status(201).json(newDoctor);
});
app.put('/api/doctors/:id', (req, res) => {
  db.doctors = (db.doctors || []).map(d => d.id === req.params.id ? { ...d, ...req.body } : d);
  saveDatabase();
  res.json(db.doctors.find(d => d.id === req.params.id));
});
app.delete('/api/doctors/:id', (req, res) => {
  db.doctors = (db.doctors || []).filter(d => d.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Services CRUD
app.get('/api/services', (req, res) => res.json(db.services || []));
app.post('/api/services', (req, res) => {
  const newService = { id: 'srv-' + Date.now(), ...req.body };
  db.services = [newService, ...(db.services || [])];
  saveDatabase();
  res.status(201).json(newService);
});
app.put('/api/services/:id', (req, res) => {
  db.services = (db.services || []).map(s => s.id === req.params.id ? { ...s, ...req.body } : s);
  saveDatabase();
  res.json(db.services.find(s => s.id === req.params.id));
});
app.delete('/api/services/:id', (req, res) => {
  db.services = (db.services || []).filter(s => s.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Blog CRUD
app.get('/api/blogs', (req, res) => res.json(db.blogs || []));
app.post('/api/blogs', (req, res) => {
  const newBlog = { id: 'blog-' + Date.now(), ...req.body };
  db.blogs = [newBlog, ...(db.blogs || [])];
  saveDatabase();
  res.status(201).json(newBlog);
});
app.put('/api/blogs/:id', (req, res) => {
  db.blogs = (db.blogs || []).map(b => b.id === req.params.id ? { ...b, ...req.body } : b);
  saveDatabase();
  res.json(db.blogs.find(b => b.id === req.params.id));
});
app.delete('/api/blogs/:id', (req, res) => {
  db.blogs = (db.blogs || []).filter(b => b.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Testimonials CRUD
app.get('/api/testimonials', (req, res) => res.json(db.testimonials || []));
app.post('/api/testimonials', (req, res) => {
  const item = { id: 'test-' + Date.now(), ...req.body };
  db.testimonials = [item, ...(db.testimonials || [])];
  saveDatabase();
  res.status(201).json(item);
});
app.put('/api/testimonials/:id', (req, res) => {
  db.testimonials = (db.testimonials || []).map(t => t.id === req.params.id ? { ...t, ...req.body } : t);
  saveDatabase();
  res.json(db.testimonials.find(t => t.id === req.params.id));
});
app.delete('/api/testimonials/:id', (req, res) => {
  db.testimonials = (db.testimonials || []).filter(t => t.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// FAQs CRUD
app.get('/api/faqs', (req, res) => res.json(db.faqs || []));
app.post('/api/faqs', (req, res) => {
  const item = { id: 'faq-' + Date.now(), ...req.body };
  db.faqs = [item, ...(db.faqs || [])];
  saveDatabase();
  res.status(201).json(item);
});
app.put('/api/faqs/:id', (req, res) => {
  db.faqs = (db.faqs || []).map(f => f.id === req.params.id ? { ...f, ...req.body } : f);
  saveDatabase();
  res.json(db.faqs.find(f => f.id === req.params.id));
});
app.delete('/api/faqs/:id', (req, res) => {
  db.faqs = (db.faqs || []).filter(f => f.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Appointments Management & Email Notification
app.get('/api/appointments', (req, res) => res.json(db.appointments || []));
app.post('/api/appointments', (req, res) => {
  const serial = Math.floor(1000 + Math.random() * 9000);
  const appointmentId = `PIVF-2026-${serial}`;
  const newAppointment = {
    id: 'apt-' + Date.now(),
    appointmentId,
    status: 'New',
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  db.appointments = [newAppointment, ...(db.appointments || [])];
  saveDatabase();

  // Send Notification Email to Clinic Admin
  sendEmailNotification({
    to: 'care@prishaivf.in',
    subject: `New Appointment Request – Prisha IVF (${appointmentId})`,
    plainText: `A new appointment request has been submitted on prishaivf.in:
- Appointment ID: ${appointmentId}
- Patient Name: ${newAppointment.fullName}
- Mobile: ${newAppointment.mobileNumber}
- Email: ${newAppointment.email}
- Preferred Date: ${newAppointment.preferredDate}
- Preferred Time: ${newAppointment.preferredTime}
- Doctor: ${newAppointment.doctorName || 'Any Specialist'}
- Service: ${newAppointment.serviceName || 'Consultation'}
- City: ${newAppointment.city || 'N/A'}
- Message: ${newAppointment.message || 'No additional message'}`,
  });

  // Patient Confirmation Email
  if (newAppointment.email) {
    sendEmailNotification({
      to: newAppointment.email,
      subject: `Appointment Request Received – Prisha IVF (${appointmentId})`,
      plainText: `Dear ${newAppointment.fullName},

Thank you for contacting Prisha IVF. Your appointment request has been received with ID: ${appointmentId}.
Our clinical coordination desk will contact you at ${newAppointment.mobileNumber} to confirm your consulting slot.

Best regards,
Patient Care Team, Prisha IVF
prishaivf.in | +91 98982 26201`,
    });
  }

  res.status(201).json({ success: true, appointment: newAppointment });
});

app.put('/api/appointments/:id', (req, res) => {
  db.appointments = (db.appointments || []).map(a => a.id === req.params.id ? { ...a, ...req.body } : a);
  saveDatabase();
  res.json(db.appointments.find(a => a.id === req.params.id));
});

app.delete('/api/appointments/:id', (req, res) => {
  db.appointments = (db.appointments || []).filter(a => a.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Contact Messages & Email Notification
app.get('/api/contacts', (req, res) => res.json(db.contacts || []));
app.post('/api/contacts', (req, res) => {
  const newMessage = {
    id: 'msg-' + Date.now(),
    status: 'Unread',
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  db.contacts = [newMessage, ...(db.contacts || [])];
  saveDatabase();

  // Send Notification Email
  sendEmailNotification({
    to: 'care@prishaivf.in',
    subject: `New Contact Enquiry – Prisha IVF: ${newMessage.subject || 'General Enquiry'}`,
    plainText: `A new contact message has been received:
- Name: ${newMessage.name}
- Phone: ${newMessage.phone}
- Email: ${newMessage.email}
- Subject: ${newMessage.subject}
- Message: ${newMessage.message}`,
  });

  res.status(201).json({ success: true, contact: newMessage });
});

app.put('/api/contacts/:id', (req, res) => {
  db.contacts = (db.contacts || []).map(c => c.id === req.params.id ? { ...c, ...req.body } : c);
  saveDatabase();
  res.json(db.contacts.find(c => c.id === req.params.id));
});

app.delete('/api/contacts/:id', (req, res) => {
  db.contacts = (db.contacts || []).filter(c => c.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Media Library
app.get('/api/media', (req, res) => res.json(db.media || []));
app.post('/api/media', (req, res) => {
  const item = {
    id: 'med-' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0],
    ...req.body,
  };
  db.media = [item, ...(db.media || [])];
  saveDatabase();
  res.status(201).json(item);
});
app.delete('/api/media/:id', (req, res) => {
  db.media = (db.media || []).filter(m => m.id !== req.params.id);
  saveDatabase();
  res.json({ success: true, id: req.params.id });
});

// Dashboard Overview Statistics
app.get('/api/stats', (req, res) => {
  const appointments = db.appointments || [];
  const contacts = db.contacts || [];
  res.json({
    totalAppointments: appointments.length,
    newAppointments: appointments.filter(a => a.status === 'New').length,
    confirmedAppointments: appointments.filter(a => a.status === 'Confirmed').length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter(c => c.status === 'Unread').length,
    totalDoctors: (db.doctors || []).length,
    totalServices: (db.services || []).length,
    totalBlogs: (db.blogs || []).length,
  });
});

app.listen(PORT, () => {
  console.log(`Prisha IVF API Backend running on http://localhost:${PORT}`);
});
