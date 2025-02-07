"use client";

import { useEffect, useState } from "react";

function getAverageColor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
): number[] {
  const imageData = ctx.getImageData(x, y, width, height);
  let r = 0,
    g = 0,
    b = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    r += imageData.data[i];
    g += imageData.data[i + 1];
    b += imageData.data[i + 2];
  }

  const pixelCount = imageData.data.length / 4;
  return [
    Math.floor(r / pixelCount),
    Math.floor(g / pixelCount),
    Math.floor(b / pixelCount),
  ];
}

function interpolateColor(
  color1: number[],
  color2: number[],
  factor: number,
): number[] {
  return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
}

export const useImageColors = (imageUrl: string | null | undefined) => {
  const [gradient, setGradient] = useState<string>(
    "linear-gradient(135deg, #1a1a1a, #2a2a2a, #1a1a1a)",
  );

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const topLeftColor = getAverageColor(
        ctx,
        0,
        0,
        img.width / 2,
        img.height / 2,
      );
      const topRightColor = getAverageColor(
        ctx,
        img.width / 2,
        0,
        img.width / 2,
        img.height / 2,
      );
      const bottomLeftColor = getAverageColor(
        ctx,
        0,
        img.height / 2,
        img.width / 2,
        img.height / 2,
      );
      const bottomRightColor = getAverageColor(
        ctx,
        img.width / 2,
        img.height / 2,
        img.width / 2,
        img.height / 2,
      );

      const middleTopColor = interpolateColor(topLeftColor, topRightColor, 0.5);
      const middleBottomColor = interpolateColor(
        bottomLeftColor,
        bottomRightColor,
        0.5,
      );
      const centerColor = interpolateColor(
        middleTopColor,
        middleBottomColor,
        0.5,
      );

      const brightenColor = (color: number[]) =>
        color.map(c => Math.min(255, Math.round(c * 1.2)));

      const darkenColor = (color: number[]) =>
        color.map(c => Math.round(c * 0.1));

      const brightTopLeft = brightenColor(topLeftColor);
      const darkBottomRight = darkenColor(bottomRightColor);
      const darkCenter = darkenColor(centerColor);

      const gradientString = `linear-gradient(135deg,
        rgb(${brightTopLeft.join(",")}),
        rgb(${darkCenter.join(",")}),
        rgb(${darkBottomRight.join(",")})
      )`;

      setGradient(gradientString);
    };

    img.onerror = () => {
      console.error("Error loading image");
    };
  }, [imageUrl]);

  return gradient;
};
