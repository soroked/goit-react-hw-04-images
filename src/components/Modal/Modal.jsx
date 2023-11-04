import { useCallback, useEffect } from 'react';

const Modal = ({ image, handleCloseModal }) => {
  const closeModal = useCallback(
    e => {
      if (e.target.className === 'Overlay') {
        handleCloseModal();
        return;
      }

      if (e.code === 'Escape') {
        handleCloseModal();
        return;
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeModal);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

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
