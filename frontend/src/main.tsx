import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'


import SiteLayout from './components/site/SiteLayout.tsx'
import CostEstimatorPage from './pages/CostEstimatorPage.tsx'
import AdminLoginPage from './pages/AdminLoginPage.tsx'
import BlogsPage from './pages/BlogsPage.tsx'
import BlogDetailPage from './pages/BlogDetailPage.tsx'
import CompanyProfilePage from './pages/CompanyProfilePage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import AdminDashBoard from './pages/AdminDashBoard.tsx'
import { featurePages } from './data/featurePages.ts'
import { footerPages } from './data/footerPages.ts'
import FeatureContentPage from './pages/FeatureContentPage.tsx'
import FooterContentPage from './pages/FooterContentPage.tsx'
import NewsMediaPage from './pages/services/InteriorPage.tsx'
import PackageComparePage from './pages/PackageComparePage.tsx'
import PackageDetailPage from './pages/PackageDetailPage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import ServicesPage from './pages/ServicesPage.tsx'
import InteriorPage from './pages/services/InteriorPage.tsx'
import HomeRenovationPage from './pages/services/HomeRenovationPage.tsx'
import ConstructionPage from './pages/services/ConstructionPage.tsx'
import ElevationPage from './pages/services/ElevationPage.tsx'
import TerraceGardenPage from './pages/services/TerraceGardenPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/company-profile" element={<CompanyProfilePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          {featurePages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={<FeatureContentPage slug={page.slug} />}
            />
          ))}
          
          <Route path="/services/construction" element={<ConstructionPage />} />
          <Route path="/services/interior-design" element={<InteriorPage />} />
          <Route path="/services/home-renovation" element={<HomeRenovationPage />} />
          <Route path="/services/elevation-page" element={<ElevationPage />} />
          <Route path="/services/terrace-garden-page" element={<TerraceGardenPage />} />
          <Route path="/cost-estimator" element={<CostEstimatorPage />} />
          <Route path="/packages" element={<PackageDetailPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
