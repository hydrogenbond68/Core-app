import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '/home/joey/development/code/phase-5/final/project/CORE-11-FRONTEND/vite-project/src/components/hashtags.css'; // Import custom styles

const HashtagsSection = () => {
  const [hashtags, setHashtags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHashtags();
  }, []);

  const fetchHashtags = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/hashtags'); 
      if (response.ok) {
        const data = await response.json();
        setHashtags(data);
      } else {
        console.error('Failed to fetch hashtags:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch hashtags:', error);
    }
  };

  const handleHashtagClick = (tag) => {
    navigate(`/hashtag/${tag}`);
  };

  const handlePrev = () => {
    setCurrentIndex(Math.max(currentIndex - 10, 0));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 10, hashtags.length - 10));
  };

  return (
    <Container className="hashtags-section">
      <Row className="align-items-center">
        <Col xs="auto">
          <Button variant="outline-primary" onClick={handlePrev} disabled={currentIndex === 0}>
            &lt;
          </Button>
        </Col>
        <Col>
          <div className="hashtags-container">
            {hashtags.slice(currentIndex, currentIndex + 10).map((hashtag) => (
              <Card key={hashtag.id} onClick={() => handleHashtagClick(hashtag.tag)} className="hashtag-card">
                <Card.Img variant="top" src={hashtag.imageUrl} alt={hashtag.tag} />
                <Card.Body>
                  <Card.Title>{hashtag.tag}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={handleNext} disabled={currentIndex + 10 >= hashtags.length}>
            &gt;
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HashtagsSection;
