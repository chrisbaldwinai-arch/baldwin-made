"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export interface Piece {
  src: string;
  label: string;
  story: string;
  details?: string;
}

export default function WoodworkingGallery({ pieces }: { pieces: Piece[] }) {
  const [selected, setSelected] = useState<Piece | null>(null);

  return (
    <>
      {/* ── Grid ── */}
      <div
        className="gallery-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {pieces.map((piece) => (
          <button
            key={piece.label}
            onClick={() => setSelected(piece)}
            aria-label={`View details for ${piece.label}`}
            style={{
              all: "unset",
              cursor: "pointer",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "var(--color-cloud)",
              border: "1px solid var(--color-mist)",
              display: "block",
              textAlign: "left",
            }}
            className="gallery-card"
          >
            <Image
              src={piece.src}
              alt={piece.label}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <div
              style={{
                padding: "0.875rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-deep-pine)",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                {piece.label}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-kelly)",
                }}
              >
                Read more →
              </span>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
        .gallery-card:hover { opacity: 0.92; }
      `}</style>

      {/* Modal responsive style — must be outside AnimatePresence so it's available before modal animates in */}
      <style>{`
        @media (max-width: 640px) {
          .modal-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ── Modal overlay ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(10, 20, 10, 0.75)",
              zIndex: 9000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                overflow: "hidden",
                maxWidth: "780px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
              }}
              className="modal-inner"
            >
              {/* Image side */}
              <div
                style={{
                  backgroundColor: "var(--color-deep-pine)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "320px",
                }}
              >
                <Image
                  src={selected.src}
                  alt={selected.label}
                  width={1200}
                  height={900}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  sizes="390px"
                />
              </div>

              {/* Story side */}
              <div
                style={{
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-kelly)",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    The piece
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "var(--text-3xl)",
                      fontStyle: "italic",
                      color: "var(--color-deep-pine)",
                      lineHeight: 1.15,
                      margin: "0 0 1.5rem",
                    }}
                  >
                    {selected.label}
                  </h3>
                  {selected.story.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "var(--text-sm)",
                        color: "var(--color-charcoal)",
                        lineHeight: 1.85,
                        margin: i === 0 ? 0 : "1rem 0 0",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                  {selected.details && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "var(--text-xs)",
                        color: "var(--color-stone)",
                        lineHeight: 1.75,
                        margin: "1rem 0 0",
                      }}
                    >
                      {selected.details}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    marginTop: "2rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                  }}
                >
                  ← Close
                </button>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
