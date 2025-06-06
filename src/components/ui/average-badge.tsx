import { Badge } from "@/components/ui/badge";

interface AverageBadgeProps {
  value: number | null;
  children?: React.ReactNode;
}

const getBadgeVariant = (average: number | null): "pass" | "fail" | "low" | "outline" => {
  if (average === null) return "outline";
  if (average >= 7) return "pass";
  if (average >= 5) return "low";
  return "fail";
};

export default function AverageBadge({ value, children }: AverageBadgeProps) {
  return (
    <Badge variant={getBadgeVariant(value)}>
      {children}
    </Badge>
  );
} 