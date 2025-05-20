import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import ImageUploader from "../components/ImageUploader"; // adjust path if needed
import "./EditPost.css";

function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (url) => {
    setForm({ ...form, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/posts/${id}`, form);
    navigate(`/post/${id}`);
  };

  return (
    <form className="edit-post-form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />

      {form.image && (
        <div className="image-preview">
          <label>Current Image:</label>
          <img src={form.image} alt="Current Post" />
        </div>
      )}

      <div className="image-uploader">
        <label>Update Image:</label>
        <ImageUploader onUpload={handleImageUpload} />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}

export default EditPost;
