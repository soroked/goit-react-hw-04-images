import { useEffect } from 'react';

const Modal = ({ image, handleCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeModal);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  function closeModal(e) {
    if (e.target.className === 'Overlay') {
      handleCloseModal();
      return;
    }

    if (e.code === 'Escape') {
      handleCloseModal();
      return;
    }
  }

  const { largeImageURL, tags } = image;

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
