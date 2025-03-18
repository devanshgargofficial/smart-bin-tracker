import { useQuery } from "@tanstack/react-query";
import { BinMap } from "@/components/BinMap";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MapPage() {
  const { data: bins = [] } = useQuery({
    queryKey: ["/api/bins"]
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Smart Waste Bins</h1>
        {/* <Link href="/admin">
          <Button variant="outline">Admin Panel</Button>
        </Link> */}
      </div>
      <BinMap bins={bins} className="rounded-lg shadow-lg" />
    </div>
  );
}
