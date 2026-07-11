import { Link } from "react-router-dom";
import { FiBookmark, FiX } from "react-icons/fi";

function Bookmarks({ bookmarks, handleBookmark }) {
  return (
    <>
      <h2>
        <FiBookmark style={{ marginRight: "8px", verticalAlign: "middle" }} />
        Bookmarks
      </h2>

      {bookmarks.length === 0 ? (
        <div className="empty-panel" role="status">
          <FiBookmark />
          <p>No bookmarks yet. Save articles to read later.</p>
        </div>
      ) : (
        <div className="sidebar-list">
          {bookmarks.map((article) => (
            <div key={article.url} className="sidebar-item bookmark-item">
              <Link
                to={`/article/${article.id}`}
                state={{ article }}
                className="bookmark-link"
              >
                {article.title}
              </Link>

              <button
                type="button"
                onClick={() => handleBookmark(article)}
                aria-label={`Remove ${article.title} from bookmarks`}
                title="Remove bookmark"
                className="bookmark-remove-btn"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Bookmarks;