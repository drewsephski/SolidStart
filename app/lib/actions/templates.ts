'use server';

import { TemplateSchema, TemplateFormState } from '@/app/lib/definitions';
import { z } from 'zod';

// Mock database for demonstration purposes
interface TemplateDB {
  [id: string]: z.infer<typeof TemplateSchema>;
}

const db: TemplateDB = {
  '1': {
    id: '1',
    name: 'SaaS Boilerplate Pro',
    description: 'A comprehensive Next.js 15+ boilerplate with authentication, payments, and admin dashboard.',
    imageUrl: '/images/features/features-light-01.png',
    category: 'Business',
    price: 299,
    rating: 4.8,
    details: 'This boilerplate provides a solid foundation for any SaaS application, integrating user authentication, subscription management via Stripe, and a robust admin dashboard. It is built with Next.js 15+, React 19, and TypeScript, ensuring high performance and developer-friendly experience. Fully customizable and extensible to fit your unique business needs.',
    features: ['User Authentication', 'Stripe Payments', 'Admin Dashboard', 'Responsive Design', 'SEO Optimized', 'Modular Architecture'],
    technologies: ['Next.js 15+', 'React 19', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'NextAuth.js'],
  },
  '2': {
    id: '2',
    name: 'E-commerce Storefront',
    description: 'Fully functional e-commerce template with Stripe integration and product management.',
    imageUrl: '/images/features/features-light-01.png',
    category: 'E-commerce',
    price: 199,
    rating: 4.5,
    details: 'Launch your online store quickly with this feature-rich e-commerce template. It includes product listings, shopping cart, checkout process with Stripe, and order management. Designed for scalability and an excellent user experience.',
    features: ['Product Listings', 'Shopping Cart', 'Stripe Checkout', 'Order Management', 'User Reviews', 'Search & Filter'],
    technologies: ['Next.js 15+', 'React 19', 'TypeScript', 'Shadcn UI', 'Stripe', 'MongoDB'],
  },
};

export async function getTemplates(): Promise<z.infer<typeof TemplateSchema>[]> {
  // In a real application, fetch from a database
  return Object.values(db);
}

export async function getTemplateById(id: string): Promise<z.infer<typeof TemplateSchema> | null> {
  // In a real application, fetch from a database
  return db[id] || null;
}

export async function onSubmitAction(prevState: TemplateFormState, formData: FormData): Promise<TemplateFormState> {
  const id = formData.get('id') as string;

  const validatedFields = TemplateSchema.safeParse({
    id: id || undefined,
    name: formData.get('name'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    category: formData.get('category'),
    price: formData.get('price'),
    rating: formData.get('rating'),
    details: formData.get('details'),
    features: formData.getAll('features'), // Assuming features is a multi-select or array input
    technologies: formData.getAll('technologies'), // Assuming technologies is a multi-select or array input
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Failed.',
    };
  }

  const templateData = validatedFields.data;

  if (id) {
    // Update existing template
    if (db[id]) {
      db[id] = { ...db[id], ...templateData };
      return { message: 'Template updated successfully!' };
    } else {
      return { errors: { server: ['Template not found.'] }, message: 'Failed to update template.' };
    }
  } else {
    // Create new template
    const newId = String(Object.keys(db).length + 1);
    db[newId] = { ...templateData, id: newId };
    return { message: 'Template created successfully!' };
  }
}

export async function deleteTemplate(id: string): Promise<TemplateFormState> {
  if (db[id]) {
    delete db[id];
    return { message: 'Template deleted successfully!' };
  } else {
    return { errors: { server: ['Template not found.'] }, message: 'Failed to delete template.' };
  }
} 