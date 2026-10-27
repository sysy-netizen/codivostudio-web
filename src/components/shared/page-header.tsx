export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border">
      <div className="container-content py-14 text-center sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-[32px] font-bold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">{description}</p>}
      </div>
    </div>
  );
}
