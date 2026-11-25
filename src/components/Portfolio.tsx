"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useSyncExternalStore } from "react";
import { JOURNEY, type Lang, LINKS, PROJECTS, STACK, UI } from "@/lib/content";

// The chosen language: remembered in localStorage when the browser allows it, in memory otherwise.
let chosen: Lang | null = null;
const readLang = (): Lang => {
  if (chosen) return chosen;
  try {
    return localStorage.getItem("lang") === "en" ? "en" : "es";
  } catch {
    return "es";
  }
};
const onLang = (cb: () => void) => {
  addEventListener("langchange", cb);
  return () => removeEventListener("langchange", cb);
};
const setLang = (lang: Lang) => {
  chosen = lang;
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  dispatchEvent(new Event("langchange"));
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function Heading({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">
      <span className="mr-3 align-top font-sans text-base font-bold text-accent md:text-xl">{n}</span>
      {children}
    </h2>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Portfolio() {
  const lang = useSyncExternalStore(onLang, readLang, () => "es" as Lang);
  const t = (x: Record<Lang, string>) => x[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const [featured, ...others] = PROJECTS;
  const nav = [
    ["#proyectos", UI.nav.projects],
    ["#trayectoria", UI.nav.journey],
    ["#sobre-mi", UI.nav.about],
    ["#contacto", UI.nav.contact],
  ] as const;
  const section = "mx-auto max-w-6xl px-4 py-20 md:py-28";

  return (
    <>
      <a href="#contenido" className="btn fixed left-4 top-3 z-50 -translate-y-24 bg-white focus:translate-y-0">
        {t(UI.skip)}
      </a>

      <header className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
          <a href="#inicio" aria-label="Sebastian Gonzalez" className="grid size-10 place-items-center rounded-md border-[3px] border-ink bg-white font-display text-sm font-black">
            SG
          </a>
          <nav aria-label={lang === "es" ? "Principal" : "Main"} className="ml-auto hidden gap-7 font-semibold md:flex">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="underline-offset-8 hover:underline">
                {t(label)}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t(UI.switchTo)}
            className="ml-auto flex overflow-hidden rounded-full border-[3px] border-ink bg-white text-sm font-bold md:ml-0"
          >
            {(["es", "en"] as const).map((l) => (
              <span key={l} aria-hidden className={`px-3 py-1.5 uppercase transition-colors ${l === lang ? "bg-ink text-white" : ""}`}>
                {l}
              </span>
            ))}
          </button>
        </div>
      </header>

      <main id="contenido">
        {/* The board hangs from ropes tied above the screen, as in the first version of this portfolio. */}
        <section id="inicio" className="flex min-h-svh items-center justify-center overflow-clip px-4 pb-16 pt-28">
          <div className="hang relative w-full max-w-3xl">
            <span aria-hidden className="absolute bottom-full left-[14%] h-[100vh] w-3 border-x-[3px] border-ink bg-rope" />
            <span aria-hidden className="absolute bottom-full right-[14%] h-[100vh] w-3 border-x-[3px] border-ink bg-rope" />
            <div className="board rounded-xl px-6 py-12 text-center md:px-14 md:py-16">
              <p className="font-display text-xl font-extrabold md:text-2xl">{t(UI.hello)}</p>
              <h1 className="mt-3 font-display text-[8vw] font-black uppercase leading-[0.95] md:text-6xl">{t(UI.role)}</h1>
              <p className="mx-auto mt-6 max-w-[46ch] text-muted md:text-lg">{t(UI.pitch)}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#proyectos" className="btn bg-ink text-white">
                  {t(UI.seeProjects)}
                </a>
                <a href="#contacto" className="btn bg-white">
                  {t(UI.contactMe)}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="proyectos" className={section}>
          <Heading n="01">{t(UI.projectsTitle)}</Heading>

          <article className="board rise mt-12 grid overflow-hidden rounded-xl md:grid-cols-[1.3fr_1fr]">
            <div className="relative border-b-[3px] border-ink bg-ink md:border-b-0 md:border-r-[3px]">
              <Image src={featured.images![0]} alt={`${featured.title}: ${t(featured.kind)}`} width={1920} height={1080} className="aspect-video h-full w-full object-cover" />
              <Image
                src={featured.images![1]}
                alt=""
                width={1920}
                height={1080}
                className="absolute bottom-4 right-4 w-[42%] rotate-2 rounded-md border-[3px] border-ink shadow-[4px_4px_0_var(--color-ink)]"
              />
            </div>
            <div className="flex flex-col gap-5 p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-accent">
                {t(UI.featured)} · {t(featured.kind)}
              </p>
              <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">{featured.title}</h3>
              <p className="text-muted">{t(featured.summary)}</p>
              <Tags items={featured.tags} />
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <a href={featured.site} {...external} className="btn bg-accent text-white">
                  {t(UI.liveSite)} <span aria-hidden>↗</span>
                </a>
                <a href={featured.repo} {...external} className="btn bg-white">
                  {t(UI.code)}
                </a>
              </div>
            </div>
          </article>

          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.id} className="board rise flex flex-col gap-4 rounded-xl p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-muted">{t(p.kind)}</p>
                <h3 className="font-display text-2xl font-black uppercase leading-none">{p.title}</h3>
                <p className="text-muted">{t(p.summary)}</p>
                <Tags items={p.tags} />
                <a href={p.repo} {...external} className="btn mt-auto self-start bg-white text-sm">
                  {t(UI.code)} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="trayectoria" className={section}>
          <Heading n="02">{t(UI.journeyTitle)}</Heading>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">{t(UI.journeyIntro)}</p>
          <ol className="mt-12 space-y-10 border-l-[3px] border-ink pl-8 md:pl-12">
            {JOURNEY.map((step, i) => {
              const now = i === JOURNEY.length - 1;
              return (
                <li key={i} className="rise relative">
                  <span aria-hidden className={`absolute -left-[calc(2rem+11px)] top-1.5 size-5 rounded-full border-[3px] border-ink md:-left-[calc(3rem+11px)] ${now ? "bg-accent" : "bg-white"}`} />
                  <p className="font-display text-lg font-black text-accent">{step.year}</p>
                  <h3 className="mt-1 font-display text-2xl font-black uppercase leading-tight md:text-3xl">{t(step.title)}</h3>
                  <p className="mt-2 max-w-[60ch] text-muted">{t(step.text)}</p>
                  <div className="mt-4">
                    <Tags items={step.tags} />
                  </div>
                </li>
              );
            })}
          </ol>

          <h3 className="mt-24 font-display text-3xl font-black uppercase md:text-4xl">{t(UI.stackTitle)}</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((g) => (
              <div key={g.group.en} className="board rise rounded-xl p-5">
                <h4 className="mb-4 font-display text-lg font-black uppercase">{t(g.group)}</h4>
                <Tags items={g.items} />
              </div>
            ))}
          </div>
        </section>

        <section id="sobre-mi" className={section}>
          <Heading n="03">{t(UI.aboutTitle)}</Heading>
          <div className="mt-12 grid items-center gap-12 md:grid-cols-[18rem_1fr]">
            <Image
              src="/sebastian.jpeg"
              alt={t(UI.photoAlt)}
              width={288}
              height={288}
              className="board rise mx-auto aspect-square w-60 -rotate-2 rounded-xl object-cover md:w-72"
            />
            <div className="space-y-4 text-lg leading-relaxed">
              {UI.about[lang].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-6xl px-4 pb-24 pt-8">
          <div className="rise rounded-xl border-[3px] border-ink bg-ink px-6 py-14 text-center text-white shadow-[8px_8px_0_var(--color-accent)] md:py-20">
            <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">{t(UI.contactTitle)}</h2>
            <p className="mt-4 text-lg text-white/75">{t(UI.contactText)}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-ink">
              {LINKS.email && (
                <a href={`mailto:${LINKS.email}`} className="btn bg-accent text-white">
                  {LINKS.email}
                </a>
              )}
              <a href={LINKS.linkedin} {...external} className="btn bg-white">
                LinkedIn <span aria-hidden>↗</span>
              </a>
              <a href={LINKS.github} {...external} className="btn bg-white">
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-[3px] border-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 py-8 text-sm text-muted">
          <p>
            © 2026 Sebastian Gonzalez · {t(UI.footer)}
          </p>
          <a href={LINKS.source} {...external} className="font-semibold underline underline-offset-4">
            {t(UI.sourceCode)}
          </a>
        </div>
      </footer>
    </>
  );
}
