import { Link } from "react-router-dom";
import { FiBookmark } from "react-icons/fi";

function NewsCard({ article, handleBookmark, bookmarks }) {
  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark.url === article.url
  );

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const fallbackImage =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='36' fill='%236b7280'%3ENews App%3C/text%3E%3C/svg%3E";

  const handleImageError = (event) => {
    event.currentTarget.src = fallbackImage;
  };

  return (
    <article className="news-card">
      <Link
        to={`/article/${article.id}`}
        state={{ article }}
        className="news-image-link"
      >
        <div className="news-card-image-wrap">
          <img
            src={article.image || fallbackImage}
            alt={article.title}
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      </Link>

      <div className="news-card-content">
        <div className="news-card-top">
          <div className="news-card-meta">
            <span className="news-card-source">
              {article.source?.name || "News"}
            </span>

            <span className="news-card-date">
              {formattedDate}
            </span>
          </div>

          <h2 className="news-card-title">
            <Link
              to={`/article/${article.id}`}
              state={{ article }}
              className="news-title-link"
            >
              {article.title}
            </Link>
          </h2>

          <p className="news-card-description">
            {article.description ||
              "Read the full story for more details."}
          </p>
        </div>

        <div className="news-card-actions">
          <Link
            className="read-more-link"
            to={`/article/${article.id}`}
            state={{ article }}
          >
            Read More
          </Link>

          <button
            type="button"
            className={`bookmark-btn ${
              isBookmarked ? "is-active" : ""
            }`}
            onClick={() => handleBookmark(article)}
            aria-label={
              isBookmarked
                ? "Remove bookmark"
                : "Save article"
            }
          >
            <FiBookmark />
          </button>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;