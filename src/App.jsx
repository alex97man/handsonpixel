import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Despre from './pages/Despre';
import Servicii from './pages/Servicii';
import Portofoliu from './pages/Portofoliu';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AITest from './pages/AITest';

import SoulyRo from './pages/portofoliu/SoulyRo';
import BeerstationRo from './pages/portofoliu/BeerstationRo';
import Packshot from './pages/portofoliu/Packshot';
import Experimental from './pages/portofoliu/Experimental';
import Blue from './pages/portofoliu/Blue';
import SoulyPhoto from './pages/portofoliu/SoulyPhoto';
import ProdusePersonalizabile from './pages/portofoliu/ProdusePersonalizabile';
import ResearchReport from './pages/portofoliu/ResearchReport';
import RebrandingVerde from './pages/portofoliu/RebrandingVerde';
import KVVerde2024 from './pages/portofoliu/KVVerde2024';
import KVVerde2025 from './pages/portofoliu/KVVerde2025';
import LogoSouly from './pages/portofoliu/LogoSouly';

import FotografieProdus from './pages/blog/FotografieProdus';
import LogoBusiness from './pages/blog/LogoBusiness';
import ShopifyVsWooCommerce from './pages/blog/ShopifyVsWooCommerce';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="despre" element={<Despre />} />
          <Route path="servicii" element={<Servicii />} />
          <Route path="portofoliu" element={<Portofoliu />} />
          
          <Route path="portofoliu/souly-ro" element={<SoulyRo />} />
          <Route path="portofoliu/beerstation-ro" element={<BeerstationRo />} />
          <Route path="portofoliu/packshot" element={<Packshot />} />
          <Route path="portofoliu/experimental" element={<Experimental />} />
          <Route path="portofoliu/blue" element={<Blue />} />
          <Route path="portofoliu/souly-photo" element={<SoulyPhoto />} />
          <Route path="portofoliu/produse-personalizabile" element={<ProdusePersonalizabile />} />
          <Route path="portofoliu/research-report" element={<ResearchReport />} />
          <Route path="portofoliu/rebranding-verde-la-teatru" element={<RebrandingVerde />} />
          <Route path="portofoliu/kv-verde-la-teatru-2024" element={<KVVerde2024 />} />
          <Route path="portofoliu/kv-verde-la-teatru-2025" element={<KVVerde2025 />} />
          <Route path="portofoliu/logo-souly" element={<LogoSouly />} />

          <Route path="blog" element={<Blog />} />
          <Route path="blog/fotografie-produs" element={<FotografieProdus />} />
          <Route path="blog/logo-business" element={<LogoBusiness />} />
          <Route path="blog/shopify-vs-woocommerce" element={<ShopifyVsWooCommerce />} />

          <Route path="contact" element={<Contact />} />
          <Route path="studio-test" element={<AITest />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
