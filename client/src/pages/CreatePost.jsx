import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import ImageUploader from "../components/ImageUploader";
import "./CreatePost.css";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (url) => {
    console.log("Uploaded image URL:", url);
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/posts", { ...form, image: imageUrl });
    navigate("/");
  };

  return (
    <form className="edit-post-form" onSubmit={handleSubmit}>
      {/* Back to Home button */}
      <button
        type="button"
        className="back-home-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      />

      <ImageUploader onUpload={handleImageUpload} />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          width="200"
          className="image-preview"
        />
      )}

      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
