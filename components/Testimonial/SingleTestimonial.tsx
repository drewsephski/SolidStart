import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleTestimonial = ({ review }: { review: Testimonial }) => {
  const { name, designation, image, content } = review;
  return (
    <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none transition-all duration-300 hover:scale-105">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-xl font-semibold text-black dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-body dark:text-bodydark">{designation}</p>
        </div>
        <Image width={60} height={50} className="" src={image} alt={name} />
      </div>

      <p className="text-base text-body dark:text-bodydark leading-relaxed">{content}</p>
    </div>
  );
};

export default SingleTestimonial;
