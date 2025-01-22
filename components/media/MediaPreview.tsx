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
      attachments.map((attachment) => (
        <MediaPreview
          key={attachment.id}
          media={attachment}
          onClick={onImageClick}
        />
      )),
    [attachments, onImageClick]
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
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
  //   if (media.type === "IMAGE") {
  //     return (
  //       <Image
  //         src={`http://localhost:5000/${media.url}`}
  //         alt="Attachment"
  //         width={500}
  //         height={500}
  //         className="mx-auto size-fit max-h-[30rem] cursor-pointer select-none rounded-xl"
  //         onClick={() => onClick(media.url)}
  //       />
  //     );
  //   }

  //   return <p className="text-destructive">Unsupported attachment</p>;
  return (
    <Image
      src={`http://localhost:5000/${media.url}`}
      alt="Attachment"
      width={500}
      height={500}
      className="mx-auto size-fit max-h-[30rem] cursor-pointer select-none rounded-xl"
      onClick={() => onClick(media.url)}
    />
  );
};
