export type Project = {
  id: string;
  title: string;
  shortText: string;
  fullText: string;
  coverImage: string;
  images: string[];
  location?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    id: "projekt-1",
    title: "Photovoltaik Anlage Einfamilienhaus",
    shortText: "PV-Anlage für maximale Eigenversorgung.",
    fullText:
      "Installation einer modernen Photovoltaikanlage auf einem Einfamilienhaus. Fokus auf Effizienz und langfristige Nutzung.",
    coverImage: "/projects/projekt-1/cover.jpg",
    images: [
      "/projects/projekt-1/img1.jpg",
      "/projects/projekt-1/img2.jpg",
      "/projects/projekt-1/img3.jpg",
    ],
    location: "Augsburg",
    year: "2024",
  },
  {
    id: "projekt-2",
    title: "Gewerbehalle Montage",
    shortText: "Großflächen PV-Montage für Gewerbe.",
    fullText:
      "Montage einer großflächigen Photovoltaikanlage auf einer Industriehalle inklusive Unterkonstruktion.",
    coverImage: "/projects/projekt-2/cover.jpg",
    images: [
      "/projects/projekt-2/img1.jpg",
      "/projects/projekt-2/img2.jpg",
      "/projects/projekt-2/img3.jpg",
    ],
    location: "München",
    year: "2023",
  },
  {
    id: "projekt-3",
    title: "Dachreinigung & Vorbereitung",
    shortText: "Professionelle Dachreinigung vor Installation.",
    fullText:
      "Reinigung und Vorbereitung eines Dachs für eine neue Photovoltaikanlage.",
    coverImage: "/projects/projekt-3/cover.jpg",
    images: [
      "/projects/projekt-3/img1.jpg",
      "/projects/projekt-3/img2.jpg",
      "/projects/projekt-3/img3.jpg",
    ],
    location: "Donauwörth",
    year: "2024",
  },
  {
    id: "projekt-4",
    title: "PV-Anlage Mehrfamilienhaus",
    shortText: "Effiziente Lösung für mehrere Parteien.",
    fullText:
      "Installation einer Photovoltaikanlage für ein Mehrfamilienhaus mit optimierter Verteilung.",
    coverImage: "/projects/projekt-4/cover.jpg",
    images: [
      "/projects/projekt-4/img1.jpg",
      "/projects/projekt-4/img2.jpg",
      "/projects/projekt-4/img3.jpg",
    ],
    location: "Ulm",
    year: "2022",
  },
  {
    id: "projekt-5",
    title: "Industrieprojekt PV",
    shortText: "Großanlage für Industriegebäude.",
    fullText:
      "Planung und Umsetzung einer PV-Anlage auf einem Industriekomplex.",
    coverImage: "/projects/projekt-5/cover.jpg",
    images: [
      "/projects/projekt-5/img1.jpg",
      "/projects/projekt-5/img2.jpg",
      "/projects/projekt-5/img3.jpg",
    ],
    location: "Stuttgart",
    year: "2023",
  },
  {
    id: "projekt-6",
    title: "Dachsanierung & PV",
    shortText: "Sanierung und Installation kombiniert.",
    fullText:
      "Komplette Dachsanierung inklusive anschließender PV-Montage.",
    coverImage: "/projects/projekt-6/cover.jpg",
    images: [
      "/projects/projekt-6/img1.jpg",
      "/projects/projekt-6/img2.jpg",
      "/projects/projekt-6/img3.jpg",
    ],
    location: "Augsburg",
    year: "2024",
  },
  {
    id: "projekt-7",
    title: "Privathaus PV-Anlage",
    shortText: "Individuelle Lösung für Einfamilienhaus.",
    fullText: "Maßgeschneiderte Photovoltaikanlage für privaten Haushalt.",
    coverImage: "/projects/projekt-7/cover.jpg",
    images: [
      "/projects/projekt-7/img1.jpg",
      "/projects/projekt-7/img2.jpg",
      "/projects/projekt-7/img3.jpg",
    ],
    location: "Ingolstadt",
    year: "2022",
  },
  {
    id: "projekt-8",
    title: "Gewerbliche Dachanlage",
    shortText: "Optimierte Energie für Unternehmen.",
    fullText:
      "PV-Lösung für gewerblichen Kunden mit Fokus auf Energieeinsparung.",
    coverImage: "/projects/projekt-8/cover.jpg",
    images: [
      "/projects/projekt-8/img1.jpg",
      "/projects/projekt-8/img2.jpg",
      "/projects/projekt-8/img3.jpg",
    ],
    location: "Nürnberg",
    year: "2023",
  },
  {
    id: "projekt-9",
    title: "Solarpark Installation",
    shortText: "Großprojekt im Bereich Solarenergie.",
    fullText:
      "Installation eines kleinen Solarparks für nachhaltige Energiegewinnung.",
    coverImage: "/projects/projekt-9/cover.jpg",
    images: [
      "/projects/projekt-9/img1.jpg",
      "/projects/projekt-9/img2.jpg",
      "/projects/projekt-9/img3.jpg",
    ],
    location: "Bayern",
    year: "2024",
  },
];
