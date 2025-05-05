import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { uploadMedia } from '../api';

function UploadForm({ onUpload }) {
  const [mediaData, setMediaData] = useState({
    title: '',
    caption: '',
    location: '',
    people: '',
    media: null,
    type: 'image',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media' && files.length > 0) {
      const file = files[0];
      const type = file.type.startsWith('video') ? 'video' : 'image';
      setMediaData({ ...mediaData, media: file, type });
    } else {
      setMediaData({ ...mediaData, [name]: value });
    }
  };
  
  // Add async here to use await
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', mediaData.title);
    formData.append('caption', mediaData.caption);
    formData.append('location', mediaData.location);
    formData.append('people', mediaData.people);
    formData.append('media', mediaData.media);
    
    try {
      await onUpload(formData);
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
      // You might want to add user feedback here, like:
      // alert('Upload failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="upload-box p-4 rounded">
        <h2 className="form-heading mb-4 text-center">Upload Media</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              className="form-input"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Caption"
              name="caption"
              onChange={handleChange}
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="People (comma separated)"
              name="people"
              onChange={handleChange}
              className="form-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              name="media"
              onChange={handleChange}
              accept="image/*,video/*"
              className="form-input"
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="danger" type="submit" className="rounded-pill px-4">
              Upload
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default UploadForm;