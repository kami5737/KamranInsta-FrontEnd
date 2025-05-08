import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { getMedia } from '../api';

function ConsumerView() {
  const [mediaList, setMediaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredMedia = mediaList.filter(media => 
    media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    media.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
    media.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    media.people.some(person => 
      person.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="You can search here..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "200px", 
            float: "left",  
            backgroundColor: "yellow"
            // marginBottom: "2rem", 
          }}
        />
      </div>
      <div className="media-feed">
        {filteredMedia.map((media, index) => (
          <VideoCard key={index} media={media} />
        ))}
      </div>
    </div>
  );
}

export default ConsumerView;