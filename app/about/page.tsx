import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="w-full px-[4rem] pt-[14rem] pb-[8rem]">
      <div className="mx-auto max-w-[70rem]">
        <h1 className="text-[6rem] font-medium tracking-tight text-ink">About</h1>
        <p className="mt-[3rem] text-[1.6rem] leading-relaxed text-ink-soft">
          Moemedia is a small studio building considered, content-first sites
          for brands and creators. This page is a placeholder — a proper bio
          is coming soon.
        </p>
        <p className="mt-[2rem] text-[1.6rem] leading-relaxed text-ink-soft">
          Browse the work on the{" "}
          <Link href="/" className="text-ink underline-offset-4 hover:underline">
            homepage
          </Link>
          , or get in touch on the{" "}
          <Link href="/contact" className="text-ink underline-offset-4 hover:underline">
            contact
          </Link>{" "}
          page.
        </p>
      </div>
    </section>
  );
}
