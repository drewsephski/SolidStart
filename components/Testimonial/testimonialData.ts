import image1 from "@/public/images/user/user-01.png";
import image2 from "@/public/images/user/user-02.png";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Alice Smith",
    designation: "Founder @TechStart",
    image: image1,
    content:
      "The SaaS Template Marketplace has been a game-changer for us. We found a robust boilerplate that saved us months of development time. The quality and documentation are top-notch!",
  },
  {
    id: 2,
    name: "Bob Johnson",
    designation: "CTO @InnovateNow",
    image: image2,
    content:
      "As a CTO, I'm always looking for ways to accelerate our development cycles. This marketplace delivers exactly that. The Next.js 15+ templates are incredibly well-structured and easy to extend.",
  },
  {
    id: 3,
    name: "Charlie Brown",
    designation: "Lead Dev @FutureApp",
    image: image1,
    content:
      "The seamless integrations and clear documentation made it incredibly easy to customize our chosen template. We were able to launch our MVP much faster than anticipated.",
  },
  {
    id: 4,
    name: "Diana Prince",
    designation: "CEO @GrowthHub",
    image: image2,
    content:
      "The support community is fantastic! Whenever we had a question, we received quick and helpful responses. It's more than just templates; it's a complete ecosystem.",
  },
];
