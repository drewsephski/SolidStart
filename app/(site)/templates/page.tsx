import { NextPage } from 'next';
import TemplateCard from '@/components/Templates/TemplateCard';
import { Template } from '@/app/lib/definitions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

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

const TemplatesPage: NextPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in'); // Redirect to sign-in page if not authenticated
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Template Marketplace</h1>
      <p className="mt-4">Browse our collection of SaaS boilerplates and templates.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
