import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Project = {
  title: string;
  status: string;
  description: string;
  tags: string[];
  link?: string;
  cta: string;
};

function ProjectContent({ project }: { project: Project }) {
  const titleClassName = `text-xl font-bold text-primary underline-offset-2 ${
    project.link ? "group-hover:underline" : ""
  }`;

  return (
    <>
      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h3 className={titleClassName}>{project.title}</h3>
          <span className="bg-accent/20 text-accent font-semibold text-xs py-1 px-3 rounded-btn">
            {project.status}
          </span>
        </div>
        <p className="text-text/80 mb-4">{project.description}</p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent/20 text-accent font-semibold text-xs py-1 px-3 rounded-btn"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="inline-flex items-center gap-2 font-bold text-primary self-start">
        <span>{project.cta}</span>
        {project.link && (
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const baseClassName = "project-card group bg-background border-2 border-text/20 p-6 rounded-main shadow-solid flex flex-col h-full md:min-h-[24rem]";
  const className = project.link
    ? `${baseClassName} transition-transform duration-300 hover:-translate-y-2`
    : baseClassName;

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Abrir proyecto ${project.title}`}
      >
        <ProjectContent project={project} />
      </a>
    );
  }

  return (
    <article className={className} aria-label={`${project.title}: ${project.status}`}>
      <ProjectContent project={project} />
    </article>
  );
}

export default function ProjectsSlider({ projects }: { projects: Project[] }) {
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const hide = () => setHint(false);
    window.addEventListener("touchstart", hide, { once: true });
    window.addEventListener("mousedown", hide, { once: true });
    return () => {
      window.removeEventListener("touchstart", hide);
      window.removeEventListener("mousedown", hide);
    };
  }, []);

  return (
    <div className="relative">
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 auto-rows-fr items-stretch gap-8 px-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="md:hidden">
        <div
          className={`text-xs font-body tracking-widest uppercase pointer-events-none flex items-center justify-center gap-2 text-text/60 ${hint ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Swipe
        </div>

        <Swiper
          className="projects-swiper"
          modules={[Pagination, A11y, Keyboard]}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          grabCursor
          watchOverflow
          observeParents
          observer
          slidesPerView={1}
          spaceBetween={16}
          onSlideChange={() => setHint(false)}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.title}>
              <div className="card-wrap h-full p-4">
                <ProjectCard project={project} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
