import { useState, useEffect } from 'react';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import styles from './styles.module.css';

const APIKEY = '27281986-59f4397e165b177c7084776c9';

function App() {
  const [name, SetName] = useState('');
  const [images, SetImages] = useState([]);
  const [page, SetPage] = useState(1);
  const [loading, SetLoading] = useState(false);
  const [showModal, SetShowModal] = useState(false);
  const [modalImage, SetModalImage] = useState('');
  const [totalImages, SetTotalImages] = useState('');
  const [tag, SetTag] = useState('');
  const [showBtn, SetShowBtn] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }
    SetLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(image => {
        if (!image.total) {
          SetLoading(false);
          SetShowBtn(false);
          return alert('К сожалению по Вашему запросу ничего не найдено');
        }

        SetImages(prevState => [...prevState, ...image.hits]);
        SetTotalImages(image.total);
        SetLoading(false);
        SetShowBtn(true);
      })
      .catch(error => error);
  }, [name, page]);

  const handleSubmit = inputName => {
    if (name === inputName) {
      return alert(`Вы уже просматриваете ${inputName}`);
    }
    SetName(inputName.toLowerCase());
    SetImages([]);
    SetPage(1);
  };

  const onLoadMoreClick = () => {
    SetPage(prevState => prevState + 1);
  };

  const openModal = (url, tag) => {
    SetModalImage(url);
    SetShowModal(true);
    SetTag(tag);
  };

  const modalClose = () => {
    SetShowModal(false);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {!loading && images.length !== totalImages && showBtn && (
        <Button onLoadMoreClick={onLoadMoreClick} />
      )}

      {showModal && (
        <Modal image={modalImage} tag={tag} onModalClose={modalClose} />
      )}
    </div>
  );
}

export default App;
