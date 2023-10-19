"use client";
import React, { useState } from "react";
import ComponentA from "@/components/ComponentA";
import ComponentB from "@/components/ComponentB";

const ImageList: React.FC = () => {
  const [images] = useState([
    "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
    "https://img.favpng.com/14/0/3/standard-test-image-acceptance-testing-png-favpng-Yy97FH3TSHfV906y3fKtRFFzL.jpg",
    "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361513_1280.jpg",
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <ComponentA selectedImage={selectedImage} />
      <ComponentB images={images} onImageSelect={handleImageSelect} />
    </div>
  );
};

export default ImageList;
