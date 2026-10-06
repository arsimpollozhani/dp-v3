import { useEffect } from "react";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useLanguage } from "./i18n/LanguageContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import NewsPage from "./pages/NewsPage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";

function Layout(): JSX.Element {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Header />
      <div id="main-content" key={pathname} className="page-transition">
        <Outlet />
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
}

function NotFound(): JSX.Element {
  const { t } = useLanguage();
  return (
    <main className="container py-5 text-center">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <Link to="/" className="btn-custom btn-primary-custom">
        {t.notFound.homeLink}
      </Link>
    </main>
  );
}

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
