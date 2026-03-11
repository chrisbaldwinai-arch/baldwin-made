import type { Metadata } from "next";
import DarkSection from "@/components/DarkSection";
import PhotoGallery, { type Photo } from "@/components/PhotoGallery";
import PaymentForm from "@/components/PaymentForm";

export const metadata: Metadata = {
  title: "Photography — Baldwin Made",
  description:
    "Portrait and landscape photography by Chris Baldwin — family sessions, studio portraits, and landscapes from Colorado, Hawaii, and beyond.",
};

const photos: Photo[] = [
  {
    src: "/photos/aspens.jpg",
    title: "Golden Aspens",
    category: "landscape",
    location: "Beaver Creek, Colorado",
    description: "Aspens in peak color during a ski trip to Beaver Creek, Colorado",
  },
  {
    src: "/photos/bamboo-forest.jpg",
    title: "Bamboo Forest",
    category: "landscape",
    location: "Hawaii",
    description: "Towering bamboo forest in Hawaii — light filtering through a living cathedral",
  },
  {
    src: "/photos/zions-riverwalk.jpg",
    title: "Zion Riverwalk",
    category: "landscape",
    location: "Zion National Park, Utah",
    description: "The riverwalk at Zion National Park",
  },
  {
    src: "/photos/snow-dog.jpg",
    title: "Snow Day",
    category: "landscape",
    description: "A puppy discovering snow for the first time",
  },
  {
    src: "/photos/baby.jpg",
    title: "Studio Baby",
    category: "portrait",
    description: "Studio portrait of a baby — soft light, soft moments",
  },
  {
    src: "/photos/scarlett.jpg",
    title: "Scarlett",
    category: "portrait",
    description: "Studio portrait of a young baby named Scarlett",
  },
  {
    src: "/photos/child-wonder.jpg",
    title: "Child Wonder",
    category: "portrait",
    description: "A toddler exploring the world through binoculars",
  },
  {
    src: "/photos/child-and-dog.jpg",
    title: "Best Friends",
    category: "portrait",
    description: "A child walking her puppy on a snowy afternoon",
  },
  {
    src: "/photos/child-portrait.jpg",
    title: "Young Portrait",
    category: "portrait",
    description: "Child portrait session",
  },
  {
    src: "/photos/crossfit-1.jpg",
    title: "Strength",
    category: "portrait",
    description: "Crossfit portrait session — celebrating strong women",
  },
  {
    src: "/photos/box-jump.jpg",
    title: "Box Jump",
    category: "portrait",
    description: "Action portrait — an athlete mid-jump",
  },
  {
    src: "/photos/family-1.jpg",
    title: "Family",
    category: "portrait",
    description: "Family portrait session",
  },
  {
    src: "/photos/family-2.jpg",
    title: "Family",
    category: "portrait",
    description: "Family portrait session",
  },
  {
    src: "/photos/family-3.jpg",
    title: "Family",
    category: "portrait",
    description: "Family portrait session",
  },
  {
    src: "/photos/family-4.jpg",
    title: "Family",
    category: "portrait",
    description: "Family portrait session",
  },
  {
    src: "/photos/wedding.jpg",
    title: "Wedding",
    category: "portrait",
    description: "Wedding portrait",
  },
];

export default function PhotographyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <DarkSection glowPosition="60% 30%">
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "var(--space-section) 24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              margin: "0 0 1rem",
            }}
          >
            Photography
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-5xl)",
              color: "var(--color-cloud)",
              lineHeight: 1.1,
              margin: "0 0 1.25rem",
              maxWidth: "18ch",
            }}
          >
            Through the lens
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--text-lg)",
              color: "var(--color-stone)",
              margin: 0,
              maxWidth: "52ch",
              lineHeight: 1.75,
            }}
          >
            Portrait sessions and landscape moments — from studio light to
            national park trails. Photography taught me to slow down and
            really look at what&apos;s in front of me.
          </p>
        </div>
      </DarkSection>

      {/* ── Story ────────────────────────────────────────── */}
      <section
        aria-labelledby="story-heading"
        style={{
          backgroundColor: "var(--color-cloud)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Text */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-kelly)",
                margin: "0 0 0.75rem",
              }}
            >
              The story
            </p>
            <h2
              id="story-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "var(--text-4xl)",
                color: "var(--color-deep-pine)",
                lineHeight: 1.15,
                fontStyle: "italic",
                margin: "0 0 2rem",
              }}
            >
              A lifelong eye for the frame
            </h2>

            {[
              `Photography has been part of my life longer than almost anything else. I can still remember the quiet magic of a darkroom — watching an image slowly emerge in the developer tray, not yet knowing if you'd gotten the shot. That early experience gave me an intuition for light that no class could have taught.`,
              `After college, the camera went on a shelf while my career took over. A few years in, I picked it up again and quickly remembered why I'd loved it. Now, whenever I travel, a camera comes with me — it changes how you move through a place. You slow down, look twice, notice the frame within the frame. Several of my landscape images have been exhibited in a gallery and sold as prints.`,
              `Studio work is a different discipline entirely, and I love it for that reason. Getting the light dialed in — the angle, the power, the balance between key and fill — is a puzzle I never tire of solving. That attention to detail led to one of the more surreal moments of my career: a studio portrait I made was licensed by a phone case company and used in a global advertising campaign. It ran at a CrossFit competition — and by pure chance, the person in the photo walked past their own face on the way to their event.`,
              `Most of my work these days is family portraits. I have recurring clients I've photographed for years — watching kids grow up through a lens, seeing families expand. It's the kind of work that reminds you why connection matters more than any technical achievement.`,
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--text-base)",
                  color: "var(--color-charcoal)",
                  lineHeight: 1.85,
                  margin: i === 0 ? 0 : "1.25rem 0 0",
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Feature photo */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(30,58,30,0.12)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/box-jump.jpg"
              alt="Studio portrait — the image that became a global advertising campaign"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem 1.5rem 1.25rem",
                background: "linear-gradient(to top, rgba(30,58,30,0.7) 0%, transparent 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--text-xs)",
                  color: "var(--color-cloud)",
                  letterSpacing: "0.08em",
                  margin: 0,
                  opacity: 0.85,
                }}
              >
                The portrait that became a global advertising campaign
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .story-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* ── Gallery ──────────────────────────────────────── */}
      <section
        aria-labelledby="gallery-heading"
        style={{
          backgroundColor: "var(--color-white)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            id="gallery-heading"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-2xl)",
              color: "var(--color-deep-pine)",
              margin: "0 0 2rem",
            }}
          >
            Gallery
          </h2>
          <PhotoGallery photos={photos} />
        </div>
      </section>

      {/* ── Pay Your Invoice ──────────────────────────── */}
      <section
        id="pay"
        aria-labelledby="pay-heading"
        style={{
          backgroundColor: "var(--color-cloud)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              margin: "0 0 0.75rem",
              textAlign: "center",
            }}
          >
            Secure payment
          </p>
          <h2
            id="pay-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-4xl)",
              color: "var(--color-deep-pine)",
              fontStyle: "italic",
              lineHeight: 1.15,
              margin: "0 0 0.75rem",
              textAlign: "center",
            }}
          >
            Pay your invoice
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--text-sm)",
              color: "var(--color-charcoal)",
              margin: "0 0 2.5rem",
              lineHeight: 1.75,
              textAlign: "center",
            }}
          >
            Enter the amount from the quote or invoice you received. Payments
            are processed securely by Stripe — your card details never touch
            this server.
          </p>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-mist)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "0 4px 24px rgba(30,58,30,0.06)",
            }}
          >
            <PaymentForm />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--text-xs)",
              color: "var(--color-stone)",
              margin: "1.25rem 0 0",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Payments secured by{" "}
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-kelly)", textDecoration: "none" }}
            >
              Stripe
            </a>
            . Questions? Reach out before paying.
          </p>
        </div>
      </section>
    </>
  );
}
