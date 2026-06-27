export default function AboutPage() {
  return (
    <section className="w-full px-6 pt-32 pb-24 md:px-10 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-display font-semibold tracking-tight text-ink">
          About
        </h1>
        <p className="mt-8 text-base leading-relaxed text-ink-soft md:text-lg">
          Moemedia is a small studio building considered, content-first sites
          for brands and creators. This page is a placeholder — a proper bio
          is coming soon.
        </p>
        <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
          Browse the work on the{" "}
          <a href="/" className="text-accent underline-offset-4 hover:underline">
            homepage
          </a>
          , or get in touch on the{" "}
          <a
            href="/contact"
            className="text-accent underline-offset-4 hover:underline"
          >
            contact
          </a>{" "}
          page.
        </p>
      </div>
    </section>
  );
}
