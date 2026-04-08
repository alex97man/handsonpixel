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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="despre" element={<Despre />} />
          <Route path="servicii" element={<Servicii />} />
          <Route path="portofoliu" element={<Portofoliu />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="studio-test" element={<AITest />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
