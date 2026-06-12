import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { SettingsProvider } from './context/SettingsContext.js';

// Layouts
import PublicLayout from './components/layout/PublicLayout.js';
import AdminLayout from './components/layout/AdminLayout.js';

// Public Pages
import Home from './pages/public/Home.js';
import About from './pages/public/About.js';
import Partners from './pages/public/Partners.js';
import Blog from './pages/public/Blog.js';
import Contact from './pages/public/Contact.js';
import Legal from './pages/public/Legal.js';
import Privacy from './pages/public/Privacy.js';

// Public Services Pages
import TransformationDigitale from './pages/public/services/TransformationDigitale.js';
import AuditCybersecurite from './pages/public/services/AuditCybersecurite.js';
import Formation from './pages/public/services/Formation.js';
import CloudDatacenter from './pages/public/services/CloudDatacenter.js';
import ExpertiseOracle from './pages/public/services/ExpertiseOracle.js';
import DynamicServicePage from './pages/public/services/DynamicServicePage.js';

// Admin Pages
import Login from './pages/admin/Login.js';
import Dashboard from './pages/admin/Dashboard.js';
import NewsList from './pages/admin/NewsList.js';
import NewsEditor from './pages/admin/NewsEditor.js';
import BlogList from './pages/admin/BlogList.js';
import BlogEditor from './pages/admin/BlogEditor.js';
import MessagesList from './pages/admin/MessagesList.js';
import PagesList from './pages/admin/PagesList.js';
import PageEditor from './pages/admin/PageEditor.js';
import Settings from './pages/admin/Settings.js';
import AdminsList from './pages/admin/AdminsList.js';
import { useParams } from 'react-router-dom';

const RedirectToBlogSlug: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  return <Navigate to={`/blog/${slug}`} replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Routes>
            {/* 1. PUBLIC ROUTES */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="a-propos" element={<About />} />
              <Route path="partenaires" element={<Partners />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<Blog />} />
              <Route path="actualites" element={<Navigate to="/blog" replace />} />
              <Route path="actualites/:slug" element={<RedirectToBlogSlug />} />
              <Route path="contact" element={<Contact />} />
              <Route path="mentions-legales" element={<Legal />} />
              <Route path="politique-confidentialite" element={<Privacy />} />
              
              {/* Static Services */}
              <Route path="services/transformation-digitale" element={<TransformationDigitale />} />
              <Route path="services/audit-cybersecurite" element={<AuditCybersecurite />} />
              <Route path="services/formation" element={<Formation />} />
              <Route path="services/cloud-datacenter" element={<CloudDatacenter />} />
              <Route path="services/expertise-oracle" element={<ExpertiseOracle />} />
              
              {/* Dynamic Pages from DB */}
              <Route path="services/fibre-optique" element={<DynamicServicePage dbSlug="fib-opt" />} />
              <Route path="services/energie-solaire" element={<DynamicServicePage dbSlug="ene-sol" />} />
            </Route>

            {/* 2. ADMIN LOGIN ROUTE */}
            <Route path="/admin/login" element={<Login />} />

            {/* 3. ADMIN PRIVATE DASHBOARD ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* News */}
              <Route path="news" element={<NewsList />} />
              <Route path="news/new" element={<NewsEditor />} />
              <Route path="news/edit/:id" element={<NewsEditor />} />
              
              {/* Blog */}
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/new" element={<BlogEditor />} />
              <Route path="blog/edit/:id" element={<BlogEditor />} />
              
              {/* Messages */}
              <Route path="messages" element={<MessagesList />} />
              
              {/* Static Pages */}
              <Route path="pages" element={<PagesList />} />
              <Route path="pages/edit/:slug" element={<PageEditor />} />
              
              {/* Settings */}
              <Route path="settings" element={<Settings />} />
              
              {/* Admin Management */}
              <Route path="users" element={<AdminsList />} />
            </Route>

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
