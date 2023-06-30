import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

const ImageCard = ({ image, deleteImage, saveImage }) => {
  const authorPortfolioUrl = image.user?.portfolio_url;
  const authorName = image.user?.name || 'No author name';

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button
          variant="secondary"
          onClick={() => deleteImage(image.id, image.saved)}
        >
          Delete
        </Button>
        {'   '}
        {!image.saved && (
          <Button variant="primary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link
              className="text-center"
              disabled={!authorPortfolioUrl}
              href={authorPortfolioUrl}
              target="_blank"
            >
              {authorName}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
