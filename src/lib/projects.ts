export type Project = {
  id: string;
  title: string;
  text: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: "muenster",
    title: "Einfamilienhaus in Muenster",
    text: "8,5 kWp Dachanlage mit optimierter Ausrichtung fuer hohe Eigenversorgung.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "osnabrueck",
    title: "Gewerbehalle in Osnabrueck",
    text: "Grossflaechenmontage inkl. Unterkonstruktion und abgestimmtem Zeitplan.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bielefeld",
    title: "Mehrfamilienhaus in Bielefeld",
    text: "Effiziente Dachbelegung mit Fokus auf Wirtschaftlichkeit und Wartungszugang.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
  },
];
