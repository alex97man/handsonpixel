import ProjectsGrid from '../components/ProjectsGrid';
import SEO from '../components/SEO';

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Portofoliu Hands On Pixel",
  "description": "Exemple de proiecte Shopify, design de brand și fotografie de produs.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Beerstation.ro - Shopify Store",
      "url": "https://handsonpixel.ro/portofoliu/beerstation-ro"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Souly.ro - Shopify Store",
      "url": "https://handsonpixel.ro/portofoliu/souly-ro"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Blue - Product Photography",
      "url": "https://handsonpixel.ro/portofoliu/blue"
    }
  ]
};

export default function Portofoliu() {
  return (
    <div className="pt-20">
      <SEO 
        title="Portofoliu"
        description="Explorați portofoliul Hands On Pixel: Proiecte premium de e-commerce Shopify, design de brand și fotografie de produs."
        schema={portfolioSchema}
      />
      <ProjectsGrid />
    </div>
  );
}


