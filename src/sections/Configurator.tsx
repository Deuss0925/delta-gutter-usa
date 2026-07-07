import { lazy, useState } from "react";
import { Rotate3d } from "lucide-react";
import { Section, SectionHeading } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { LazyScene } from "../components/LazyScene";
import { useSceneBudget } from "../lib/useSceneBudget";
import { gutterColors, type GutterProfile } from "../config/content";

const ConfiguratorScene = lazy(() => import("../three/ConfiguratorScene"));

/** Static cross-section poster that still reflects the chosen color/profile. */
function ProfilePoster({
  profile,
  color,
}: {
  profile: GutterProfile;
  color: string;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-navy-800/60 to-navy-900">
      <svg
        viewBox="0 0 160 120"
        className="h-40 w-52 drop-shadow-[0_10px_30px_rgba(47,177,232,0.25)]"
        role="img"
        aria-label={`${profile === "kstyle" ? "K-Style" : "Half-Round"} gutter cross-section preview`}
      >
        {profile === "kstyle" ? (
          <path
            d="M32 18 L32 84 Q32 98 48 98 L118 98 Q132 98 132 82 Q132 66 118 62 Q130 54 124 40 Q120 30 132 22 L132 18 Z"
            fill={color}
            stroke="rgba(4,20,31,0.6)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M28 24 L28 52 A52 52 0 0 0 132 52 L132 24 L120 24 L120 52 A40 40 0 0 1 40 52 L40 24 Z"
            fill={color}
            stroke="rgba(4,20,31,0.6)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

export function Configurator() {
  const { maxDpr } = useSceneBudget();
  const [profile, setProfile] = useState<GutterProfile>("kstyle");
  const [color, setColor] = useState<string>(gutterColors[0].hex);
  const [colorName, setColorName] = useState<string>(gutterColors[0].name);

  return (
    <Section id="colors" className="bg-navy-950">
      <SectionHeading
        eyebrow="See it in your color"
        title="Match your gutters to your home."
        intro="Spin the profile, try popular aluminum finishes, and picture the look before we ever climb a ladder."
      />

      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* 3D viewer */}
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ice/10 bg-navy-900 glow-blue">
            <LazyScene
              className="absolute inset-0"
              ariaLabel={`Interactive 3D ${profile === "kstyle" ? "K-Style" : "Half-Round"} gutter section in ${colorName}`}
              Scene={ConfiguratorScene}
              sceneProps={{ profile, color, maxDpr }}
              poster={<ProfilePoster profile={profile} color={color} />}
            />
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-ice/10 bg-navy-950/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ice/60 backdrop-blur-sm">
              <Rotate3d className="size-3.5" aria-hidden />
              Drag to rotate
            </div>
          </div>
        </Reveal>

        {/* Controls */}
        <Reveal delay={0.1}>
          <div>
            {/* Profile toggle */}
            <div
              role="group"
              aria-label="Gutter profile"
              className="inline-flex rounded-full border border-ice/15 bg-white/[0.03] p-1"
            >
              {(
                [
                  ["kstyle", "K-Style"],
                  ["halfround", "Half-Round"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setProfile(value)}
                  aria-pressed={profile === value}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    profile === value
                      ? "bg-blue-500 text-navy-950"
                      : "text-ice/70 hover:text-ice"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Swatches */}
            <div className="mt-8">
              <p className="font-mono-label mb-3 text-ice/60">
                Finish — <span className="text-ice">{colorName}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {gutterColors.map((c) => {
                  const active = c.name === colorName;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setColor(c.hex);
                        setColorName(c.name);
                      }}
                      aria-label={`Preview ${c.name}`}
                      aria-pressed={active}
                      title={c.name}
                      className={`size-10 cursor-pointer rounded-full ring-2 ring-offset-2 ring-offset-navy-950 transition-transform hover:scale-110 ${
                        active ? "ring-blue-400" : "ring-ice/20"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-sm text-ice/55">
              Popular aluminum colors — ask about our full range for gutters and
              downspouts.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
