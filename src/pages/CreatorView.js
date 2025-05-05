import React, { useState, useEffect } from 'react';
import UploadForm from '../components/UploadForm';
import VideoCard from '../components/VideoCard';
import { getMedia, uploadMedia } from '../api';

function CreatorView() {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await getMedia();
        setMediaList(response.data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    fetchMedia();
  }, []);

  const handleUpload = async (formData) => {
    try {
      const response = await uploadMedia(formData);
      setMediaList([response.data, ...mediaList]);
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <UploadForm onUpload={handleUpload} />
      <div className="media-feed">
        {mediaList.map((media, index) => (
          <VideoCard key={index} media={media} />
        ))}
      </div>
    </div>
  );
}

export default CreatorView;