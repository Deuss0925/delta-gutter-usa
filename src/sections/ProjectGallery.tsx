import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Section, SectionHeading } from "../components/Section";
import finishedHome from "../assets/projects/delta-home-yellow.webp";
import guardClose from "../assets/projects/delta-guard-close.webp";
import miterDetail from "../assets/projects/delta-miter.webp";
import eaveDetail from "../assets/projects/delta-eave-blue.webp";
import downspout from "../assets/projects/delta-downspout-brown.webp";
import beforeWork from "../assets/projects/delta-before.webp";

const projects = [
  {
    src: finishedHome,
    title: "Finished gutter system",
    alt: "White gutters and downspouts installed on a yellow home",
    className: "min-h-[28rem] sm:col-span-2 sm:row-span-2 sm:min-h-[34rem]",
    position: "object-[50%_22%]",
  },
  {
    src: guardClose,
    title: "Gutter protection detail",
    alt: "Close view of a fitted gutter protection screen",
    className: "min-h-[16rem]",
    position: "object-[50%_20%]",
  },
  {
    src: miterDetail,
    title: "Clean corner and miter",
    alt: "White gutter corner fitted beneath a shingle roof",
    className: "min-h-[16rem]",
    position: "object-[50%_16%]",
  },
  {
    src: eaveDetail,
    title: "Finished eave detail",
    alt: "Finished white gutter and eave against blue sky",
    className: "min-h-[18rem]",
    position: "object-[50%_18%]",
  },
  {
    src: downspout,
    title: "Downspout installation",
    alt: "White downspout installed on a brown home",
    className: "min-h-[18rem]",
    position: "object-[50%_38%]",
  },
  {
    src: beforeWork,
    title: "Prepared for replacement",
    alt: "Home prepared for gutter replacement work",
    className: "sm:col-span-2 min-h-[18rem]",
    position: "object-[50%_20%]",
  },
];

export function ProjectGallery() {
  return (
    <Section id="projects" className="bg-navy-950">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Real Delta projects"
          title="Our work, up close."
          intro="Actual installation details and finished homes from Delta Gutter USA projects."
        />
        <ButtonLink href="#contact" variant="secondary" className="mb-12 self-start sm:self-auto">
          Start your project
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>

      <div className="grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 3) * 0.06} className={project.className}>
            <figure className="group relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 bg-navy-800">
              <img
                src={project.src}
                alt={project.alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.position}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-bold text-white">
                {project.title}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
