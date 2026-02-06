export type ProjektCardProps = {
  title: string;
  description: string;
  city: string;
};

export default function ProjektCard({
  title,
  description,
  city,
}: ProjektCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{city}</p>
    </article>
  );
}
