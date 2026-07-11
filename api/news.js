export default async function handler(req, res) {
  const { category = "general", search = "" } = req.query;

  const apiKey = process.env.GNEWS_API_KEY;

  let url;

  if (search) {
    url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      search
    )}&lang=en&apikey=${apiKey}`;
  } else {
    url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`;
  }

  try {
  const response = await fetch(url);
  const data = await response.json();

  return res.status(response.status).json(data);
} catch (error) {
  return res.status(500).json({
    message: "Failed to fetch news",
  });
}
}