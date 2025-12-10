export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}
export async function getGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    "https://api.github.com/users/adarshanand67/repos?sort=updated&per_page=100",
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    console.error("Failed to fetch GitHub repos");
    return [];
  }
  const repos: GithubRepo[] = await res.json();
  return repos
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 6);
}
