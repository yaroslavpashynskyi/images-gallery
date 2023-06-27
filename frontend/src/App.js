import 'bootswatch/dist/minty/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`${API_URL}/new-image?query=${query}`);
      setImages([{ ...result.data, title: query }, ...images]);
    } catch (error) {
      console.log(error);
    }

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
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col className="pb-3" key={i}>
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
