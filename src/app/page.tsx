
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";

type Filter =
  | "WORKS"
  | "FILMS"
  | "FASHION"
  | "FRAGRANCE"
  | "PRODUCTS";

const filters: Filter[] = [
  "WORKS",
  "FILMS",
  "FASHION",
  "FRAGRANCE",
  "PRODUCTS",
];

const EMAIL = "saribadnan420@gmail.com";

// Portfolio categories
const projectGroups: Record<Filter, string[]> = {
  WORKS: projects.map((project) => project.id),

  FILMS: ["04", "05"],

  FASHION: ["02"],

  FRAGRANCE: ["01"],

  PRODUCTS: ["03", "06"],
};

// Individual project card
function ProjectCard({
  project,
  useOriginalLayout = false,
}: {
  project: Project;
  useOriginalLayout?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const hoverTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(
    null
  );

  const startPreview = () => {
    setIsHovered(true);

    if (!project.previewVideo) return;

    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    hoverTimer.current = setTimeout(() => {
      setShowVideo(true);
    }, 450);
  };

  const stopPreview = () => {
    setIsHovered(false);
    setShowVideo(false);

    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
    };
  }, []);

  return (
    <Link
      href={`/projects/${project.id}`}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      className={`
        group relative block min-h-[230px]
        bg-[#151515]
        transition-transform duration-300 ease-out
        motion-reduce:transform-none
        ${useOriginalLayout ? project.layout : ""}
        ${
          isHovered
            ? "z-30 md:scale-[1.05]"
            : "z-0 scale-100"
        }
      `}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#151515]">
        {/* PROJECT THUMBNAIL */}
        <div
          className={`
            absolute inset-0 bg-cover bg-center
            transition-opacity duration-500
            ${showVideo ? "opacity-0" : "opacity-100"}
          `}
          style={{
            backgroundImage: `url("${project.image}")`,
          }}
        />

        {/* HOVER VIDEO PREVIEW */}
        {showVideo && project.previewVideo && (
          <video
            ref={videoRef}
            src={project.previewVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* CINEMATIC GRADIENT */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* PLAY ICON */}
        <div
          className={`
            absolute right-4 top-4
            flex h-8 w-8 items-center justify-center
            rounded-full border border-white/70
            text-xs transition-all duration-300
            ${
              isHovered
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }
          `}
        >
          ▶
        </div>

        {/* PROJECT DETAILS */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="mb-1 text-[11px] text-white/70">
            [{project.id}]
          </p>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-light tracking-tight text-white md:text-base">
                {project.title}
              </h2>

              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/65">
                {project.category}
              </p>
            </div>

            <span className="text-[10px] text-white/70">
              {project.year}
            </span>
          </div>

          {/* HOVER LABEL */}
          <div
            className={`
              overflow-hidden transition-all duration-300
              ${
                isHovered
                  ? "mt-3 max-h-10 opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/85">
              VIEW PROJECT →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] =
    useState<Filter>("WORKS");

  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProjects = projects.filter(
    (project) =>
      projectGroups[activeFilter].includes(project.id)
  );

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    setMenuOpen(false);

    document
      .getElementById("works")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <header className="relative z-40 flex items-start justify-between gap-6 px-5 py-7 md:px-11">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => selectFilter("WORKS")}
          className="flex shrink-0 flex-col"
        >
          <span className="text-2xl font-light tracking-[0.08em]">
            AI VERSE°
          </span>

          <span className="mt-1 text-[10px] tracking-[0.3em]">
            BY SARIB ADNAN
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-9 pt-3 text-[10px] uppercase tracking-[0.18em] md:flex">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => selectFilter(filter)}
              className={`
                cursor-pointer
                border-b pb-2
                transition-colors duration-300
                ${
                  activeFilter === filter
                    ? "border-white text-white"
                    : "border-transparent text-white/55 hover:text-white"
                }
              `}
            >
              {filter}
            </button>
          ))}

          <a
            href="#info"
            className="border-b border-transparent pb-2 text-white/55 transition-colors hover:text-white"
          >
            INFO
          </a>
        </nav>

        {/* MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="shrink-0 cursor-pointer pt-3 text-[10px] tracking-[0.2em] transition-colors hover:text-white/60"
        >
          {menuOpen ? "CLOSE −" : "MENU +"}
        </button>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <div className="absolute right-5 top-20 z-50 w-[260px] border border-white/15 bg-[#111] p-7 shadow-2xl md:right-11">
            <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/40">
              EXPLORE AI VERSE
            </p>

            <div className="flex flex-col items-start gap-5">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => selectFilter(filter)}
                  className={`cursor-pointer text-sm font-light tracking-[0.12em] transition-colors hover:text-white ${
                    activeFilter === filter
                      ? "text-white"
                      : "text-white/55"
                  }`}
                >
                  {filter}
                </button>
              ))}

              <a
                href="#info"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-light tracking-[0.12em] text-white/55 transition-colors hover:text-white"
              >
                INFO / CONTACT
              </a>
            </div>
          </div>
        )}
      </header>

      {/* SELECTED WORKS */}
      <section
        id="works"
        className="scroll-mt-8 px-5 pb-16 pt-8 md:px-11 md:pt-12"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* LEFT EDITORIAL COLUMN */}
          <aside className="flex min-w-0 flex-col justify-between pb-4">
            <div>
              <p className="mb-8 text-[10px] uppercase leading-5 tracking-[0.28em] text-white/50">
                AI FILM
                <br />
                & CREATIVE PRODUCTION
              </p>

              <h1 className="text-[clamp(3rem,4.2vw,4.5rem)] font-extralight leading-[0.95] tracking-[-0.075em]">
                {activeFilter === "WORKS" ? (
                  <>
                    SELECTED
                    <br />
                    WORKS
                  </>
                ) : activeFilter === "FILMS" ? (
                  <>
                    AI
                    <br />
                    FILMS
                  </>
                ) : activeFilter === "FASHION" ? (
                  <>
                    FASHION
                    <br />
                    FILMS
                  </>
                ) : activeFilter === "FRAGRANCE" ? (
                  <>
                    FRAGRANCE
                    <br />
                    FILMS
                  </>
                ) : (
                  <>
                    PRODUCT
                    <br />
                    FILMS
                  </>
                )}
              </h1>

              <p className="mt-9 max-w-[240px] text-[10px] uppercase leading-[1.8] tracking-[0.25em] text-white/55">
                {activeFilter === "WORKS"
                  ? "A collection of films, campaigns and visual experiments exploring storytelling through AI."
                  : activeFilter === "FILMS"
                  ? "Cinematic storytelling, atmospheric narratives and lifestyle films."
                  : activeFilter === "FASHION"
                  ? "Fashion campaigns exploring identity, style and visual direction."
                  : activeFilter === "FRAGRANCE"
                  ? "Luxury fragrance storytelling through cinematic advertising."
                  : "Creative product campaigns, beauty advertising and commercial visuals."}
              </p>
            </div>

            <p className="mt-12 text-[10px] tracking-[0.25em] text-white/50">
              LAHORE — 2026
            </p>
          </aside>

          {/* PROJECT GRID */}
          <div className="min-w-0">
            {activeFilter === "WORKS" ? (
              <div className="grid auto-rows-[210px] grid-cols-1 gap-4 md:grid-cols-5">
                {visibleProjects
                  .slice(0, 4)
                  .map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      useOriginalLayout
                    />
                  ))}
              </div>
            ) : (
              <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:grid-cols-2">
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LOWER GRID: ALL WORKS ONLY */}
        {activeFilter === "WORKS" && (
          <div className="mt-5 grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-5">
            {visibleProjects
              .slice(4)
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  useOriginalLayout
                />
              ))}
          </div>
        )}

        {/* FILTER COUNTER */}
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            {activeFilter} / {visibleProjects.length}{" "}
            {visibleProjects.length === 1
              ? "PROJECT"
              : "PROJECTS"}
          </p>

          {activeFilter !== "WORKS" && (
            <button
              type="button"
              onClick={() => selectFilter("WORKS")}
              className="cursor-pointer text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              VIEW ALL WORKS →
            </button>
          )}
        </div>
      </section>

      {/* INFO / CONTACT SECTION */}
      <section
        id="info"
        className="scroll-mt-12 border-t border-white/15 px-5 py-16 md:px-11 md:py-24"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-white/45">
              INFO / CONTACT
            </p>

            <h2 className="text-4xl font-extralight tracking-[-0.06em] md:text-6xl">
              LET'S CREATE
              <br />
              SOMETHING.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="mb-6 max-w-md text-sm font-light leading-7 text-white/60">
              AI VERSE is a creative portfolio exploring
              AI filmmaking, cinematic advertising,
              fashion films, product campaigns and
              visual storytelling.
            </p>

            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
              BUSINESS INQUIRIES
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="break-all text-xl font-light tracking-tight text-white underline decoration-white/30 underline-offset-8 transition-colors hover:text-white/60 md:text-2xl"
            >
              {EMAIL} ↗
            </a>

            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
              BASED IN LAHORE, PAKISTAN
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col gap-5 border-t border-white/10 px-5 pb-8 pt-8 text-[10px] uppercase tracking-[0.2em] text-white/55 md:flex-row md:items-center md:justify-between md:px-11">
        <button
          type="button"
          onClick={() => selectFilter("WORKS")}
          className="cursor-pointer text-left text-white"
        >
          — VIEW ALL WORKS
        </button>

        <span>© 2026 AI VERSE BY SARIB ADNAN</span>

        <a
          href={`mailto:${EMAIL}`}
          className="text-white transition-colors hover:text-white/60"
        >
          CONTACT ↗
        </a>
      </footer>
    </main>
  );
}
