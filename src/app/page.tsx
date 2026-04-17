export default function Page() {
  const heroImageSettings = {
    scale: 0.7, // размер
    xMobile: 50,  // сдвиг по X на мобилке
    yMobile: 350,  // сдвиг по Y на мобилке
    xDesktop: 180, // сдвиг по X на десктопе
    yDesktop: 110,   // сдвиг по Y на десктопе
  };
  const services = [
    {
      icon: "☀",
      title: "PV-Montage",
      text: "Fachgerechte Montage von Solarmodulen auf Schraeg- und Flachdaechern.",
    },
    {
      icon: "▦",
      title: "Unterkonstruktion",
      text: "Stabile und dauerhafte Systeme fuer sichere Befestigung bei jedem Dachtyp.",
    },
    {
      icon: "✓",
      title: "Wartung & Service",
      text: "Regelmaessige Pruefungen fuer hohe Leistung und lange Lebensdauer der Anlage.",
    },
    {
      icon: "↻",
      title: "Repowering",
      text: "Modernisierung bestehender Anlagen mit effizienteren Komponenten.",
    },
    {
      icon: "▣",
      title: "Gewerbeprojekte",
      text: "Skalierbare Loesungen fuer Hallen, Buerogebaeude und Industrieflaechen.",
    },
    {
      icon: "⌂",
      title: "Beratung vor Ort",
      text: "Individuelle Planung abgestimmt auf Gebaeude, Budget und Energiebedarf.",
    },
  ];

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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-6 md:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] md:gap-12">
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
        transform: `translate(calc(-50% + ${heroImageSettings.xMobile}px), ${heroImageSettings.yMobile}px) scale(${heroImageSettings.scale})`,
        transformOrigin: "bottom center",
      }}
    />

    <img
      src="/hero-worker.png"
      alt="Besik Gigauri – Photovoltaik-Montage"
      className="absolute bottom-0 right-0 hidden h-auto w-auto max-w-none md:block"
      style={{
        transform: `translate(${heroImageSettings.xDesktop}px, ${heroImageSettings.yDesktop}px) scale(${heroImageSettings.scale})`,
        transformOrigin: "bottom right",
      }}
    />
  </div>
</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 bg-white px-6 py-16 md:grid-cols-2 md:items-center fade-up">
        <div>
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
  Über mich
</h2>
          <p className="mt-5 text-base leading-7 text-zinc-600">
            Als lokaler Fachbetrieb begleiten wir Bauherren, Eigentuemer und
            Unternehmen von der ersten Beratung bis zur fertigen Anlage. Unser
            Team kombiniert handwerkliche Erfahrung mit moderner Technik -
            fuer langlebige und wirtschaftliche Ergebnisse.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Klare Kommunikation, transparente Prozesse und saubere Ausfuehrung
            stehen bei uns im Mittelpunkt jeder Zusammenarbeit.
          </p>
        </div>
        <img
          src="https://picsum.photos/1200/800?random=21"
          alt="Team bei der Montage"
          className="h-80 w-full rounded-xl object-cover"
        />
      </section>

      <section className="bg-zinc-50 py-16 fade-up">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Leistungen
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-lg text-zinc-700">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl bg-white px-6 py-16 fade-up">
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          Ausgewaehlte Projekte
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-4 right-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Referenzprojekt
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
        <a
          href="/projekte"
          className="mt-10 inline-flex rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-100 hover:shadow-md"
        >
          Alle Projekte ansehen
        </a>
      </section>

      <section className="bg-zinc-50 py-16 fade-up">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Ihre Vorteile
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Zuverlaessig und termintreu",
              "Schnelle, saubere Montage",
              "Erfahrenes Fachpersonal",
              "Qualitaet mit langfristigem Fokus",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-200 bg-white px-5 py-4"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl bg-white px-6 py-16 fade-up">
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          Unser Team
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={member.img}
                alt={member.name}
                className="h-60 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 text-zinc-600">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="kontakt" className="bg-zinc-50 py-16 fade-up">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Kontakt
            </h2>
            <div className="mt-6 space-y-3 text-zinc-700">
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

          <form className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="space-y-4">
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2.5 outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2.5 outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2.5 outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2"
                  placeholder="Wie koennen wir helfen?"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg"
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
