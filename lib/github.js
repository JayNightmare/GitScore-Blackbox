/**
 * GitHub GraphQL API client
 * Handles fetching repository data using GitHub's GraphQL API via @octokit/graphql
 */

import { graphql } from '@octokit/graphql';

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

const repoQuery = `
  query getRepoData($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      name
      description
      stargazerCount
      forkCount
      createdAt
      updatedAt
      hasReadme: object(expression: "HEAD:README.md") { id }
      hasLicense: licenseInfo { id }
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 10) {
              nodes {
                committedDate
              }
            }
          }
        }
      }
      workflows: object(expression: "HEAD:.github/workflows") {
        ... on Tree {
          entries {
            name
          }
        }
      }
    }
  }
`;

export async function fetchRepoData(owner, repo) {
  try {
    const { repository } = await graphqlWithAuth(repoQuery, {
      owner,
      repo,
    });

    return {
      name: repository.name,
      description: repository.description,
      stars: repository.stargazerCount,
      forks: repository.forkCount,
      hasReadme: Boolean(repository.hasReadme),
      hasLicense: Boolean(repository.hasLicense),
      hasWorkflows: Boolean(repository.workflows?.entries?.length),
      recentCommits: repository.defaultBranchRef.target.history.nodes.length,
      lastUpdated: repository.updatedAt,
      createdAt: repository.createdAt,
    };
  } catch (error) {
    console.error('Error fetching repository data:', error);
    throw new Error('Failed to fetch repository data');
  }
}

export async function isValidRepo(owner, repo) {
  try {
    await graphqlWithAuth(`
      query checkRepo($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          id
        }
      }
    `, {
      owner,
      repo,
    });
    return true;
  } catch {
    return false;
  }
}
