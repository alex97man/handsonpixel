import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import HomeServices from '../components/HomeServices';
import PartnersMarquee from '../components/PartnersMarquee';
import HomeProjects from '../components/HomeProjects';

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
      <HeroSection />

      <HomeServices />

      <HomeProjects />

      <FadeInSection>
        <PartnersMarquee />
      </FadeInSection>
    </div>
  );
}
