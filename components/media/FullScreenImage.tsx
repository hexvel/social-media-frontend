"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FullScreenImageProps {
  url: string;
  onClose: () => void;
}

export default function FullScreenImage({
  url,
  onClose,
}: FullScreenImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[55555] flex items-center justify-center backdrop-blur-md transition-opacity duration-500 ${
        loaded && !closing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div className='absolute inset-0 bg-black/60' />
      <div
        className={`pointer-events-none relative flex h-full w-full items-center justify-center p-4 transition-transform duration-300 ease-in-out ${
          loaded && !closing ? "scale-100" : "scale-0"
        }`}
      >
        <Image
          src={url}
          alt='Full Screen'
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
          quality={100}
          priority
          onLoadingComplete={() => setLoaded(true)}
        />
        <button
          onClick={e => {
            e.stopPropagation();
            handleClose();
          }}
          className='absolute right-6 top-6 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 pointer-events-auto'
        >
          <X />
        </button>
      </div>
    </div>
  );
}
