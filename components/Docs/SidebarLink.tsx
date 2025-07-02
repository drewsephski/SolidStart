"use client";
import Link from "next/link";
const SidebarLink = () => {
  const slugs = [
    { slug: 'bootstrap-template', name: 'Bootstrap Template' },
    { slug: 'contact-form', name: 'Contact Form' },
    { slug: 'saas-overview', name: 'Saas Overview' },
    { slug: 'style-guide', name: 'Style Guide' },
    { slug: 'tailwind-component', name: 'Tailwind Component' },
    { slug: 'tailwind-template', name: 'Tailwind Template' },
  ];

  return (
    <>
      <li className="block">
      
        <Link
          href={`/docs`}
          className={`flex w-full rounded-xs bg-stroke px-3 py-2 text-base text-black dark:bg-blackho dark:text-white`}
        >
          Introduction
        </Link>
        {slugs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className={`flex w-full rounded-xs px-3 py-2 text-base text-black dark:text-white `}
          >
            {doc.name}
          </Link>
        ))}
      </li>
    </>
  );
};

export default SidebarLink;
