import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Core = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/core'; // Backend API endpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setCardsData(response.data);
        } else {
          console.error('Unexpected data format or status code:', response.status, response.data);
          setError('Unexpected data format or server issue.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <Container fluid className="p-0">
      <Row className="overflow-x-auto" style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
        <div className="flex flex-wrap">
          {loading ? (
            <Col xs={12} className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          ) : error ? (
            <Col xs={12}>
              <Alert variant="danger" className="text-center">{error}</Alert>
            </Col>
          ) : cardsData.length > 0 ? (
            cardsData.map((card, index) => (
              <div
                key={index}
                className="flex-none w-1/6 p-2" // 6 items per row (100% / 6 = 16.66%)
                style={{ flexBasis: '16.66%' }} // Fixed width for each card
              >
                <Link to={`/core/${card.id}`} className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="shadow-lg overflow-hidden rounded-lg transition-transform transform hover:scale-105">
                    <img
                      src={card.media_url || 'https://via.placeholder.com/300x200?text=No+Image+Available'}
                      alt={card.title || 'Untitled'}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-semibold truncate">{card.title || 'Untitled'}</h3>
                      <p className="text-gray-600 text-sm">{card.description || 'No description available'}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <Col xs={12}>
              <Alert variant="info" className="text-center">No cards available</Alert>
            </Col>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Core;
