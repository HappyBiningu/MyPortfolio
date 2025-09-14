import { Octokit } from '@octokit/rest'

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

// GitHub API service functions
export async function getGitHubProfile(username: string = 'HappyBiningu') {
  try {
    const octokit = await getUncachableGitHubClient();
    const response = await octokit.rest.users.getByUsername({
      username
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw error;
  }
}

export async function getGitHubRepos(username: string = 'HappyBiningu', limit: number = 10) {
  try {
    const octokit = await getUncachableGitHubClient();
    const response = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      direction: 'desc',
      per_page: limit
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
}

export async function getGitHubActivity(username: string = 'HappyBiningu') {
  try {
    const octokit = await getUncachableGitHubClient();
    const response = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 30
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    throw error;
  }
}

export async function getGitHubStats(username: string = 'HappyBiningu') {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get user profile
    const profileResponse = await octokit.rest.users.getByUsername({
      username
    });
    
    // Get all repos to calculate stats
    const reposResponse = await octokit.rest.repos.listForUser({
      username,
      per_page: 100
    });
    
    const repos = reposResponse.data;
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
    
    // Calculate language statistics
    const languageStats: { [key: string]: number } = {};
    
    for (const repo of repos.slice(0, 20)) { // Limit to avoid rate limits
      try {
        const langResponse = await octokit.rest.repos.listLanguages({
          owner: username,
          repo: repo.name
        });
        
        Object.entries(langResponse.data).forEach(([language, bytes]) => {
          languageStats[language] = (languageStats[language] || 0) + bytes;
        });
      } catch (error) {
        // Skip if we can't get languages for this repo
        console.warn(`Could not get languages for ${repo.name}:`, error);
      }
    }
    
    // Convert to percentages
    const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
    const languages = Object.entries(languageStats)
      .map(([language, bytes]) => ({
        language,
        percentage: ((bytes / totalBytes) * 100).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
      .slice(0, 8); // Top 8 languages
    
    return {
      profile: profileResponse.data,
      stats: {
        totalStars,
        totalForks,
        totalRepos: profileResponse.data.public_repos
      },
      languages
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}