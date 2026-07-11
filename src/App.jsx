
import {getTopHeadlines,searchNews,} from "./services/newsApi";
import {useState,useEffect,useRef,useCallback,} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";


function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
 const [bookmarks, setBookmarks] = useState(
  JSON.parse(localStorage.getItem("bookmarks")) || []
);
const [recentlyViewed, setRecentlyViewed] = useState(
  JSON.parse(localStorage.getItem("recentlyViewed")) || []
);
const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "light"
);
  const isFirstRender = useRef(true);

const fetchNews = async () => {
  
  setError("");
     setLoading(true);
    try {
     const data = await getTopHeadlines(category);

      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
  console.error(error);
  setError("Something went wrong. Please try again.");
}
    finally {
    setLoading(false);
  }
  };

useEffect(() => {
  
  fetchNews();
}, [category]);

useEffect(() => {
  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );
}, [bookmarks]);

useEffect(() => {
  localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(recentlyViewed)
  );
}, [recentlyViewed]);



useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }

  if (searchTerm.trim() === "") {
    fetchNews();
  }
}, [searchTerm]);

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);

const handleSearch = async () => {
  setError("");
 if (searchTerm.trim() === "") {
  setSearchError("Please enter a search term.");
  return;
}
setSearchError("");

  try {
    const data = await searchNews(searchTerm);

    if (data.articles) {
      setArticles(data.articles);
    }
  }catch (error) {
  console.error(error);
  setError("Something went wrong. Please try again.");
}
};

const handleBookmark = (article) => {
  
  const alreadyBookmarked = bookmarks.some(
    (bookmark) => bookmark.url === article.url
  );

  if (alreadyBookmarked) {
    setBookmarks(
      bookmarks.filter(
        (bookmark) => bookmark.url !== article.url
      )
    );
  } else {
    const updatedBookmarks = bookmarks.filter(
  (bookmark) => bookmark.url !== article.url
);

setBookmarks([
  article,
  ...updatedBookmarks,
]);
  }
};


const addToRecentlyViewed = useCallback((article) => {
  setRecentlyViewed((prevRecentlyViewed) => {
    const updatedRecent = prevRecentlyViewed.filter(
      (item) => item.url !== article.url
    );

    return [article, ...updatedRecent].slice(0, 5);
  });
}, []);


  return (
    <div className={theme}>
    <Routes>
     <Route
  path="/"
  element={<Home
  articles={articles}
  category={category}
  setCategory={setCategory}
  searchTerm={searchTerm}
setSearchTerm={setSearchTerm}
handleSearch={handleSearch}
searchError={searchError}
loading={loading}
handleBookmark={handleBookmark}
bookmarks={bookmarks}
  recentlyViewed={recentlyViewed}
error={error}
theme={theme}
setTheme={setTheme}
/>
}
/>

   <Route
  path="/article/:id"
  element={<ArticleDetails 
  addToRecentlyViewed={addToRecentlyViewed}
  setTheme={setTheme}
   />
  }
/>
    </Routes>
    </div>
  );
}

export default App;