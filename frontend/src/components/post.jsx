import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [uploadDate, setUploadDate] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);
    formData.append('uploadDate', uploadDate);

    try {
      await axios.post('http://localhost:5005/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Post uploaded successfully');
      setImage(null);
      setText('');
      setUploadDate('');
    } catch (error) {
      console.error('Error uploading post:', error);
      alert('An error occurred while uploading the post');
    }
  };

  return (
    <div>
      <h1>Upload Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postImage">Image:</label>
          <input type="file" id="postImage" accept="image/*" onChange={handleImageChange} required />
        </div>
        <div>
          <label htmlFor="postText">Text:</label>
          <textarea id="postText" value={text} onChange={(e) => setText(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="uploadDate">Upload Date:</label>
          <input type="date" id="uploadDate" value={uploadDate} onChange={(e) => setUploadDate(e.target.value)} required />
        </div>
        <button type="submit">Upload Post</button>
      </form>
    </div>
  );
};

export default PostForm;
