import 'bootswatch/dist/minty/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      if (res.data?.length) toast.success('Saved images downloaded');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${query}`);
      console.log(res);
      if (res.data?.errors?.length) {
        throw new Error(res.data.errors[0]);
      }
      setImages([{ ...res.data, title: query }, ...images]);

      toast.info(`New image "${query.toUpperCase()}" was found`);
    } catch (error) {
      toast.error(error.message);
    }

    setQuery('');
  };

  const handleDeleteImage = async (id, isSaved) => {
    try {
      if (isSaved) {
        const res = await axios.delete(`${API_URL}/images/${id}`);

        if (res.data?.deleted_id) {
          setImages(images.filter((images) => images.id !== id));
        }
      } else {
        setImages(images.filter((images) => images.id !== id));
      }
      const imageToDelete = images.find((image) => image.id === id);

      toast.warn(`Image "${imageToDelete.title.toUpperCase()}" was deleted`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handeSaveImage = async (id) => {
    const imageToSave = images.find((image) => image.id === id);
    imageToSave.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToSave);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
      }
      toast.info(`Image "${imageToSave.title?.toUpperCase()}" was saved`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handeSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" transition={Flip} />
    </div>
  );
}

export default App;
