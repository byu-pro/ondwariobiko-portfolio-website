export function CaseStudyWordmark({
  src,
  title,
  slug,
}: {
  src: string;
  title: string;
  slug: string;
}) {
  return (
    <div data-project={slug} className="case-wordmark-stage">
      <h1 className="sr-only">{title}</h1>
      <img
        src={src}
        alt={`${title} wordmark`}
        width={2800}
        height={800}
        fetchPriority="high"
        decoding="async"
        className="case-study-wordmark"
      />
    </div>
  );
}
