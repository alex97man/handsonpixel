import ProjectsGrid from '../components/ProjectsGrid';
import SEO from '../components/SEO';

export default function Portofoliu() {
  return (
    <div className="pt-20">
      <SEO 
        title="Portofoliu"
        description="Explorați portofoliul Hands On Pixel: Proiecte premium de e-commerce Shopify, design de brand și fotografie de produs."
      />
      <ProjectsGrid />
    </div>
  );
}


