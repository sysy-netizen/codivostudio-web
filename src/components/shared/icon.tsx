import { BarChart3, Car, Code2, Database, Globe, Workflow, type LucideProps } from "lucide-react";

const icons = {
  car: Car,
  code: Code2,
  chart: BarChart3,
  database: Database,
  workflow: Workflow,
  globe: Globe,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" {...props} />;
}
