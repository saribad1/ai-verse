
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

// Tell Next.js which project pages exist.
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// Project content loads inside a Suspense boundary.
async function ProjectContent({
  params,
}: ProjectPageProps) {
  const { id } = await params;

  const projectIndex = projects.findIndex(
    (item) => item.id === id
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  const previous =
    projects[
      (projectIndex - 1 + projects.length) %
        projects.length
    ];

  const next =
    projects[(projectIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <header className="flex items-start justify-between gap-6 px-5 py-7 md:px-11">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-light tracking-[0.08em]">
            AI VERSE°
          </span>

          <span className="mt-1 text-[10px] tracking-[0.3em]">
            BY SARIB ADNAN
          </span>
        </Link>

        <Link
          href="/#works"
          className="pt-3 text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          ← BACK TO WORKS
        </Link>
      </header>

      {/* PROJECT CONTENT */}
      <section className="px-5 pb-20 pt-12 md:px-11">
        {/* TITLE */}
        <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/50">
              PROJECT [{project.id}] / {project.category}
            </p>

            <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-extralight leading-[0.9] tracking-[-0.07em]">
              {project.title}
            </h1>
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
            AI CONCEPT FILM — {project.year}
          </p>
        </div>

        {/* VIDEO PLAYER */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#111]">
          {project.video ? (
            <video
              key={`${project.id}-${project.video}`}
              src={project.video}
              poster={project.image}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(
                  rgba(0,0,0,0.3),
                  rgba(0,0,0,0.6)
                ), url("${project.image}")`,
              }}
            >
              <p className="text-xs uppercase tracking-[0.25em]">
                VIDEO COMING SOON
              </p>
            </div>
          )}
        </div>

        {/* DESCRIPTION AND INFORMATION */}
        <div className="mt-12 grid grid-cols-1 gap-12 border-t border-white/20 pt-10 md:grid-cols-[1.5fr_1fr]">
          {/* DESCRIPTION */}
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/45">
              THE CONCEPT
            </p>

            <p className="max-w-2xl text-xl font-light leading-relaxed text-white/85 md:text-2xl">
              {project.description}
            </p>
          </div>

          {/* INFORMATION */}
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/45">
              PROJECT INFORMATION
            </p>

            <div className="space-y-5 text-xs uppercase tracking-[0.12em]">
              <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                <span className="text-white/45">
                  CATEGORY
                </span>
                <span>{project.category}</span>
              </div>

              <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                <span className="text-white/45">
                  YEAR
                </span>
                <span>{project.year}</span>
              </div>

              <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                <span className="text-white/45">
                  DURATION
                </span>
                <span>{project.duration}</span>
              </div>

              <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                <span className="text-white/45">
                  FORMAT
                </span>
                <span>AI CONCEPT FILM</span>
              </div>

              <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                <span className="text-white/45">
                  STUDIO
                </span>
                <span>AI VERSE</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT NAVIGATION */}
        <div className="mt-24 grid grid-cols-1 gap-8 border-t border-white/20 pt-10 md:grid-cols-2">
          <Link
            href={`/projects/${previous.id}`}
            className="group"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
              ← PREVIOUS PROJECT
            </p>

            <h2 className="text-2xl font-light transition-colors group-hover:text-white/60">
              {previous.title}
            </h2>
          </Link>

          <Link
            href={`/projects/${next.id}`}
            className="group md:text-right"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
              NEXT PROJECT →
            </p>

            <h2 className="text-2xl font-light transition-colors group-hover:text-white/60">
              {next.title}
            </h2>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col gap-5 border-t border-white/10 px-5 py-8 text-[10px] uppercase tracking-[0.2em] text-white/45 md:flex-row md:justify-between md:px-11">
        <Link href="/" className="text-white">
          ← ALL WORKS
        </Link>

        <span>
          © 2026 AI VERSE BY SARIB ADNAN
        </span>

        <span>
          AI FILM & CREATIVE PRODUCTION
        </span>
      </footer>
    </main>
  );
}

// The page itself renders immediately.
// Suspense handles loading the dynamic project ID.
export default function ProjectPage({
  params,
}: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            LOADING PROJECT...
          </p>
        </main>
      }
    >
      <ProjectContent params={params} />
    </Suspense>
  );
}
