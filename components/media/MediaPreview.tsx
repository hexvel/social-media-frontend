"use client";

import { cn } from "@/lib/utils";
import { Media } from "@/types/media.type";
import Image from "next/image";
import { useMemo } from "react";

interface MediaPreviewsProps {
  attachments: Media[];
  onClick: (url: string) => void;
  onImageClick: (url: string) => void;
}

export const MediaPreviews = ({
  attachments,
  onImageClick,
}: MediaPreviewsProps) => {
  const renderPreviews = useMemo(
    () =>
      attachments.map(attachment => (
        <MediaPreview
          key={attachment.id}
          media={attachment}
          onClick={onImageClick}
        />
      )),
    [attachments, onImageClick],
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 z-1",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {renderPreviews}
    </div>
  );
};

interface MediaPreviewProps {
  media: Media;
  onClick: (url: string) => void;
}

const MediaPreview = ({ media, onClick }: MediaPreviewProps) => {
  if (media.type === "IMAGE") {
    return (
      <div className='relative w-full overflow-hidden rounded-xl'>
        <Image
          src={media.url}
          alt='Attachment'
          width={1920}
          height={1080}
          className='cursor-pointer select-none object-contain w-full h-auto transition-transform'
          onClick={() => onClick(media.url)}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          quality={100}
        />
      </div>
    );
  }

  return <p className='text-destructive'>Unsupported attachment</p>;
};
