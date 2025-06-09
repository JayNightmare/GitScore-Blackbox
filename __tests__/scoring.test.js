/**
 * Unit tests for scoring algorithm
 * Tests various scenarios and edge cases for repository scoring
 */

import { calculateScore } from '../lib/scoring';

describe('Repository Scoring', () => {
  const mockRepoData = {
    stars: 1000,
    forks: 100,
    hasReadme: true,
    hasLicense: true,
    recentCommits: 5,
    hasWorkflows: true,
    lastUpdated: new Date().toISOString(),
  };

  test('calculates score for typical repository', () => {
    const result = calculateScore(mockRepoData);
    
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThanOrEqual(10);
    expect(result.breakdown).toHaveLength(6);
    expect(result.rawMetrics).toBeDefined();
  });

  test('handles repository with no stars or forks', () => {
    const noStarsData = {
      ...mockRepoData,
      stars: 0,
      forks: 0,
    };
    
    const result = calculateScore(noStarsData);
    expect(result.score).toBeGreaterThan(0); // Should still have score from other metrics
  });

  test('penalizes repositories without documentation', () => {
    const noReadmeData = {
      ...mockRepoData,
      hasReadme: false,
      hasLicense: false,
    };
    
    const withDocs = calculateScore(mockRepoData);
    const withoutDocs = calculateScore(noReadmeData);
    
    expect(withDocs.score).toBeGreaterThan(withoutDocs.score);
  });

  test('rewards recent activity', () => {
    const recentData = {
      ...mockRepoData,
      lastUpdated: new Date().toISOString(),
      recentCommits: 10,
    };
    
    const oldData = {
      ...mockRepoData,
      lastUpdated: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      recentCommits: 0,
    };
    
    const recentResult = calculateScore(recentData);
    const oldResult = calculateScore(oldData);
    
    expect(recentResult.score).toBeGreaterThan(oldResult.score);
  });

  test('handles high star counts correctly', () => {
    const highStarData = {
      ...mockRepoData,
      stars: 50000,
    };
    
    const result = calculateScore(highStarData);
    const starsMetric = result.breakdown.find(b => b.metric === 'Stars');
    
    expect(starsMetric.score).toBeLessThanOrEqual(10);
  });

  test('breakdown includes all required metrics', () => {
    const result = calculateScore(mockRepoData);
    const metricNames = result.breakdown.map(b => b.metric.toLowerCase());
    
    expect(metricNames).toContain('stars');
    expect(metricNames).toContain('forks');
    expect(metricNames).toContain('has readme');
    expect(metricNames).toContain('has license');
    expect(metricNames).toContain('recent activity');
    expect(metricNames).toContain('has workflows');
  });

  test('weighted scores sum correctly', () => {
    const result = calculateScore(mockRepoData);
    const totalWeighted = result.breakdown.reduce((sum, item) => sum + item.weighted, 0);
    
    expect(Math.abs(totalWeighted - result.score)).toBeLessThan(0.1);
  });
});
