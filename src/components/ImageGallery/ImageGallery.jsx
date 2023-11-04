import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} onImageClick={onImageClick} />
    </ul>
  );
}
