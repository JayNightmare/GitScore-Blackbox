/**
 * Home page component
 * Main entry point with repository search and score display
 */

import { useState } from 'react';
import Head from 'next/head';
import { fetchRepoData, isValidRepo } from '../lib/github';
import { calculateScore } from '../lib/scoring';
import { getCachedScore, setCachedScore } from '../lib/cache';
import SearchForm from '../components/SearchForm';
import ScoreCard from '../components/ScoreCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const analyzeRepo = async (owner, repo) => {
    setLoading(true);
    setError('');

    try {
      // Check cache first
      const cached = getCachedScore(owner, repo);
      if (cached) {
        setResult(cached);
        setLoading(false);
        return;
      }

      // Validate repository exists
      const exists = await isValidRepo(owner, repo);
      if (!exists) {
        setError('Repository not found');
        setLoading(false);
        return;
      }

      // Fetch and analyze repository data
      const repoData = await fetchRepoData(owner, repo);
      const scoreResult = calculateScore(repoData);

      // Cache the results
      setCachedScore(owner, repo, scoreResult);
      setResult(scoreResult);
    } catch (err) {
      console.error('Error analyzing repository:', err);
      setError(err.message || 'Failed to analyze repository');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>GitHub Repository Scorer</title>
        <meta name="description" content="Analyze and score GitHub repositories based on various metrics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GitHub Repository Scorer
          </h1>
          <p className="text-lg text-gray-600">
            Analyze repositories and get a quality score based on stars, documentation, and activity
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <SearchForm onSearch={analyzeRepo} isLoading={loading} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {(result || loading) && (
            <ScoreCard
              score={result?.score || 0}
              breakdown={result?.breakdown || []}
              isLoading={loading}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
