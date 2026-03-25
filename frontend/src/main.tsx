import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute.tsx'
import SiteLayout from './components/site/SiteLayout.tsx'
import CostEstimatorPage from './pages/CostEstimatorPage.tsx'
import AdminLoginPage from './pages/AdminLoginPage.tsx'
import AdminRegisterPage from './pages/AdminRegisterPage.tsx'
import BlogsPage from './pages/BlogsPage.tsx'
import CompanyProfilePage from './pages/CompanyProfilePage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import { featurePages } from './data/featurePages.ts'
import { footerPages } from './data/footerPages.ts'
import FeatureContentPage from './pages/FeatureContentPage.tsx'
import FooterContentPage from './pages/FooterContentPage.tsx'
import NewsMediaPage from './pages/NewsMediaPage.tsx'
import PackageComparePage from './pages/PackageComparePage.tsx'
import PackageDetailPage from './pages/PackageDetailPage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import ServicesPage from './pages/ServicesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/company-profile" element={<CompanyProfilePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          {featurePages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={<FeatureContentPage slug={page.slug} />}
            />
          ))}
          {footerPages.filter((page) => page.slug !== 'contacts' && page.slug !== 'news-media').map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={<FooterContentPage slug={page.slug} />}
            />
          ))}
          <Route path="/news-media" element={<NewsMediaPage />} />
          <Route path="/cost-estimator" element={<CostEstimatorPage />} />
          <Route path="/packages/compare" element={<PackageComparePage />} />
          <Route path="/compare-packages" element={<PackageComparePage />} />
          <Route path="/packages/:slug" element={<PackageDetailPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
