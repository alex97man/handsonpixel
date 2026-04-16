import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import HomeServices from '../components/HomeServices';
import PartnersMarquee from '../components/PartnersMarquee';
import HomeProjects from '../components/HomeProjects';
import SEO from '../components/SEO';

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hands On Pixel",
  "image": "https://handsonpixel.ro/og-image.jpg",
  "@id": "https://handsonpixel.ro/",
  "url": "https://handsonpixel.ro/",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "București",
    "postalCode": "",
    "addressCountry": "RO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.4268,
    "longitude": 26.1025
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.instagram.com/handsonpixel"
  ]
};

const FadeInSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="w-full">
      <SEO 
        description="Hands On Pixel - Specialist în Shopify, Design Graphic și Fotografie de produs. Livrăm performanță pură și design brutalist-modern."
        schema={homeSchema}
      />
      <HeroSection />

      <HomeServices />

      <HomeProjects />

      <FadeInSection>
        <PartnersMarquee />
      </FadeInSection>
    </div>
  );
}
