import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import "/home/joey/development/code/phase-5/final/project/CORE-11-FRONTEND/vite-project/src/components/hashtags.css"

const HashtagPage = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostsByHashtag();
  }, [tag]);

  const fetchPostsByHashtag = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:5000/hashtags`); 
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      setError('Failed to load posts. Please try again later.');
      console.error('Failed to fetch posts by hashtag:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Posts with #{tag}</h1>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={post.imageUrl} alt={post.title} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No posts available for this hashtag.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HashtagPage;