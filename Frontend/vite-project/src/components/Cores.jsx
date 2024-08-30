import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Core = () => {
  const [cardsData, setCardsData] = useState([]);
  const apiUrl = 'http://127.0.0.1:5000/core';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Fetched data:', response.data);
  
        if (response.status === 200 && Array.isArray(response.data)) {
          setCardsData(response.data);
        } else {
          console.error('Unexpected data format or status code:', response.status, response.data);
          setCardsData([]); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCardsData([]); 
      }
    };
  
    fetchData();
  }, [apiUrl]);
  return (
    <Container>
      <Row>
        {cardsData.length > 0 ? (
          cardsData.slice(0, 20).map((card, index) => (
            <Col 
              key={index} 
              xs={12} sm={6} md={4} lg={3} 
              className={`mb-4 ${(index % 4 === 0 || index % 5 === 0) ? 'col-lg-4' : ''}`} 
            >
              <Link to={`/core/${card.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card className="rounded shadow-sm" style={{ height: '100%' }}>
                  <Card.Img 
                    variant="top" 
                    src={card.imageUrl} 
                    alt={card.description} 
                    style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }} 
                  />
                  <Card.Body>
                    <Card.Text>{card.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </Row>
    </Container>
  );
};

export default Core;
