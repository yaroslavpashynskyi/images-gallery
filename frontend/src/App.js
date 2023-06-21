import 'bootswatch/dist/minty/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API;

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${query}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages([{ ...data, title: query }, ...images]);
      })
      .catch((error) => console.log(error));

    setQuery('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((images) => images.id !== id));
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSearchSubmit}
      />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            <Col className="pb-3" key={i}>
              <ImageCard image={image} deleteImage={handleDeleteImage} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
