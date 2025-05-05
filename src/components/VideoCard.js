import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { postComment, addRating, getComments } from '../api';

const VideoCard = ({ media, onDelete }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(media.averageRating || 0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(media._id);
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [media._id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setError(null);
    try {
      const response = await postComment(media._id, comment);
      setComments([...comments, response.data]);
      setComment('');
      setSuccess('Comment posted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post comment');
    }
  };


  const handleRatingSubmit = async () => {
    try {
      const response = await addRating(media._id, rating);
      setAverageRating(response.data.averageRating);
      setSuccess('Rating submitted!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit rating');
    }
  };

  const renderMedia = () => {
    if (!media?.mediaUrl) return <p>No media available</p>;
    const mediaUrl = media.mediaUrl.startsWith('http') 
      ? media.mediaUrl 
      : `http://localhost:5000${media.mediaUrl}`;

    if (media.mediaType === 'video') {
      return (
        <div className="video-wrapper">
          <video 
            controls 
            style={{ width: '100%', borderRadius: '0' }} // Rectangular
          >
            <source src={mediaUrl} type={`video/${mediaUrl.split('.').pop()}`} />
          </video>
        </div>
      );
    } else {
      return (
        <img
          src={mediaUrl}
          alt={media.title || 'uploaded media'}
          style={{ width: '100%', borderRadius: '0' }} // Rectangular
        />
      );
    }
  };

  return (
    <Card className="video-card" style={{ marginBottom: '1rem' }}>
      {onDelete && (
        <button
          onClick={onDelete}
          className="delete-btn"
          aria-label="Delete post"
        >
          ×
        </button>
      )}

      <div className="media-container">{renderMedia()}</div>
      <Card.Body>
        <Card.Title>{media.title || 'Untitled Post'}</Card.Title>
        <Card.Text>{media.caption}</Card.Text>
        <Card.Text>
          <small>Location: {media.location || 'Not specified'}</small>
        </Card.Text>
        <Card.Text>
          <small>People: {media.people?.join(', ') || 'Not specified'}</small>
        </Card.Text>

        {error && <Alert variant="danger" dismissible>{error}</Alert>}
        {success && <Alert variant="success" dismissible>{success}</Alert>}

        {/* Comments Section (Now First) */}
        <div className="comments-section">
          <h6>Comments</h6>
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            <ListGroup>
              {comments.map((c, i) => (
                <ListGroup.Item key={i} style={{ borderRadius: '0' }}> {/* Rectangular */}
                  <strong>{c.userId?.username || 'Anonymous'}: </strong>
                  {c.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Form onSubmit={handleCommentSubmit}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ borderRadius: '0' }} // Rectangular
            />
            <Button 
              variant="primary" 
              type="submit" 
              className="mt-2"
            >
              Post Comment
            </Button>
          </Form>
        </div>

        {/* Rating Section (Now Second) */}
        <div className="rating-section">
        <div className="stars mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{ 
                  cursor: 'pointer', 
                  color: star <= (hoverRating || rating) ? 'gold' : 'gray',
                  fontSize: '1.8rem',
                  marginRight: '5px'
                }}
              >
                ⭐
              </span>
            ))}
          </div>
          <Button 
            variant="outline-primary" 
            onClick={handleRatingSubmit}
            className="mt-2"
          >
            Submit Rating
          </Button>
          <div className="mt-2">Average: {averageRating.toFixed(1)}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;