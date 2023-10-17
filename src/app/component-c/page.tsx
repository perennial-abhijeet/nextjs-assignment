"use client";
import React, { useState } from "react";
import "./ComponentC.css";

const ComponentC: React.FC = () => {
  const [image, setImage] = useState("");

  const handleImageChange = (e: any) => {
    const imageData = e.target.files[0];
    const base64ImgData = URL.createObjectURL(imageData);
    setImage(base64ImgData);
  };

  return (
    <div className="flex flex-col w-3/4 m-auto p-10">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
        className="mb-10"
      />
      <img
        src={image}
        alt="selected image"
        className={image && "selected-image"}
      />
    </div>
  );
};

export default ComponentC;
