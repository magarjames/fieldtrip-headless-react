import {
  NorthlineFrameSequence,
  type NorthlineFrameSequenceConfig,
} from "@/components/northline/NorthlineFrameSequence";

type ScrollFilmMessage = {
  title: string;
  copy: string;
};

type NorthlineScrollFilmProps = {
  image: string;
  frameSequence: NorthlineFrameSequenceConfig;
  alt: string;
  messages: readonly ScrollFilmMessage[];
};

export function NorthlineScrollFilm({
  image,
  frameSequence,
  alt,
  messages,
}: NorthlineScrollFilmProps) {
  return (
    <section id="journal" className="nl-film" aria-label="Vivre campaign journal">
      <article className="nl-film-step nl-film-step-dawn nl-film-step-sequence">
        <div className="nl-film-frame">
          <NorthlineFrameSequence sequence={frameSequence} poster={image} alt={alt} eager />
          <div className="nl-film-story" aria-label="Three notes from the collection">
            {messages.map((message, index) => (
              <div
                className={`nl-film-copy nl-film-copy-${index + 1}`}
                data-film-copy
                key={message.title}
              >
                <p className="nl-film-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / {String(messages.length).padStart(2, "0")}
                </p>
                <h2>{message.title}</h2>
                <p>{message.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
