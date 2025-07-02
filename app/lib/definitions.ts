import { z } from 'zod';

export const TemplateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Template name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  imageUrl: z.string().url({ message: "Invalid image URL." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  price: z.preprocess(
    (val) => Number(val), 
    z.number().positive({ message: "Price must be a positive number." })
  ),
  rating: z.preprocess(
    (val) => Number(val), 
    z.number().min(1, { message: "Rating must be at least 1." }).max(5, { message: "Rating cannot exceed 5." })
  ),
  details: z.string().min(20, { message: "Details must be at least 20 characters." }),
  features: z.array(z.string().min(1, { message: "Feature cannot be empty." })).min(1, { message: "At least one feature is required." }),
  technologies: z.array(z.string().min(1, { message: "Technology cannot be empty." })).min(1, { message: "At least one technology is required." }),
});

export type Template = z.infer<typeof TemplateSchema>;

export type TemplateFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    imageUrl?: string[];
    category?: string[];
    price?: string[];
    rating?: string[];
    details?: string[];
    features?: string[];
    technologies?: string[];
    server?: string[];
  };
  message?: string | null;
}; 