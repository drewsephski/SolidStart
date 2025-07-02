import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import CodeCopyButton from '@/components/Docs/CodeCopyButton';
import CollapsibleSection from '@/components/Docs/CollapsibleSection';

export const dynamicParams = false;

const components = {
  CodeCopyButton,
  CollapsibleSection,
};

const mdxContentMap: { [key: string]: string } = {
  'bootstrap-template': `
# Bootstrap Template

This is the content for the Bootstrap Template.
`,
  'contact-form': `
# Contact Form

This is the content for the Contact Form.
`,
  'saas-overview': `
# SaaS Overview

This is the content for the SaaS Overview.
`,
  'style-guide': `
# Style Guide

This is the content for the Style Guide.
`,
  'tailwind-component': `
# Tailwind Component

This is the content for the Tailwind Component.
`,
  'tailwind-template': `
# Tailwind Template

This is the content for the Tailwind Template.
`,
};

export default async function DocPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let source;

  const mdxContent = mdxContentMap[slug];

  if (!mdxContent) {
    return <div>Documentation not found.</div>;
  }

  source = await serialize(mdxContent, { scope: {} });

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose dark:prose-invert max-w-none">
        <MDXRemote {...source} components={components} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(mdxContentMap).map((slug) => ({
    slug,
  }));
}