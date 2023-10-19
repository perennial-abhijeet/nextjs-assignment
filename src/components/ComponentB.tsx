import React from "react";

interface ComponentBProps {
  images: string[];
  onImageSelect: (image: string) => void;
}

const ComponentB: React.FC<ComponentBProps> = ({ images, onImageSelect }) => {
  const handleImageClick = (image: string) => {
    onImageSelect(image);
  };

  return (
    <div className="flex w-3/4 m-auto justify-center">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          onClick={() => handleImageClick(image)}
          className="w-40 h-auto m-5"
        />
      ))}
    </div>
  );
};

export default ComponentB;
