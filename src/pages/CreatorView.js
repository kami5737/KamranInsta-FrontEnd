import React, { useState, useEffect } from 'react';
import UploadForm from '../components/UploadForm';
import VideoCard from '../components/VideoCard';
import { getMedia, uploadMedia } from '../api';
// import { API_URL } from '../config'; // Import from config.js
// import axios from 'axios'; // Import axios


function CreatorView({ apiUrl }) {
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

  // const handleDelete = async (mediaId) => {
  //   try {
  //     await axios.delete(`${API_URL}/media/${mediaId}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });
  //     // Update state to remove the deleted media
  //     setMediaList(mediaList.filter(media => media._id !== mediaId));
  //   } catch (error) {
  //     console.error('Delete error:', error);
  //   }
  // };

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
          <VideoCard 
          key={media._id} 
          media={media}
          // onDelete={handleDelete}
          // isCreator={true} // Or use your actual role check
          
          />
        ))}
      </div>
    </div>
  );
}

export default CreatorView;