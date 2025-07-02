"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Template } from "@/app/lib/definitions"; // Import the Template type

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection dark:shadow-none">
      <div className="relative block aspect-[368/239] w-full">
        <Image src={template.imageUrl} alt={template.name} fill className="object-cover rounded-md" />
      </div>

      <div className="px-4">
        <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-2xl font-bold leading-snug text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
          {template.name}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-body dark:text-bodydark">
          {template.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-black dark:text-white">${template.price}</span>
          <button
            onClick={handleViewDetails}
            className="cursor-pointer inline-flex items-center gap-2.5 rounded-full bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */} 
      {showModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 dark:bg-blacksection">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="mb-4 text-3xl font-bold text-black dark:text-white">{template.name}</h3>
            <p className="mb-6 text-body dark:text-bodydark">{template.details}</p>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-black dark:text-white mb-3">Key Features</h4>
              <ul className="list-disc list-inside text-body dark:text-bodydark">
                {template.features.map((feature, index) => (
                  <li key={index} className="mb-2 last:mb-0">{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-black dark:text-white mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {template.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stroke pt-6 dark:border-strokedark">
              <span className="text-2xl font-bold text-black dark:text-white">${template.price}</span>
              <button 
                className="cursor-pointer inline-flex items-center gap-2.5 rounded-full bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 transition-all duration-300"
              >
                Purchase Template
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21l-10-10h6v-10h8v10h6l-10 10z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCard; 