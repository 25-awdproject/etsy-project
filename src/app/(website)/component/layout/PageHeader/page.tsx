
type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-2 text-gray-400">
        {description}
      </p>
    </header>
  );
}
