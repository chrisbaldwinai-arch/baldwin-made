import type { Metadata } from "next";
import DarkSection from "@/components/DarkSection";
import {
  Users,
  CreditCard,
  ClipboardList,
  GitMerge,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Product — Baldwin Made",
  description:
    "Product management philosophy and payments expertise from Chris Baldwin — fintech PM with experience across issuing, acquiring, and payment processing.",
};

export const revalidate = 86400; // Refresh article feeds every 24 hours

/* ─── RSS feed utilities ─────────────────────────────── */

interface Article {
  title: string;
  link: string;
}

function extractText(xml: string, tag: string): string {
  const cdataMatch = xml.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  );
  if (cdataMatch) return cdataMatch[1].trim();
  const directMatch = xml.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`));
  return directMatch?.[1]?.trim() ?? "";
}

function extractLink(xml: string): string {
  const directMatch = xml.match(/<link>([^<\s][^<]*)<\/link>/);
  if (directMatch) return directMatch[1].trim();
  const hrefMatch = xml.match(/<link[^>]+href="([^"]+)"/);
  return hrefMatch?.[1]?.trim() ?? "";
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#\d+;/g, "");
}

async function fetchRSSArticles(
  feedUrl: string,
  maxItems = 3
): Promise<Article[]> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 86400 },
      headers: { "User-Agent": "BaldwinMade/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items: Article[] = [];

    // Support both RSS 2.0 <item> and Atom <entry>
    const itemPattern = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/g;
    let match;
    while ((match = itemPattern.exec(xml)) !== null && items.length < maxItems) {
      const content = match[1];
      const title = decodeEntities(extractText(content, "title"));
      const link = extractLink(content);
      if (title && link) {
        items.push({ title, link });
      }
    }
    return items;
  } catch {
    return [];
  }
}

/* ─── Expertise data ─────────────────────────────────── */

const expertiseBase = [
  {
    Icon: Users,
    title: "User Research & Discovery",
    description:
      "Users rarely hand you a problem statement. They describe symptoms, explain workarounds, and tell you what they want — not what they need. Getting to the real problem requires asking the questions that feel too basic to ask.",
    feedUrl: "https://www.nngroup.com/feed/rss/",
    feedLabel: "Nielsen Norman Group",
  },
  {
    Icon: CreditCard,
    title: "Payments Domain",
    description:
      "Deep experience across both sides of the ecosystem — issuing and acquiring. From processing infrastructure to the user experience layer, I understand how payments work at every level of the stack.",
    feedUrl: "https://www.pymnts.com/feed/",
    feedLabel: "PYMNTS",
  },
  {
    Icon: ClipboardList,
    title: "Requirements & Definition",
    description:
      "Requirements gathered poorly produce defects no amount of testing can save you from. Translating user behavior into clear, testable specifications is one of the highest-leverage things a PM can do.",
    feedUrl: "https://www.mindtheproduct.com/feed/",
    feedLabel: "Mind the Product",
  },
  {
    Icon: GitMerge,
    title: "Engineering Collaboration",
    description:
      "Software development is a team sport. I learned early that the relationship between product and engineering determines the quality of everything that ships. The best outcomes come from shared understanding, not handed-down specs.",
    feedUrl: "https://martinfowler.com/feed.atom",
    feedLabel: "Martin Fowler",
  },
];

/* ─── Page ───────────────────────────────────────────── */

export default async function ProductPage() {
  // Fetch all RSS feeds in parallel
  const articleResults = await Promise.all(
    expertiseBase.map((e) => fetchRSSArticles(e.feedUrl))
  );

  const expertise = expertiseBase.map((e, i) => ({
    ...e,
    articles: articleResults[i],
  }));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <DarkSection glowPosition="30% 60%">
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
            Product Management
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-5xl)",
              color: "var(--color-cloud)",
              lineHeight: 1.1,
              margin: "0 0 1.25rem",
              maxWidth: "22ch",
            }}
          >
            Products built on understanding, not assumptions
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
            A career in fintech payments — from bank teller to product leader —
            built on one conviction: the best software starts with genuinely
            understanding the people who use it.
          </p>
        </div>
      </DarkSection>

      {/* ── Philosophy ───────────────────────────────────── */}
      <section
        aria-labelledby="philosophy-heading"
        style={{
          backgroundColor: "var(--color-white)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
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
            How I think about product
          </p>
          <h2
            id="philosophy-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-4xl)",
              color: "var(--color-deep-pine)",
              lineHeight: 1.15,
              fontStyle: "italic",
              margin: "0 0 2.5rem",
            }}
          >
            From the teller window to the product suite
          </h2>

          {[
            `My career started where most people's relationship with money begins — at the bank. As a college teller, I handled real people's real money every day. There's something clarifying about that kind of responsibility. You're not thinking in abstractions; you're thinking about the person in front of you and what they actually need. That instinct has never left me.`,
            `When I moved into payments technology, I learned quickly that software is only as good as the understanding behind it. My first hard lesson came through defects — the kind that ruin a release and ruin your day. But the deeper lesson was upstream: requirements gathered poorly produce defects no amount of testing can save you from. More critically, users will rarely hand you a problem statement. They'll describe symptoms. They'll explain workarounds. They'll tell you what they want, not what they need. The job is to close that gap.`,
            `I've spent my career talking directly with clients and users — not because it's a best practice, but because it's the only way to really see your product. Every conversation opens a perspective you didn't have before.`,
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--text-lg)",
                color: "var(--color-charcoal)",
                lineHeight: 1.85,
                margin: i === 0 ? 0 : "1.5rem 0 0",
              }}
            >
              {para}
            </p>
          ))}

          {/* Pull quote */}
          <blockquote
            style={{
              borderLeft: "3px solid var(--color-kelly)",
              margin: "3rem 0 0",
              padding: "0.25rem 0 0.25rem 1.75rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "var(--text-2xl)",
                fontStyle: "italic",
                color: "var(--color-deep-pine)",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              &ldquo;There is a 99% chance users are not going to tell you their
              exact problem. Understanding behavior is how you find it.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Why Payments ─────────────────────────────────── */}
      <section
        aria-labelledby="payments-heading"
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
          className="payments-grid"
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
              Why Payments
            </p>
            <h2
              id="payments-heading"
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
              The moment of trust
            </h2>
            {[
              `Payments is where finance becomes real. It's not a feature — it's the moment of trust between a product and the person using it. I've worked on both sides of the ecosystem, from issuing to acquiring, and each transition revealed a completely new world with its own rules, rails, and failure modes.`,
              `What I keep returning to is this: the technology changes constantly, but people's relationship with money doesn't. That tension — between the speed of innovation and the weight of trust — is what makes payments one of the most interesting and demanding problems in software.`,
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

          {/* Visual: issuing / acquiring diagram */}
          <div
            style={{
              backgroundColor: "var(--color-deep-pine)",
              borderRadius: "20px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
            aria-hidden="true"
          >
            {[
              { label: "Issuing", desc: "Cards, accounts, cardholder experience" },
              { label: "Processing", desc: "Authorization, clearing, settlement" },
              { label: "Acquiring", desc: "Merchant acceptance, gateway, disputes" },
            ].map(({ label, desc }, i) => (
              <div key={label}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-kelly)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "var(--text-base)",
                        color: "var(--color-cloud)",
                        margin: 0,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "var(--text-sm)",
                        color: "var(--color-stone)",
                        margin: "0.15rem 0 0",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      marginLeft: "19px",
                      marginTop: "0.75rem",
                      width: "1px",
                      height: "1.25rem",
                      backgroundColor: "rgba(136,184,138,0.3)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .payments-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* ── Areas of expertise ───────────────────────────── */}
      <section
        aria-labelledby="expertise-heading"
        style={{
          backgroundColor: "var(--color-white)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
            Areas of expertise
          </p>
          <h2
            id="expertise-heading"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-3xl)",
              color: "var(--color-deep-pine)",
              margin: "0 0 3rem",
              lineHeight: 1.2,
            }}
          >
            Where I spend my thinking
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {expertise.map(({ Icon, title, description, articles, feedLabel }) => (
              <div
                key={title}
                style={{
                  backgroundColor: "var(--color-cloud)",
                  border: "1px solid var(--color-mist)",
                  borderRadius: "20px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-meadow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-deep-pine)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    color: "var(--color-deep-pine)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "var(--text-sm)",
                    color: "var(--color-charcoal)",
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  {description}
                </p>

                {/* Article feed */}
                {articles.length > 0 && (
                  <div
                    style={{
                      borderTop: "1px solid var(--color-mist)",
                      paddingTop: "1rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-kelly)",
                        margin: "0 0 0.6rem",
                      }}
                    >
                      Recent from {feedLabel}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                      }}
                    >
                      {articles.map((article) => (
                        <li key={article.link}>
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-link"
                            style={{
                              fontFamily: "var(--font-body)",
                              fontWeight: 400,
                              fontSize: "var(--text-xs)",
                              color: "var(--color-charcoal)",
                              textDecoration: "none",
                              lineHeight: 1.45,
                              display: "block",
                            }}
                          >
                            → {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── On AI and Product ────────────────────────────── */}
      <DarkSection glowPosition="70% 40%">
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "var(--space-section) 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              margin: "0 0 2rem",
            }}
          >
            On AI and Product
          </p>
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "var(--text-3xl)",
                fontStyle: "italic",
                color: "var(--color-cloud)",
                lineHeight: 1.4,
                margin: "0 0 2rem",
              }}
            >
              &ldquo;AI has made it possible to build software faster than ever.
              But speed without understanding is just waste at scale. If you
              haven&apos;t done the hard work of understanding user behavior —
              what problems actually need solving, and for whom — you&apos;ll
              burn through your AI credits and end up with something genuinely
              impressive that nobody wants or needs.&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--text-sm)",
                color: "var(--color-stone)",
                margin: 0,
                letterSpacing: "0.08em",
              }}
            >
              The fundamentals of product haven&apos;t changed.
              The cost of ignoring them just got higher.
            </p>
          </blockquote>
        </div>
      </DarkSection>

      <style>{`
        .article-link:hover {
          color: var(--color-kelly) !important;
        }
      `}</style>
    </>
  );
}
