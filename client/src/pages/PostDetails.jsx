import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import "./PostDetails.css";  // 👈 Import CSS

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    await API.delete(`/posts/${id}`);
    navigate("/");
  };

  if (!post) return <div className="loading">Loading...</div>;

  // Check if user token exists and author id matches (adjust as needed)
  const token = localStorage.getItem("token");
  const isAuthor = token && post.author._id; 

  return (
    <div className="post-details">
      {/* Back to Home button */}
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-author">By {post.author.username}</p>
   
      {/* Show image if it exists */}
      {post.image && (
        <img src={post.image} alt="Post" className="post-image" />
      )}
      <p className="post-content">{post.content}</p>

      {isAuthor && (
        <div className="post-actions">
          <Link to={`/edit/${post._id}`} className="btn edit-btn">Edit</Link>
          <button onClick={handleDelete} className="btn delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
