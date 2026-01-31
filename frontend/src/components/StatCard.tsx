import { Card, CardContent } from "../components/ui/card";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </CardContent>
    </Card>
  );
}
