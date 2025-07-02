import { NextPage } from 'next';
import Image from 'next/image';
import { Template } from '@/app/lib/definitions';

const templates: Template[] = [
  {
    id: 'saas-starter',
    name: 'SaaS Starter',
    description: 'A basic template for starting a SaaS application.',
    imageUrl: '/images/templates/saas-starter.png', // Placeholder image
    category: 'SaaS',
    price: 49,
    rating: 4.5,
    details: 'This template provides a solid foundation for any SaaS application, including user authentication, a dashboard, and basic CRUD operations.',
    features: ['User Auth', 'Dashboard', 'CRUD Operations'],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL']
  },
  {
    id: 'ecommerce-pro',
    name: 'E-commerce Pro',
    description: 'A feature-rich template for e-commerce sites.',
    imageUrl: '/images/templates/ecommerce-pro.png', // Placeholder image
    category: 'E-commerce',
    price: 79,
    rating: 4.8,
    details: 'Build a powerful e-commerce store with this template, featuring product listings, shopping cart, and checkout flow.',
    features: ['Product Listings', 'Shopping Cart', 'Checkout'],
    technologies: ['Next.js', 'Stripe', 'MongoDB']
  },
  {
    id: 'blogify',
    name: 'Blogify',
    description: 'A simple and elegant blog template.',
    imageUrl: '/images/templates/blogify.png', // Placeholder image
    category: 'Blog',
    price: 29,
    rating: 4.2,
    details: 'A clean and responsive blog template perfect for personal blogs or content marketing.',
    features: ['Markdown Support', 'Comments', 'SEO Friendly'],
    technologies: ['Next.js', 'MDX', 'Firebase']
  }
];

interface TemplateDetailProps {
  params: { id: string };
}

const TemplateDetailPage: NextPage<TemplateDetailProps> = ({ params }) => {
  const { id } = params;

  const template = templates.find(t => t.id === id);

  if (!template) {
    return <div className="container mx-auto px-4 py-8">Template not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{template.name}</h1>
      <div className="mt-6 mb-8 relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <Image src={template.imageUrl} alt={`${template.name} Preview`} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-xl font-semibold">
          Template Preview (Placeholder)
        </div>
      </div>
      <p className="mt-4 text-lg">{template.details}</p>
      <p className="mt-2 text-gray-600">Author: {template.author}</p>
      <p className="mt-2 text-gray-600">Category: {template.category}</p>
      <p className="mt-2 text-gray-600">Price: ${template.price}</p>
      <p className="mt-2 text-gray-600">Rating: {template.rating}</p>

      <h2 className="text-2xl font-bold mt-8">Features:</h2>
      <ul className="list-disc list-inside mt-4">
        {template.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8">Technologies:</h2>
      <ul className="list-disc list-inside mt-4">
        {template.technologies.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateDetailPage;