"use client";
import { getServiceIcon } from "@/lib/icons"
import { useEffect, useState } from "react";
export default function Page() {
  const heroImageSettings = {
    scaleMobile: 0.55, // размер на мобилке
    scaleDesktop: 0.6, // размер на десктопе
    xMobile: -30,  // сдвиг по X на мобилке было -40
    yMobile: 300,  // сдвиг по Y на мобилке было 310
    xDesktop: 120, // сдвиг по X на десктопе
    yDesktop: 0,   // сдвиг по Y на десктопе чтобы выше картинка делаем значение ниже было -50
  };
  const aboutImages = ["/lager1.jpg", "/lager2.jpg"];
  const [currentAboutImage, setCurrentAboutImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAboutImage((prev) => (prev + 1) % 2);
    }, 6000);
  
    return () => clearInterval(interval);
  }, []);
  const services = [
    {
      icon: "solar",
      title: "PV-Montage",
      text: "Fachgerechte Montage von Solarmodulen auf Schraeg- und Flachdaechern.",
    },
    {
      icon: "construction",
      title: "Unterkonstruktion",
      text: "Stabile und dauerhafte Systeme fuer sichere Befestigung bei jedem Dachtyp.",
    },
    {
      icon: "check",
      title: "Wartung & Service",
      text: "Regelmaessige Pruefungen fuer hohe Leistung und lange Lebensdauer der Anlage.",
    },
    {
      icon: "repair",
      title: "Repowering",
      text: "Modernisierung bestehender Anlagen mit effizienteren Komponenten.",
    },
    {
      icon: "building",
      title: "Gewerbeprojekte",
      text: "Skalierbare Loesungen fuer Hallen, Buerogebaeude und Industrieflaechen.",
    },
    {
      icon: "home",
      title: "Beratung vor Ort",
      text: "Individuelle Planung abgestimmt auf Gebaeude, Budget und Energiebedarf.",
    },
  ]

  const projects = [
    {
      img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80",
      title: "Einfamilienhaus in Muenster",
      text: "8,5 kWp Dachanlage mit optimierter Ausrichtung fuer hohe Eigenversorgung.",
    },
    {
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
      title: "Gewerbehalle in Osnabrueck",
      text: "Grossflaechenmontage inkl. Unterkonstruktion und abgestimmtem Zeitplan.",
    },
    {
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
      title: "Mehrfamilienhaus in Bielefeld",
      text: "Effiziente Dachbelegung mit Fokus auf Wirtschaftlichkeit und Wartungszugang.",
    },
  ];

  const trustPoints = [
    "5+ Jahre Erfahrung",
    "1000+ Projekte",
    "Privat & Gewerbe",
    "Saubere Ausführung",
  ];

  const team = [
    {
      name: "Markus Klein",
      role: "Projektleitung",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Daniel Weber",
      role: "Montageleiter",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Sophie Hartmann",
      role: "Kundenservice",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <main className="bg-white text-zinc-800">
      <section className="fade-up relative flex min-h-0 w-full flex-col justify-start overflow-x-clip overflow-y-visible bg-white py-6 md:min-h-[92vh] md:justify-center md:py-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:gap-16 px-6 md:grid-cols-2 md:items-center">
          <div className="relative z-20 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Hallo, ich bin Besik Gigauri
            </p>
            <h1 className="mt-3 text-[1.65rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-3xl md:mt-4 md:text-[2.65rem] md:leading-[1.12] lg:text-[2.85rem] lg:leading-[1.1]">
              Photovoltaik-Montage und Dachreinigung im Raum Augsburg, München
              und Donauwörth
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.65] text-zinc-600 md:mt-7 md:text-lg md:leading-relaxed">
              Saubere Arbeit, direkte Kommunikation und zuverlässige Ausführung
              für private und gewerbliche Kunden.
            </p>
            <div className="mt-8 space-y-2.5 border-l-2 border-zinc-300 pl-4 text-sm text-zinc-800 md:text-base">
              <p>
                <span className="font-semibold text-zinc-900">Telefon:</span>{" "}
                <a
                  href="tel:+4917661582721"
                  className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
                >
                  +49 176 61582721
                </a>
              </p>
              <p>
                <span className="font-semibold text-zinc-900">E-Mail:</span>{" "}
                <a
                  href="mailto:info.ekt@gmx.de"
                  className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
                >
                  info.ekt@gmx.de
                </a>
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-8 inline-flex w-fit shrink-0 items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow"
            >
              Jetzt Kontakt aufnehmen
            </a>
          </div>
          <div className="relative z-10 -mt-10 flex min-h-[150px] w-full min-w-0 items-end justify-center md:mt-0 md:min-h-0 md:h-full md:justify-end md:pl-3 md:pr-0 md:[margin-right:calc(-1*max(0px,(100vw-72rem)/2))] md:[width:calc(100%+max(0px,(100vw-72rem)/3))]">
          <div className="relative h-[260px] w-full overflow-hidden md:h-[520px] lg:h-[600px]">
    <img
      src="/hero-worker.png"
      alt="Besik Gigauri – Photovoltaik-Montage"
     className="absolute bottom-0 left-1/2 h-auto w-auto max-w-none md:hidden"
      style={{
        transform: `translate(calc(-50% + ${heroImageSettings.xMobile}px), ${heroImageSettings.yMobile}px) scale(${heroImageSettings.scaleMobile})`,
        transformOrigin: "bottom center",
      }}
    />

    <img
      src="/hero-worker.png"
      alt="Besik Gigauri – Photovoltaik-Montage"
      className="absolute bottom-0 right-0 hidden h-auto w-auto max-w-none md:block"
      style={{
        transform: `translate(${heroImageSettings.xDesktop}px, ${heroImageSettings.yDesktop}px) scale(${heroImageSettings.scaleDesktop})`,
        transformOrigin: "bottom right",
      }}
    />
  </div>
</div>
        </div>
      </section>

      <div className="relative z-30 -mt-10 px-4 sm:px-6 md:-mt-14">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-[0_18px_50px_-12px_rgba(15,23,42,0.12),0_4px_16px_-4px_rgba(15,23,42,0.06)] md:p-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-x-0 md:gap-y-0 md:divide-x md:divide-zinc-100">
              {trustPoints.map((line) => (
                <div
                  key={line}
                  className="flex min-h-[3.25rem] items-center justify-center px-1 text-center md:min-h-0 md:px-5"
                >
                  <p className="text-[0.8125rem] font-semibold leading-snug tracking-tight text-zinc-800 sm:text-sm">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="fade-up relative mt-6 bg-zinc-50 py-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] md:mt-8 md:py-20">
  <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16 lg:gap-20">
        <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Über EKT PV Montage
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
  Über mich
</h2>
<p className="mt-6 text-base leading-[1.75] text-zinc-600">
  Ich bin Inhaber der Firma EKT PV Montage und seit über 5 Jahren im
  Bereich Photovoltaik tätig.
</p>
<p className="mt-6 text-base leading-[1.75] text-zinc-600">
  Mein Schwerpunkt liegt auf der fachgerechten Montage von Solaranlagen
  auf Dächern – sowohl für private als auch gewerbliche Kunden.
</p>
<p className="mt-6 text-base leading-[1.75] text-zinc-600">
  In dieser Zeit habe ich über 1000 Projekte erfolgreich umgesetzt und
  verfüge über umfangreiche Erfahrung in Montage, Planung und Umsetzung.
</p>
<p className="mt-6 text-base leading-[1.75] text-zinc-600">
  Zusätzlich biete ich professionelle Dachreinigung an.
</p>
<p className="mt-6 text-base leading-[1.75] text-zinc-600">
  Weiter unten finden Sie detaillierte Informationen zu meinen Leistungen.
</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_48px_-12px_rgba(15,23,42,0.14)] ring-1 ring-zinc-100/90 md:ml-6">
        <div className="relative h-80 w-full">
  {aboutImages.map((img, index) => (
    <img
      key={img}
      src={img}
      alt="EKT PV Montage Lager"
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        index === currentAboutImage ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/15 via-zinc-900/[0.03] to-transparent" />
</div>
</div>
</div>
      </section>

      <section className="relative bg-white py-20 fade-up shadow-[0_-24px_60px_-20px_rgba(15,23,42,0.07),inset_0_1px_0_0_rgba(255,255,255,0.9)]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Leistungsspektrum
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
            Leistungen
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {const Icon = getServiceIcon(service.icon)
            return (
          
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-[0_4px_26px_-6px_rgba(15,23,42,0.09)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-zinc-300/95 hover:shadow-[0_20px_60px_-12px_rgba(15,23,42,0.18)] md:p-9"
              >
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100/80 backdrop-blur ring-1 ring-zinc-200/70 transition-all duration-300 group-hover:bg-zinc-900">
                <Icon className="w-6 h-6 text-zinc-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900">{service.title}</h3>
                <p className="mt-3 leading-[1.75] text-zinc-600">{service.text}</p>
              </article>
             )
            })}
          </div>
        </div>
      </section>

      <section className="fade-up relative bg-zinc-50 py-20 shadow-[inset_0_12px_32px_-16px_rgba(15,23,42,0.05)]">
        <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Referenzen
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
          Ausgewaehlte Projekte
        </h2>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_6px_30px_-8px_rgba(15,23,42,0.09)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-zinc-300/90 hover:shadow-[0_14px_44px_-12px_rgba(15,23,42,0.13)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-4 right-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Referenzprojekt
                </p>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem] sm:leading-relaxed">
                  {project.text}
                </p>
              </div>
            </article>
          ))}
        </div>
        <a
          href="/projekte"
          className="mt-12 inline-flex rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-sm font-medium text-zinc-900 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-[0_10px_32px_-8px_rgba(15,23,42,0.12)]"
        >
          Alle Projekte ansehen
        </a>
        </div>
      </section>

      <section className="relative bg-white py-20 fade-up shadow-[0_-16px_48px_-16px_rgba(15,23,42,0.06)]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Warum EKT
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
            Ihre Vorteile
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              "Zuverlaessig und termintreu",
              "Schnelle, saubere Montage",
              "Erfahrenes Fachpersonal",
              "Qualitaet mit langfristigem Fokus",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-100 bg-white px-6 py-5 shadow-[0_4px_22px_-6px_rgba(15,23,42,0.07)]"
              >
                <p className="text-[0.9375rem] font-medium leading-snug text-zinc-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-up bg-zinc-50 py-20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]">
        <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Team
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
          Unser Team
        </h2>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_6px_28px_-8px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_14px_40px_-12px_rgba(15,23,42,0.12)]"
            >
              <img
                src={member.img}
                alt={member.name}
                className="h-60 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section
        id="kontakt"
        className="fade-up relative bg-gradient-to-b from-white via-zinc-50/50 to-zinc-50 py-20 shadow-[inset_0_12px_32px_-18px_rgba(15,23,42,0.05)] md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16 md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Direkter Draht
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
              Kontakt
            </h2>
            <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-zinc-700">
              <p>
                <span className="font-medium text-zinc-900">Telefon:</span> +49
                251 1234567
              </p>
              <p>
                <span className="font-medium text-zinc-900">Email:</span>{" "}
                info@ekt-pvmontage.de
              </p>
              <p>
                <span className="font-medium text-zinc-900">Adresse:</span>{" "}
                Musterstrasse 12, 48143 Muenster
              </p>
            </div>
          </div>

          <form className="rounded-2xl border border-zinc-100 bg-white p-7 shadow-[0_20px_55px_-22px_rgba(15,23,42,0.18)] md:p-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 px-4 py-3 text-zinc-900 outline-none ring-zinc-300/40 transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 px-4 py-3 text-zinc-900 outline-none ring-zinc-300/40 transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="name@beispiel.de"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50/40 px-4 py-3 text-zinc-900 outline-none ring-zinc-300/40 transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="Wie koennen wir helfen?"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 inline-flex w-full justify-center rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white shadow-[0_6px_22px_-6px_rgba(15,23,42,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_10px_30px_-8px_rgba(15,23,42,0.4)] sm:w-auto"
            >
              Nachricht senden
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-zinc-200 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-zinc-600 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} EKT PV Montage</p>
          <nav className="flex gap-6">
            <a href="/impressum" className="hover:text-zinc-900">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-zinc-900">
              Datenschutz
            </a>
            <a href="/kontakt" className="hover:text-zinc-900">
              Kontakt
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
