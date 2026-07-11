const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

export async function searchNews(searchTerm) {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&apikey=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

export async function getTopHeadlines(category) {
  
  const response = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${API_KEY}`
  );

  const data = await response.json();

  return data;
}
