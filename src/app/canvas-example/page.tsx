"use client";
import React, { useState, useRef } from "react";

const CanvasExample: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const resetZoom = () => {
    setZoomLevel(1);
    if (image) renderImage();
  };

  const renderImage = () => {
    if (!image || !canvasRef.current) return;
    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    canvasRef.current.width = image.width * zoomLevel;
    canvasRef.current.height = image.height * zoomLevel;

    canvasCtx.clearRect(
      0,
      0,
      canvasWidth * zoomLevel,
      canvasHeight * zoomLevel
    );

    canvasCtx.drawImage(
      image,
      0,
      0,
      canvasWidth * zoomLevel,
      canvasHeight * zoomLevel
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage = new Image();

      newImage.onload = () => {
        setImage(newImage);
        setCanvasWidth(newImage.width);
        setCanvasHeight(newImage.height);
        resetZoom();
        renderImage();
      };

      newImage.src = URL.createObjectURL(file);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
    renderImage();
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
    renderImage();
  };

  return (
    <div className="flex w-screen min-h-screen">
      <div className="w-1/5 bg-gray-200">
        <div className="p-4">
          <input
            type="file"
            id="imageFileInput"
            onChange={(e) => handleFileChange(e)}
            ref={fileInputRef}
          />
        </div>
        <div className="p-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-5"
            onClick={handleZoomIn}
          >
            Zoom In
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-5"
            onClick={handleZoomOut}
          >
            Zoom Out
          </button>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-5"
          onClick={resetZoom}
        >
          Reset Zoom
        </button>
      </div>
      <div className="flex-grow p-4 bg-gray-900">
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default CanvasExample;
