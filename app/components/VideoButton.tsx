"use client";

import { useRef } from "react";

export type VideoButtonProps = {
  src: string;
  poster: string;
  label: string;
  title: string;
  variant?: "pill" | "link";
};

export function VideoButton({ src, poster, label, title, variant = "pill" }: VideoButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };

  const close = () => dialogRef.current?.close();

  const onClose = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <>
      <button
        type="button"
        className={variant === "pill" ? "pill pill--primary video-btn" : "video-link"}
        onClick={open}
      >
        <span className="video-btn-icon" aria-hidden>
          ▶
        </span>
        {label}
      </button>
      <dialog
        ref={dialogRef}
        className="video-dialog"
        aria-label={`Video: ${title}`}
        onClose={onClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="video-frame">
          <button type="button" className="video-close" onClick={close} aria-label="Close video">
            ✕
          </button>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            playsInline
            preload="none"
            width={720}
            height={1280}
          />
        </div>
      </dialog>
    </>
  );
}
