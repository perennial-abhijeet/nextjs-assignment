"use client";
import React, { useState, useRef } from "react";

const ComponentB: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brightnessInputRef = useRef<HTMLInputElement>(null);
  const saturationInputRef = useRef<HTMLInputElement>(null);
  const blurInputRef = useRef<HTMLInputElement>(null);
  const inversionInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState({
    brightness: "100",
    saturation: "100",
    blur: "0",
    inversion: "0",
  });

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);

  const resetSettings = () => {
    setSettings({
      brightness: "100",
      saturation: "100",
      blur: "0",
      inversion: "0",
    });
    if (brightnessInputRef.current) brightnessInputRef.current.value = "100";
    if (saturationInputRef.current) saturationInputRef.current.value = "100";
    if (blurInputRef.current) blurInputRef.current.value = "0";
    if (inversionInputRef.current) inversionInputRef.current.value = "0";
    setZoomLevel(1);
    if (image) renderImage();
  };

  const updateSetting = (key: string, value: string) => {
    if (!image) return;
    setSettings({ ...settings, [key]: value });
    renderImage();
  };

  const generateFilter = () => {
    const { brightness, saturation, blur, inversion } = settings;
    return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
  };

  const renderImage = () => {
    if (!image || !canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    canvasRef.current.width = image.width;
    canvasRef.current.height = image.height;

    canvasCtx.filter = generateFilter();
    canvasCtx.drawImage(
      image,
      0,
      0,
      image.width * zoomLevel,
      image.height * zoomLevel
    );
  };

  const handleBrightnessChange = () =>
    updateSetting("brightness", brightnessInputRef.current?.value || "100");

  const handleSaturationChange = () =>
    updateSetting("saturation", saturationInputRef.current?.value || "100");

  const handleBlurChange = () =>
    updateSetting("blur", blurInputRef.current?.value || "0");

  const handleInversionChange = () =>
    updateSetting("inversion", inversionInputRef.current?.value || "0");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage = new Image();

      newImage.onload = () => {
        setImage(newImage);
        resetSettings();
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
    <div className="flex w-screen h-screen">
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
          <label className="block mb-2 text-sm font-bold" htmlFor="brightness">
            Brightness
          </label>
          <input
            className="w-full"
            type="range"
            id="brightness"
            min="0"
            max="200"
            ref={brightnessInputRef}
            onChange={handleBrightnessChange}
          />
        </div>
        <div className="p-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="saturation">
            Saturation
          </label>
          <input
            className="w-full"
            type="range"
            id="saturation"
            min="0"
            max="200"
            ref={saturationInputRef}
            onChange={handleSaturationChange}
          />
        </div>
        <div className="p-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="blur">
            Blur
          </label>
          <input
            className="w-full"
            type="range"
            id="blur"
            min="0"
            max="25"
            ref={blurInputRef}
            onChange={handleBlurChange}
          />
        </div>
        <div className="p-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="inversion">
            Inversion
          </label>
          <input
            className="w-full"
            type="range"
            id="inversion"
            min="0"
            max="100"
            ref={inversionInputRef}
            onChange={handleInversionChange}
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
          onClick={resetSettings}
        >
          Reset Settings
        </button>
      </div>
      <div className="flex-grow p-4 bg-gray-900">
        <canvas
          className="max-w-full max-h-full"
          id="canvas"
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
};

export default ComponentB;
