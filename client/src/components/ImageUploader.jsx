import { useState } from "react";
import API from "../axiosConfig";

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const res = await API.post("/upload", formData);
      onUpload(res.data.imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" width="200" />}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}

export default ImageUploader;
