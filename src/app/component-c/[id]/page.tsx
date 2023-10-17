"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageOne from "../../../assets/images/board-361516_1280.webp";
import ImageTwo from "../../../assets/images/images.jpeg";
import ImageThree from "../../../assets/images/test-word-made-wood-background-260nw-1779376307.webp";

interface propsInterface {
  params: any;
}

const SingleImage: React.FC<propsInterface> = ({ params }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    switch (params.id) {
      case "image-1":
        setImage(ImageOne);
        break;
      case "image-2":
        setImage(ImageTwo);
        break;
      case "image-3":
        setImage(ImageThree);
        break;
    }
  }, []);

  return (
    <div>
      {image && (
        <Image src={image} alt="selected image" width={1000} height={1000} />
      )}
    </div>
  );
};

export default SingleImage;
