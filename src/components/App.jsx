import { useEffect, useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonModal from './Loader/ButtonModal';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    fetchData(searchName, page);
  }, [searchName, page]);

  const fetchData = async (searchName, page) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://pixabay.com/api/?q=${searchName}&page=${page}&key=39437968-8994b31ccac94168d8d24ad3e&image_type=photo&orientation=horizontal&per_page=12`
      ).then(resp => resp.json());

      if (!response.hits.length) {
        throw new Error(`There are no images for ${searchName}`);
      }

      setImages(prevImages => [...prevImages, ...response.hits]);
      setTotalHits(response.totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSearchName = query => {
    const normalizedName = query.trim().toLowerCase();

    if (!normalizedName) {
      alert('Please enter something into the search field!');
      return;
    }
    if (searchName === normalizedName) {
      alert(`You are already searching for ${normalizedName}`);
      return;
    }

    setSearchName(normalizedName);
    setImages([]);
    setError(null);
    setPage(1);
    setTotalHits(null);
  };

  const loadMore = () => {
    const pageIncrement = page + 1;
    setPage(pageIncrement);
  };

  const onImageClick = imageId => {
    setImageId(imageId);
  };

  const handleCloseModal = () => {
    setImageId(null);
  };

  let image = null;
  if (imageId) {
    image = images.find(({ id }) => id === imageId);
  }

  return (
    <>
      <Searchbar onSubmit={getSearchName} />
      {isLoading && <ButtonModal />}
      {images.length !== 0 && (
        <>
          <ImageGallery images={images} onImageClick={onImageClick} />
          {page * 12 < totalHits && <Button onClick={loadMore} />}
        </>
      )}
      {error !== null && `${error}`}
      {imageId && <Modal image={image} handleCloseModal={handleCloseModal} />}
    </>
  );
};
