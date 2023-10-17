import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImageOne from "../../assets/images/board-361516_1280.webp";
import ImageTwo from "../../assets/images/images.jpeg";
import ImageThree from "../../assets/images/test-word-made-wood-background-260nw-1779376307.webp";

const ComponentD: React.FC = () => {
  console.log(ImageOne.src);
  return (
    <div className="flex p-20">
      <Link href={`/component-c/image-1`}>
        <Image
          className="mr-10"
          src={ImageOne}
          alt="image 1"
          width={200}
          height={200}
        />
      </Link>
      <Link href={`/component-c/image-2`}>
        <Image
          className="mr-10"
          src={ImageTwo}
          alt="image 2"
          width={200}
          height={200}
        />
      </Link>
      <Link href={`/component-c/image-3`}>
        <Image
          className="mb-10"
          src={ImageThree}
          alt="image 3"
          width={200}
          height={200}
        />
      </Link>
    </div>
  );
};

export default ComponentD;
