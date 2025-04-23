import { useEffect, useState } from "react";
import PhotoAlbum from 'react-photo-album';

const Gallary = ({ images }) => {
    const [loadedImages, setLoadedImages] = useState([]);

    useEffect(() => {
      const loadImageDimensions = async () => {
        const imagePromises = images?.map(async (imageSrc) => {
          const img = new Image();
          img.src = imageSrc;
          await img.decode(); // Wait for the image to load
  
          return {
            src: imageSrc,
            width: img.width,
            height: img.height,
          };
        });
  
        const loadedImagesData = await Promise.all(imagePromises);
        setLoadedImages(loadedImagesData);
      };
  
      loadImageDimensions();
    }, [images]);


    return <PhotoAlbum layout="rows" photos={loadedImages} />;
};

export default Gallary;