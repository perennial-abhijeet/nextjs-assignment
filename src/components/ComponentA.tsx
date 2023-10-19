import React from "react";

interface ComponentAProps {
  selectedImage: string | null;
}

const ComponentA: React.FC<ComponentAProps> = ({ selectedImage }) => {
  return (
    <div className="flex justify-center m-20">
      {selectedImage && (
        <img src={selectedImage} alt="Selected Image" className="w-80" />
      )}
    </div>
  );
};

export default ComponentA;
