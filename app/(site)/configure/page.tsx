import { NextPage } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const ConfigurePage: NextPage = () => {
  const { userId } = auth();
  const [selectedTemplate, setSelectedTemplate] = useState('SaaS Starter');
  const [selectedDatabase, setSelectedDatabase] = useState('PostgreSQL');
  const [selectedAuth, setSelectedAuth] = useState('Clerk');
  const [generatedConfig, setGeneratedConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!userId) {
    redirect('/sign-in');
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setGeneratedConfig(null);
    try {
      const response = await fetch('/api/generate-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: selectedTemplate,
          database: selectedDatabase,
          auth: selectedAuth,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedConfig(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Configuration Generator</h1>
      <p className="mt-4">Generate custom configurations for your SaaS boilerplate.</p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md dark:bg-blacksection">
        <h2 className="text-xl font-bold mb-4">Select Options</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Choose Template:</label>
            <select
              id="template"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option>SaaS Starter</option>
              <option>E-commerce Pro</option>
              <option>Blogify</option>
            </select>
          </div>
          <div>
            <label htmlFor="database" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Database:</label>
            <select
              id="database"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedDatabase}
              onChange={(e) => setSelectedDatabase(e.target.value)}
            >
              <option>PostgreSQL</option>
              <option>MongoDB</option>
              <option>MySQL</option>
            </select>
          </div>
          <div>
            <label htmlFor="auth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Authentication:</label>
            <select
              id="auth"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedAuth}
              onChange={(e) => setSelectedAuth(e.target.value)}
            >
              <option>Clerk</option>
              <option>NextAuth.js</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Configuration'}
        </button>

        {error && (
          <div className="mt-4 text-red-500">
            Error: {error}
          </div>
        )}

        {generatedConfig && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4">Generated Configuration:</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
              {JSON.stringify(generatedConfig, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurePage;