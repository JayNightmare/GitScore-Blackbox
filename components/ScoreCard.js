/**
 * ScoreCard component
 * Displays repository score with animated counter and metric breakdown
 */

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

export default function ScoreCard({ score, breakdown, isLoading }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="score-card animate-pulse">
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="score-card">
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-blue-600 mb-2">
          <CountUp
            end={score}
            decimals={1}
            duration={2}
            separator=","
          />
          <span className="text-2xl">/10</span>
        </div>
        <div className="text-gray-600">Repository Score</div>
      </div>

      <div className="space-y-2">
        {breakdown.map(({ metric, score, weight, weighted }) => (
          <div key={metric} className="metric-item">
            <div className="flex-1">
              <span className="text-gray-700">{metric}</span>
              <span className="text-gray-400 text-sm ml-2">
                (weight: {(weight * 100).toFixed()}%)
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-900 font-medium">{score.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-2">
                ({weighted.toFixed(1)})
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
        Scores are calculated based on various metrics including stars, forks, documentation, and activity
      </div>
    </div>
  );
}
