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

const imgMuenster =
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80";
const imgOsnabrueck =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80";
const imgBielefeld =
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80";

export const projects: Project[] = [
  {
    id: "muenster",
    title: "Einfamilienhaus in Muenster",
    shortText:
      "8,5 kWp Dachanlage mit optimierter Ausrichtung fuer hohe Eigenversorgung.",
    fullText:
      "Fuer dieses Einfamilienhaus in Muenster haben wir eine 8,5 kWp Photovoltaikanlage auf dem Satteldach montiert. Die Module wurden so ausgerichtet, dass die Tageszeiten mit dem Verbrauch im Haushalt gut zusammenpassen und ein hoher Anteil Solarstrom direkt vor Ort genutzt werden kann.\n\nDie Unterkonstruktion wurde statisch abgestimmt; Kabelwege und Wechselrichterplatz wurden sauber und wartungsfreundlich geplant.",
    coverImage: imgMuenster,
    images: [imgMuenster, imgMuenster, imgMuenster],
    location: "Muenster",
    year: "2023",
  },
  {
    id: "osnabrueck",
    title: "Gewerbehalle in Osnabrueck",
    shortText:
      "Grossflaechenmontage inkl. Unterkonstruktion und abgestimmtem Zeitplan.",
    fullText:
      "Auf dem Flachdach einer Gewerbehalle in Osnabrueck wurde eine Grossanlage inklusive Unterkonstruktion und Abdichtungsdetails montiert. Der Ablauf war eng mit dem Betrieb abgestimmt, damit Lieferungen und Zugaenge kurzfristig nutzbar blieben.\n\nNach Abschluss wurden alle relevanten Bereiche aufgeraeumt uebergeben; die Anlage ist fuer regelmaessige Kontrolle und Service gut erreichbar.",
    coverImage: imgOsnabrueck,
    images: [imgOsnabrueck, imgOsnabrueck, imgOsnabrueck],
    location: "Osnabrueck",
    year: "2024",
  },
  {
    id: "bielefeld",
    title: "Mehrfamilienhaus in Bielefeld",
    shortText:
      "Effiziente Dachbelegung mit Fokus auf Wirtschaftlichkeit und Wartungszugang.",
    fullText:
      "Bei diesem Mehrfamilienhaus in Bielefeld lag der Fokus auf einer effizienten Belegung der Dachflaeche und einem klaren Wirtschaftlichkeitsbild fuer die Eigentuemer. Die Montage erfolgte so, dass Wartung und eventuelle Erweiterungen ohne grosse Eingriffe moeglich bleiben.\n\nKabel und Wechselrichter wurden zentral und dennoch zugaenglich platziert; die Flaeche wurde ohne ueberfluessige Verschnittkanten genutzt.",
    coverImage: imgBielefeld,
    images: [imgBielefeld, imgBielefeld, imgBielefeld],
    location: "Bielefeld",
    year: "2023",
  },
];
