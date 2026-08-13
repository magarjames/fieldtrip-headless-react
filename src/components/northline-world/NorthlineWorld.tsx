import type { CSSProperties } from "react";
import "@/components/northline-world/northline-world.css";
import worldForge from "@/assets/northline-world/world-forge.png";
import worldReturn from "@/assets/northline-world/world-return.png";
import worldThreshold from "@/assets/northline-world/world-threshold.png";
import worldTransit from "@/assets/northline-world/world-transit.png";
import worldWeather from "@/assets/northline-world/world-weather.png";

type WorldScene = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  metric: string;
  image: string;
  alt: string;
  accent: string;
  cameraX: string;
  cameraY: string;
  cameraScale: number;
};

const scenes: WorldScene[] = [
  {
    id: "threshold",
    label: "Threshold",
    eyebrow: "01 / 05 - Dusk-to-dawn field study",
    title: "Begin where the city thins.",
    body: "A quieter edge of the city gives the first layer a reason to exist: wind, wet ground, and the stretch before the train arrives.",
    tags: ["Water-shedding shell", "Paced departure"],
    metric: "00.0 km / outer edge",
    image: worldThreshold,
    alt: "A black-clad figure walking through a monumental concrete gateway toward a dawn city and rail line.",
    accent: "#c57958",
    cameraX: "-2%",
    cameraY: "-1%",
    cameraScale: 1.2,
  },
  {
    id: "forge",
    label: "Forge",
    eyebrow: "02 / 05 - Material under pressure",
    title: "Let the material answer.",
    body: "Inside the forge, rain sits on the surface instead of in it. Every detail earns its place before it meets a moving day.",
    tags: ["Membrane test", "Quiet hardware"],
    metric: "00.8 km / internal lab",
    image: worldForge,
    alt: "A minimalist concrete garment laboratory with black weatherproof jackets, wet textile samples, and a figure walking toward a bright exit.",
    accent: "#a8895b",
    cameraX: "1.5%",
    cameraY: "1%",
    cameraScale: 1.17,
  },
  {
    id: "transit",
    label: "Transit",
    eyebrow: "03 / 05 - The moving line",
    title: "Keep the route open.",
    body: "The pieces are designed for the points that normally interrupt momentum: the platform, the downpour, and the in-between minutes.",
    tags: ["Layered mobility", "Fast exit"],
    metric: "03.1 km / transit spine",
    image: worldTransit,
    alt: "A hooded figure walking beside rain-darkened city train tracks beneath a pale concrete shelter.",
    accent: "#86a7a4",
    cameraX: "2.5%",
    cameraY: "0%",
    cameraScale: 1.22,
  },
  {
    id: "weather",
    label: "Weather",
    eyebrow: "04 / 05 - Field condition",
    title: "Make room for weather.",
    body: "A shell should become background noise. The world can change without changing what the next hour asks of you.",
    tags: ["Wind guard", "Dry reach"],
    metric: "06.7 km / weather deck",
    image: worldWeather,
    alt: "A hooded figure crossing a rain-slick rooftop deck toward a warm doorway with a city beyond.",
    accent: "#9a8d6c",
    cameraX: "0%",
    cameraY: "-2%",
    cameraScale: 1.19,
  },
  {
    id: "return",
    label: "Return",
    eyebrow: "05 / 05 - The room after",
    title: "Return with less to undo.",
    body: "Good utility leaves the day lighter. It dries, waits, and is ready for the route again without announcing itself.",
    tags: ["Air-dry finish", "Repeat tomorrow"],
    metric: "08.4 km / return room",
    image: worldReturn,
    alt: "A warm concrete and timber return room with a black jacket hanging by a bench and a hooded figure at the balcony doorway.",
    accent: "#c57958",
    cameraX: "-1%",
    cameraY: "1%",
    cameraScale: 1.15,
  },
];

function sceneStyle(scene: WorldScene): CSSProperties {
  return {
    "--nlw-accent": scene.accent,
    "--nlw-camera-x": scene.cameraX,
    "--nlw-camera-y": scene.cameraY,
    "--nlw-camera-scale": scene.cameraScale,
  } as CSSProperties;
}

export function NorthlineWorld() {
  return (
    <div
      className="northline-world"
      data-direction-contract="THESIS: a five-stop utility apparel journey where the route itself proves the clothes. OWN-WORLD: wet concrete, pale dawn, deep ink shells, and one clay ember across an architectural miniature city. STORY: threshold, material forge, transit spine, weather deck, return room. FIRST VIEWPORT: a forward path through a monumental gateway. FORM: a native CSS scroll-scrubbed world preview staged for a future frame-locked video chain. FINISH: editorial, cinematic, quiet."
    >
      <a className="nlw-skip-link" href="#threshold">
        Skip to the world
      </a>

      <header className="nlw-header">
        <a className="nlw-brand" href="#top" aria-label="Vivre World home">
          <span>Vivre</span>
          <small>World</small>
        </a>
        <nav className="nlw-nav" aria-label="World route">
          {scenes.map((scene) => (
            <a key={scene.id} href={`#${scene.id}`}>
              {scene.label}
            </a>
          ))}
        </nav>
        <a className="nlw-store-link" href="/northline#collection">
          Storefront <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <div className="nlw-prelude" aria-hidden="true">
          <span>Scroll world / Vivre field notes</span>
          <i />
          <span>Desktop draft</span>
        </div>

        <aside className="nlw-route-rail" aria-label="World route progress">
          <span className="nlw-route-line" />
          {scenes.map((scene, index) => (
            <a key={scene.id} href={`#${scene.id}`} title={`Go to ${scene.label}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </aside>

        {scenes.map((scene, index) => (
          <section
            key={scene.id}
            id={scene.id}
            className={`nlw-scene nlw-scene-${scene.id}`}
            style={sceneStyle(scene)}
            aria-labelledby={`${scene.id}-title`}
          >
            <div className="nlw-scene-frame">
              <figure className="nlw-scene-media">
                <img
                  src={scene.image}
                  alt={scene.alt}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </figure>
              <div className="nlw-scene-vignette" aria-hidden="true" />
              <div className="nlw-coordinate nlw-coordinate-top" aria-hidden="true">
                <span>{scene.metric}</span>
                <i />
              </div>
              <div className="nlw-coordinate nlw-coordinate-bottom" aria-hidden="true">
                <i />
                <span>Camera / forward</span>
              </div>

              <article className="nlw-copy">
                <p className="nlw-eyebrow">{scene.eyebrow}</p>
                <h1 id={`${scene.id}-title`}>{scene.title}</h1>
                <p className="nlw-body">{scene.body}</p>
                <ul className="nlw-tags" aria-label={`${scene.label} features`}>
                  {scene.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {index === 0 && (
                  <p className="nlw-scroll-cue">
                    Scroll to enter <span aria-hidden="true">↓</span>
                  </p>
                )}
                {index === scenes.length - 1 && (
                  <div className="nlw-final-actions">
                    <a href="/northline#collection">Explore the collection</a>
                    <a href="/northline#materials">Read the material notes</a>
                  </div>
                )}
              </article>
            </div>
          </section>
        ))}
      </main>

      <footer className="nlw-footer">
        <p>Vivre World is a scroll-world preview.</p>
        <p>
          Frame-locked video clips can replace these staged posters when the render chain is
          connected.
        </p>
      </footer>
    </div>
  );
}
