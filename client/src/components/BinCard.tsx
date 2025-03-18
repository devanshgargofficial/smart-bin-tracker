import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bin } from "@shared/schema";

interface BinCardProps {
  bin: Bin;
}

export function BinCard({ bin }: BinCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{bin.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Organic Waste</span>
              <span className="text-sm">{bin.organicLevel}%</span>
            </div>
            <Progress value={bin.organicLevel} className="bg-green-100" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Recyclable Waste</span>
              <span className="text-sm">{bin.recyclableLevel}%</span>
            </div>
            <Progress value={bin.recyclableLevel} className="bg-blue-100" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
