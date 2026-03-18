"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export interface Photo {
  src: string;
  title: string;
  category: "landscape" | "portrait";
  location?: string;
  description?: string;
}

type Filter = "all" | "landscape" | "portrait";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  // Reset lightbox when filter changes to avoid index out-of-bounds
  useEffect(() => {
    setLightboxIndex(null);
  }, [filter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const filterLabels: { value: Filter; label: string }[] = [
    { value: "all",       label: "All" },
    { value: "landscape", label: "Landscape" },
    { value: "portrait",  label: "Portrait" },
  ];

  return (
    <>
      {/* ── Filter bar ─────────────────────────────────────── */}
      <div
        role="group"
        aria-label="Filter photos by category"
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {filterLabels.map(({ value, label }) => {
          const active = filter === value;
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={active}
              style={{
                padding: "8px 24px",
                borderRadius: "9999px",
                border: active ? "none" : "1.5px solid var(--color-mist)",
                backgroundColor: active ? "var(--color-kelly)" : "transparent",
                color: active ? "#ffffff" : "var(--color-stone)",
                fontFamily: "var(--font-body)",
                fontWeight: active ? 500 : 400,
                fontSize: "var(--text-sm)",
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Masonry grid ───────────────────────────────────── */}
      <div
        style={{
          columns: "3 300px",
          columnGap: "1rem",
        }}
      >
        {filtered.map((photo, index) => (
          <button
            key={photo.src}
            onClick={() => openLightbox(index)}
            aria-label={`View ${photo.title}`}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              border: "none",
              padding: 0,
              cursor: "pointer",
              borderRadius: "12px",
              overflow: "hidden",
              breakInside: "avoid",
              position: "relative",
              background: "var(--color-mist)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.description ?? photo.title}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 400ms cubic-bezier(0.16,1,0.3,1), filter 400ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.88)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "";
                (e.currentTarget as HTMLImageElement).style.filter = "";
              }}
            />
            {/* Hover label */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem 1rem 0.75rem",
                background: "linear-gradient(to top, rgba(30,58,30,0.75) 0%, transparent 100%)",
                color: "var(--color-cloud)",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "var(--text-sm)",
                opacity: 0,
                transition: "opacity 300ms ease",
              }}
              className="photo-label"
            >
              {photo.title}
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ───────────────────────────────────────── */}
      <AnimatePresence>
        {currentPhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${currentPhoto.title}`}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              backgroundColor: "rgba(10, 20, 10, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {/* Image + caption */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.src}
                alt={currentPhoto.description ?? currentPhoto.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  display: "block",
                }}
              />

              {/* Caption */}
              <div
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "var(--text-xl)",
                    color: "var(--color-cloud)",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {currentPhoto.title}
                </p>
                {currentPhoto.location && (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.25rem",
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: "var(--text-sm)",
                      color: "var(--color-stone)",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    <MapPin size={13} /> {currentPhoto.location}
                  </p>
                )}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "var(--text-xs)",
                    color: "var(--color-stone)",
                    opacity: 0.6,
                    margin: "0.25rem 0 0",
                    letterSpacing: "0.05em",
                  }}
                >
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close photo"
              style={{
                position: "fixed",
                top: "1.5rem",
                right: "1.5rem",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(136,184,138,0.3)",
                backgroundColor: "rgba(30,58,30,0.6)",
                color: "var(--color-cloud)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              style={{
                position: "fixed",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid rgba(136,184,138,0.3)",
                backgroundColor: "rgba(30,58,30,0.6)",
                color: "var(--color-cloud)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              style={{
                position: "fixed",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid rgba(136,184,138,0.3)",
                backgroundColor: "rgba(30,58,30,0.6)",
                color: "var(--color-cloud)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover label reveal */}
      <style>{`
        button:hover .photo-label { opacity: 1 !important; }
      `}</style>
    </>
  );
}
