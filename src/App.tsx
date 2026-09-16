import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { ClinicProvider } from './context/ClinicContext';

// Public Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingActionButtons } from './components/common/FloatingActionButtons';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { DoctorsPage } from './pages/public/DoctorsPage';
import { DoctorDetailPage } from './pages/public/DoctorDetailPage';
import { TestimonialsPage } from './pages/public/TestimonialsPage';
import { FAQPage } from './pages/public/FAQPage';
import { BlogPage } from './pages/public/BlogPage';
import { BlogDetailPage } from './pages/public/BlogDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { AppointmentPage } from './pages/public/AppointmentPage';
import { PrivacyPolicyPage, TermsConditionsPage } from './pages/public/LegalPages';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Components & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AppointmentsPage } from './pages/admin/AppointmentsPage';
import { ContactsPage } from './pages/admin/ContactsPage';
import { DoctorsManagerPage } from './pages/admin/DoctorsManagerPage';
import { ServicesManagerPage } from './pages/admin/ServicesManagerPage';
import { BlogManagerPage } from './pages/admin/BlogManagerPage';
import { TestimonialsManagerPage } from './pages/admin/TestimonialsManagerPage';
import { FAQManagerPage } from './pages/admin/FAQManagerPage';
import { HomepageEditorPage } from './pages/admin/HomepageEditorPage';
import { SiteSettingsPage } from './pages/admin/SiteSettingsPage';
import { MediaManagerPage } from './pages/admin/MediaManagerPage';

// Scroll To Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Website Layout Wrapper
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ClinicProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:slug" element={<DoctorDetailPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin CMS Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="doctors" element={<DoctorsManagerPage />} />
            <Route path="services" element={<ServicesManagerPage />} />
            <Route path="blog" element={<BlogManagerPage />} />
            <Route path="testimonials" element={<TestimonialsManagerPage />} />
            <Route path="faqs" element={<FAQManagerPage />} />
            <Route path="homepage" element={<HomepageEditorPage />} />
            <Route path="settings" element={<SiteSettingsPage />} />
            <Route path="media" element={<MediaManagerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClinicProvider>
  );
};

export default App;
