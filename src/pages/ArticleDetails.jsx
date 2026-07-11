import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

function ArticleDetails({ addToRecentlyViewed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state?.article;

  useEffect(() => {
    if (article) {
      addToRecentlyViewed(article);
    }
  }, [article, addToRecentlyViewed]);

  if (!article) {
    return (
      <div className="article-page article-page-empty">
        <h2>Article not found.</h2>
        <button className="article-back-btn" onClick={() => navigate("/")}>
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  const fallbackImage =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='36' fill='%236b7280'%3ENews App%3C/text%3E%3C/svg%3E";

  return (
    <div className="article-page">
      <button className="article-back-btn" onClick={() => navigate("/")}>
        <FiArrowLeft /> Back
      </button>

      <article className="article-card">
        <div className="article-image-wrap">
          <img
            src={article.image || fallbackImage}
            alt={article.title}
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
            }}
          />
        </div>

        <div className="article-content">
          <div className="article-meta">
            {article.source && article.source.name ? (
              <span className="article-source">{article.source.name}</span>
            ) : null}
            {article.publishedAt ? (
              <span className="article-date">
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : null}
          </div>

          <h1 className="article-title">{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <p className="article-body">{article.content}</p>

          <div className="article-actions">
            <a className="article-link-btn" href={article.url} target="_blank" rel="noreferrer">
              Read Original Article <FiExternalLink />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ArticleDetails;