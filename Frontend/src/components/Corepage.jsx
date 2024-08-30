// src/components/CorePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/';

const CorePage = () => {
  const { id } = useParams();
  const [core, setCore] = useState(null);
  const [isLiked, setIsLiked] = useState(false);  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCore = async () => {
      try {
        const response = await axios.get(`${apiUrl}/core/${id}`);
        setCore(response.data);
        setComments(response.data.comments || []);
        setIsLiked(response.data.isLiked || false);
        setIsSaved(response.data.isSaved || false);
      } catch (error) {
        setError('Error fetching core data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCore();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`${apiUrl}/core/${id}/likes`);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking core:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${apiUrl}/core/${id}/saves`);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving core:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent posting empty comments
    try {
      const response = await axios.get(`${apiUrl}/core/${id}/comments`, { text: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      setError('Error posting comment. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {core ? (
        <Row>
          <Col md={8}>
            <Card className="rounded shadow-sm">
              <Card.Img variant="top" src={core.media_url} />
              <Card.Body>
                <Card.Title>{core.title}</Card.Title>
                <Card.Text>{core.description}</Card.Text>
                {core.hashtag && <Card.Text className="text-muted">#{core.hashtag}</Card.Text>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Button 
              variant={isLiked ? "danger" : "outline-danger"} 
              onClick={handleLike}
              className="mb-2"
            >
              ♥ {isLiked ? 'Liked' : 'Like'}
            </Button>
            <Button 
              variant={isSaved ? "success" : "outline-success"} 
              onClick={handleSave}
              className="mb-2"
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Form onSubmit={handleCommentSubmit} className="mt-4">
              <Form.Group controlId="comment">
                <Form.Label>Leave a Comment</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)} 
                  placeholder="Write a comment..."
                />
              </Form.Group>
              <Button type="submit" variant="primary">Post Comment</Button>
            </Form>
            <div className="mt-4">
              <h5>Comments</h5>
              {comments.length ? (
                comments.map((comment, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>{comment.text}</Card.Body>
                  </Card>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <p>No core data available.</p>
      )}
    </Container>
  );
};

export default CorePage;
