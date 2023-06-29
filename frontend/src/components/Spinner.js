import React from 'react';
import { Container } from 'react-bootstrap';
import Loader from 'react-bootstrap/Spinner';

const Spinner = () => {
  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Loader animation="border" variant="primary" />
    </Container>
  );
};

export default Spinner;
