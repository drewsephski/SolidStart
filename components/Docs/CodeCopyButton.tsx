"use client";

import React, { useState } from 'react';

interface CodeCopyButtonProps {
  code: string;
}

const CodeCopyButton: React.FC<CodeCopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-sm rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CodeCopyButton;