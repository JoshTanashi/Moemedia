export default function ContactPage() {
  return (
    <section className="w-full px-[4rem] pt-[14rem] pb-[8rem]">
      <div className="mx-auto max-w-[70rem]">
        <h1 className="text-[6rem] font-medium tracking-tight text-ink">Contact</h1>
        <p className="mt-[3rem] text-[1.6rem] leading-relaxed text-ink-soft">
          Have a project in mind? Reach out and let&apos;s talk about it.
        </p>
        <a
          href="mailto:hello@moemedia.com"
          className="mt-[2rem] inline-block text-[1.8rem] font-medium text-ink underline-offset-4 hover:underline"
        >
          hello@moemedia.com
        </a>
      </div>
    </section>
  );
}
