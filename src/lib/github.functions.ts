import { createServerFn } from "@tanstack/react-start";

const GITHUB_USERNAME = "podpolnik52-commits";

export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export const FALLBACK_PROFILE: GitHubProfile = {
  login: GITHUB_USERNAME,
  id: 0,
  avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
  html_url: `https://github.com/${GITHUB_USERNAME}`,
  name: null,
  company: null,
  blog: null,
  location: null,
  email: null,
  bio: null,
  twitter_username: null,
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const getGitHubProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubProfile> => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "portfolio-site",
          },
        }
      );

      if (!response.ok) {
        console.error(`GitHub API error: ${response.status}`);
        return FALLBACK_PROFILE;
      }

      return (await response.json()) as GitHubProfile;
    } catch (error) {
      console.error("GitHub API request failed:", error);
      return FALLBACK_PROFILE;
    }
  }
);
