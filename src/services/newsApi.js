export async function searchNews(searchTerm) {
  const response = await fetch(
    `/api/news?search=${encodeURIComponent(searchTerm)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return await response.json();
}

export async function getTopHeadlines(category) {
  const response = await fetch(
    `/api/news?category=${category}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return await response.json();
}