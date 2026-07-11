
import NewsCard from "../components/NewsCard";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecentlyViewed from "../components/RecentlyViewed";
import Bookmarks from "../components/Bookmarks";
import { FiMoon, FiSun } from "react-icons/fi";

function Home({articles, category,setCategory,searchTerm, setSearchTerm,handleSearch,searchError,loading,handleBookmark,bookmarks,recentlyViewed,error,theme,
setTheme,}) {

  const categories = [
  "general",
  "technology",
  "business",
  "sports",
  "health",
  "entertainment",
  "science",
];

if (loading) {
  return <Loading />;
}

  return (
    <div className="app-shell">
      <header className="app-header">
  <div>
    <p className="eyebrow">Live updates</p>

    <div className="header-title-row">
      <h1>News App</h1>

      <button
        className="theme-toggle"
        onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
      >
{theme === "light" ? <FiMoon /> : <FiSun />}    
  </button>
    </div>

    <p className="header-subtitle">
      Browse breaking stories, search instantly, and keep your favorite reads close at hand.
    </p>
  </div>
</header>

      <div className="content-layout">
        <main className="feed-column">
          <section className="toolbar-card">
            <div className="filter-section">
              <CategoryFilter
                categories={categories}
                category={category}
                setCategory={setCategory}
              />
            </div>

            <div className="search-section">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
              />
            </div>
          </section>

          {searchError && <p className="status-message status-error">{searchError}</p>}
          {error && <p className="status-message status-error">{error}</p>}

          <div className="results-meta">
            <p>Total Articles: {articles.length}</p>
          </div>

          {articles.length > 0 ? (
            <div className="news-list">
              {articles.map((article, index) => (
                <NewsCard
                  key={article.url}
                  article={article}
                  index={index}
                  handleBookmark={handleBookmark}
                  bookmarks={bookmarks}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>
                {searchTerm.trim() !== ""
                  ? "No search results found."
                  : "No articles available."}
              </p>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <section className="sidebar-card">
            <RecentlyViewed recentlyViewed={recentlyViewed} />
          </section>

          <section className="sidebar-card">
            <Bookmarks bookmarks={bookmarks} handleBookmark={handleBookmark} />
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Home;