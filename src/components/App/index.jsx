import { useState, useEffect } from 'react';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import styles from './styles.module.css';

const APIKEY = '27281986-59f4397e165b177c7084776c9';

function App() {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [totalImages, setTotalImages] = useState('');
  const [tag, setTag] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(image => {
        if (!image.total) {
          setLoading(false);
          setShowBtn(false);
          return alert('К сожалению по Вашему запросу ничего не найдено');
        }

        setImages(prevState => [...prevState, ...image.hits]);
        setTotalImages(image.total);
        setLoading(false);
        setShowBtn(true);
      })
      .catch(error => error);
  }, [name, page]);

  const handleSubmit = inputName => {
    if (name === inputName) {
      return alert(`Вы уже просматриваете ${inputName}`);
    }
    setName(inputName.toLowerCase());
    setImages([]);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (url, tag) => {
    setModalImage(url);
    setShowModal(true);
    setTag(tag);
  };

  const modalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && (
        <Modal image={modalImage} tag={tag} onModalClose={modalClose} />
      )}
      {!loading && images.length !== totalImages && showBtn && (
        <Button onLoadMoreClick={onLoadMoreClick} />
      )}
    </div>
  );
}

export default App;
