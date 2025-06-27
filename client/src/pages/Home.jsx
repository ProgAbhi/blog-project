import { useEffect, useState } from "react";
import API from "../axiosConfig";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const getPreview = (content) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };

  return (
    <div className="home">
      <h1 className="home-title">Blog Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <Link to={`/post/${post._id}`} className="post-link">
              <h2 className="post-title">{post.title}</h2>
            </Link>

            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="post-image"
              />
            )}

            <p className="post-content-preview">{getPreview(post.content)}</p>

            <Link to={`/post/${post._id}`} className="read-more-link">
              Read More...
            </Link>

            <p className="post-author">By {post.author.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
