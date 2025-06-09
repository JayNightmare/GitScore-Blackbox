/**
 * Repository scoring algorithm
 * Computes weighted scores based on various repository metrics and returns breakdown
 */

const WEIGHTS = {
  stars: 0.25,
  forks: 0.15,
  hasReadme: 0.15,
  hasLicense: 0.10,
  recentActivity: 0.20,
  hasWorkflows: 0.15,
};

function normalizeStars(stars) {
  if (stars === 0) return 0;
  if (stars >= 10000) return 10;
  return Math.log10(stars + 1) * 2.5;
}

function normalizeForks(forks) {
  if (forks === 0) return 0;
  if (forks >= 1000) return 10;
  return Math.log10(forks + 1) * 3.33;
}

function calculateRecentActivity(lastUpdated, recentCommits) {
  const daysSinceUpdate = (Date.now() - new Date(lastUpdated)) / (1000 * 60 * 60 * 24);
  
  let activityScore = 0;
  
  if (daysSinceUpdate <= 7) activityScore += 5;
  else if (daysSinceUpdate <= 30) activityScore += 3;
  else if (daysSinceUpdate <= 90) activityScore += 1;
  
  activityScore += Math.min(recentCommits * 0.5, 5);
  
  return Math.min(activityScore, 10);
}

export function calculateScore(repoData) {
  const metrics = {
    stars: normalizeStars(repoData.stars),
    forks: normalizeForks(repoData.forks),
    hasReadme: repoData.hasReadme ? 10 : 0,
    hasLicense: repoData.hasLicense ? 10 : 0,
    recentActivity: calculateRecentActivity(repoData.lastUpdated, repoData.recentCommits),
    hasWorkflows: repoData.hasWorkflows ? 10 : 0,
  };

  const weightedScore = Object.entries(metrics).reduce((total, [key, value]) => {
    return total + (value * WEIGHTS[key]);
  }, 0);

  const breakdown = Object.entries(metrics).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    score: Math.round(value * 10) / 10,
    weight: WEIGHTS[key],
    weighted: Math.round(value * WEIGHTS[key] * 10) / 10,
  }));

  return {
    score: Math.round(weightedScore * 10) / 10,
    breakdown,
    rawMetrics: {
      stars: repoData.stars,
      forks: repoData.forks,
      hasReadme: repoData.hasReadme,
      hasLicense: repoData.hasLicense,
      hasWorkflows: repoData.hasWorkflows,
      recentCommits: repoData.recentCommits,
    }
  };
}
