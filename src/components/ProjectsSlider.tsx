import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

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
    <div className="relative ">
        <div
        className={`md:hidden text-xs font-body tracking-widest uppercase pointer-events-none flex items-center justify-center gap-2 text-text/60 ${hint ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>

          Swipe
      </div>
      <Swiper
        className="projects-swiper"
        modules={[Navigation, Pagination, A11y, Keyboard]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        grabCursor
        watchOverflow
        observeParents
        observer
        spaceBetween={16}
        breakpoints={{
          // En mobile: 1 card exacta (sin peek para evitar que “se vean 3”)
          0:    { slidesPerView: 1,   spaceBetween: 16, centeredSlides: false },
          480:  { slidesPerView: 1.1, spaceBetween: 16, centeredSlides: true  },
          768:  { slidesPerView: 2,   spaceBetween: 24, centeredSlides: false },
          1024: { slidesPerView: 3,   spaceBetween: 24, centeredSlides: false },
        }}
        onSlideChange={() => setHint(false)}
      >
        {projects.map((p) => (
          <SwiperSlide key={p.title}>
            <div className="card-wrap h-full p-4">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card group bg-background border-2 border-text/20 p-6 rounded-main shadow-solid transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full"
                aria-label={`Abrir proyecto ${p.title}`}
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:underline underline-offset-2">
                    {p.title}
                  </h3>
                  <p className="text-text/80 mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-accent/20 text-accent font-semibold text-xs py-1 px-3 rounded-btn"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="font-bold text-primary group-hover:underline self-start">
                  Ver más →
                </span>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
