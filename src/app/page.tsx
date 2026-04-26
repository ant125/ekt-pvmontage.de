"use client";
import ProjectCard from "@/components/projects/ProjectCard";
import { getServiceIcon } from "@/lib/icons";
import { projects } from "@/lib/projects";
import { useEffect, useState } from "react";
export default function Page() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  
    const form = e.currentTarget
  
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }
  
    const res = await fetch("/api/contact", { // ⚠️ ВАЖНО!
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  
    if (res.ok) {
      alert("Nachricht gesendet!")
      form.reset()
    } else {
      alert("Fehler beim Senden")
    }
  }
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
      text: "Fachgerechte Montage von Photovoltaikanlagen auf Schräg- und Flachdächern für private und gewerbliche Kunden.",
    },
    {
      icon: "ruler",
      title: "Kalkulation",
      text: "Exakte Berechnung aller benötigten Materialien und Komponenten für Ihr Projekt – effizient und wirtschaftlich.",
    },
    {
      icon: "chat",
      title: "Beratung",
      text: "Individuelle Beratung direkt vor Ort – abgestimmt auf Ihr Dach, Ihren Energiebedarf und Ihr Budget.",
    },
    {
      icon: "cleaning",
      title: "Dachreinigung",
      text: "Professionelle Reinigung von Dächern zur Vorbereitung für Montage oder zur langfristigen Werterhaltung.",
    },
    {
      icon: "settings",
      title: "Wartung & Service",
      text: "Regelmäßige Wartung und Kontrolle Ihrer Anlage für maximale Leistung, Sicherheit und Lebensdauer.",
    },
    {
      icon: "tool",
      title: "Demontage & Reparatur",
      text: "Fachgerechte Demontage alter Anlagen sowie Reparatur und Austausch defekter Komponenten.",
    },
  ]

  const trustPoints = [
    "5+ Jahre Erfahrung",
    "1000+ Projekte",
    "Privat & Gewerbe",
    "Saubere Ausführung",
  ];

  type TeamMember = {
    id: string;
    name: string;
    role: string;
    image: string;
  };

  type TeamSectionData = {
    title: string;
    groupImage?: string;
    members: TeamMember[];
  };

  const teamData: TeamSectionData = {
    title: "Unser Team",
    groupImage: "/images/team/teams.jpg",
    members: [
      {
        id: "1",
        name: "Zviadi Zviadauri",
        role: "Montageleiter",
        image: "/images/team/zvyat.jpg",
      },
      {
        id: "2",
        name: "Andrey Lazarev",
        role: "Montageleiter",
        image: "/images/team/andrey.jpg",
      },
      {
        id: "3",
        name: "Denis Gitlan",
        role: "Monteur",
        image: "/images/team/denis.jpg",
      },
      {
        id: "4",
        name: "Valiko Ompolasvili",
        role: "Monteur",
        image: "/images/team/valera.jpg",
      },
    ],
  };

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
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
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
              { icon: "check", text: "Zuverlaessig und termintreu" },
              { icon: "fast", text: "Schnelle, saubere Montage" },
              { icon: "team", text: "Erfahrenes Fachpersonal" },
              { icon: "quality", text: "Qualitaet mit langfristigem Fokus" },
            ].map((item) => {
              const Icon = getServiceIcon(item.icon);
              return (
              <div
                key={item.text}
                className="
                  group
                  relative
                  rounded-2xl
                  border border-zinc-200
                  bg-white
                  px-6 py-6
                  transition-all duration-300 ease-out

                  shadow-[0_8px_28px_-8px_rgba(15,23,42,0.12)]

                  hover:-translate-y-1
                  hover:shadow-[0_18px_45px_-12px_rgba(15,23,42,0.18)]
                  hover:border-zinc-300
                "
              >
                <div className="
                  pointer-events-none
                  absolute inset-0
                  rounded-2xl
                  opacity-0
                  group-hover:opacity-100
                  transition
                  bg-gradient-to-br from-zinc-50 to-transparent
                " />

                <div className="relative flex items-center gap-3">
                  <div className="
                    flex h-10 w-10 items-center justify-center
                    rounded-lg
                    bg-zinc-100/80
                    ring-1 ring-zinc-200/80
                    transition-all duration-300
                    group-hover:bg-zinc-900
                  ">
                    <Icon className="
                      w-5 h-5
                      text-zinc-800
                      transition-all duration-300 ease-out
                      group-hover:text-white
                      group-hover:scale-105
                      group-hover:rotate-3
                    " />
                  </div>

                  <p className="
                    text-[15px]
                    leading-relaxed
                    text-zinc-800
                    font-medium
                  ">
                    {item.text}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {teamData.members.length > 0 && (
        <section className="fade-up bg-zinc-50 py-20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Team
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-4xl">
              {teamData.title}
            </h2>

            {teamData.groupImage && (
              <div className="relative mt-8 mb-10 aspect-[3/1] overflow-hidden rounded-2xl sm:mt-12">
                <img
                  src={teamData.groupImage}
                  alt="Unser Team"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 flex items-end px-4 pb-2 text-white sm:pb-4 lg:pb-8">
                  <div>
                    <p className="text-sm leading-tight text-white/80">
                      Erfahrene Monteure für Ihr Projekt
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 grid auto-rows-fr gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {teamData.members.map((member) => (
                <article
                  key={member.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top transition duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-zinc-900">
                      {member.name}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600">
                      {member.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
                <span className="font-medium text-zinc-900">Telefon:</span>{" "}
                +49 176 61582721
              </p>
              <p>
                <span className="font-medium text-zinc-900">Email:</span>{" "}
                info.ekt@gmx.de
              </p>
              <p>
                <span className="font-medium text-zinc-900">Adresse:</span>{" "}
                Metzrstraße 13, 86316 Friedberg
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-100 bg-white p-7 shadow-[0_20px_55px_-22px_rgba(15,23,42,0.18)] md:p-8">
          <input type="text" name="company" style={{ display: "none" }} />
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

    </main>
  );
}
