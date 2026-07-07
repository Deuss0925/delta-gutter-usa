import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type LazyExoticComponent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { hasWebGL } from "../lib/webgl";

type LazySceneProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Scene: LazyExoticComponent<ComponentType<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sceneProps?: Record<string, any>;
  /** Static fallback shown for reduced-motion, no WebGL, or while loading. */
  poster: ReactNode;
  className?: string;
  ariaLabel: string;
};

/**
 * Renders a 3D scene only when it's supported and in view.
 * Falls back to a static poster for prefers-reduced-motion or missing WebGL,
 * and pauses the render loop (`active=false`) when scrolled out of view.
 */
export function LazyScene({
  Scene,
  sceneProps = {},
  poster,
  className = "",
  ariaLabel,
}: LazySceneProps) {
  const reduced = useReducedMotion();
  const [webgl] = useState(() => hasWebGL());
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        setActive(entry.isIntersecting);
      },
      { rootMargin: "200px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const canRender3D = !reduced && webgl;

  return (
    <div ref={ref} className={className} role="img" aria-label={ariaLabel}>
      {canRender3D && visible ? (
        <Suspense fallback={poster}>
          <Scene {...sceneProps} active={active} />
        </Suspense>
      ) : (
        poster
      )}
    </div>
  );
}
