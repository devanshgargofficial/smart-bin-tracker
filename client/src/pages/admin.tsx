import { useQuery, useMutation } from "@tanstack/react-query";
import { BinCard } from "@/components/BinCard";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CreateBinForm } from "@/components/CreateBinForm";
import type { Bin } from "@shared/schema";

export default function AdminPage() {
  const { toast } = useToast();
  const { data: bins = [] } = useQuery<Bin[]>({
    queryKey: ["/api/bins"]
  });

  const emptyBinMutation = useMutation({
    mutationFn: async (binId: number) => {
      return apiRequest("POST", `/api/bins/${binId}/empty`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bins"] });
      toast({ title: "Bin emptied successfully" });
    }
  });

  const createBinMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/bins", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bins"] });
      toast({ title: "New bin added successfully" });
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <CreateBinForm onSubmit={(data) => createBinMutation.mutate(data)} />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Existing Bins</h2>
          {bins.map((bin) => (
            <div key={bin.id} className="space-y-4">
              <BinCard bin={bin} />
              <Button 
                className="w-full"
                onClick={() => emptyBinMutation.mutate(bin.id)}
                disabled={emptyBinMutation.isPending}
              >
                Empty Bin
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}