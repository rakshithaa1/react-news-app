import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

function RecentlyViewed({ recentlyViewed }) {
  return (
    <>
      <h2>
        <FiClock style={{ marginRight: "8px", verticalAlign: "middle" }} />
        Recently Viewed
      </h2>

      {recentlyViewed.length === 0 ? (
        <div className="empty-panel" role="status">
          <FiClock />
          <p>No recently viewed articles yet.</p>
        </div>
      ) : (
        <div className="sidebar-list">
          {recentlyViewed.map((article) => (
            <div key={article.url} className="sidebar-item">
              <Link to={`/article/${article.id}`} state={{ article }}>
                {article.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default RecentlyViewed;