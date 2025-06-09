/**
 * SearchForm component
 * Handles repository search input with owner/repo format validation
 */

import { useState } from 'react';

export default function SearchForm({ onSearch, isLoading }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter a repository');
      return;
    }

    const parts = trimmed.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      setError('Please enter in format: owner/repository');
      return;
    }

    const [owner, repo] = parts;
    onSearch(owner, repo);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo-input" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Repository
          </label>
          <input
            id="repo-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="owner/repository (e.g., facebook/react)"
            className={`search-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Repository'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Try popular repositories like:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {['facebook/react', 'microsoft/vscode', 'vercel/next.js'].map((repo) => (
            <button
              key={repo}
              onClick={() => setInput(repo)}
              className="text-blue-600 hover:text-blue-800 underline"
              disabled={isLoading}
            >
              {repo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
