export default function ContactPage() {
  return (
    <section className="w-full px-6 pt-32 pb-24 md:px-10 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-display font-semibold tracking-tight text-ink">
          Contact
        </h1>
        <p className="mt-8 text-base leading-relaxed text-ink-soft md:text-lg">
          Have a project in mind? Reach out and let&apos;s talk about it.
        </p>
        <a
          href="mailto:hello@moemedia.com"
          className="mt-6 inline-block text-lg font-medium text-accent underline-offset-4 hover:underline md:text-xl"
        >
          hello@moemedia.com
        </a>
      </div>
    </section>
  );
}
