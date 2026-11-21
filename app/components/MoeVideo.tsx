"use client";

import { useRef } from "react";

export function MoeVideo() {
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
      <button type="button" className="pill pill--primary moe-watch" onClick={open}>
        <span className="moe-watch-icon" aria-hidden>
          ▶
        </span>
        Watch Moe in 53 seconds
      </button>
      <dialog
        ref={dialogRef}
        className="video-dialog"
        aria-label="Video: Moe, the AI receptionist"
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
            src="/video/moe.mp4"
            poster="/video/moe-poster.jpg"
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
