import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBinSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useToast } from "@/hooks/use-toast";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

type LocationMarker = {
  onLocationSelect: (lat: number, lng: number) => void;
};

function LocationMarker({ onLocationSelect }: LocationMarker) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface CreateBinFormProps {
  onSubmit: (data: any) => void;
}

export function CreateBinForm({ onSubmit }: CreateBinFormProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertBinSchema.extend({
      name: insertBinSchema.shape.name.min(1, "Bin name is required")
    })),
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
      organicLevel: 0,
      recyclableLevel: 0
    }
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    form.setValue("latitude", lat.toString());
    form.setValue("longitude", lng.toString());
  };

  const handleSubmit = async (data: any) => {
    if (!form.getValues("name").trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the bin",
        variant: "destructive"
      });
      return;
    }

    if (!position) {
      toast({
        title: "Location Required",
        description: "Please select a location on the map for the bin",
        variant: "destructive"
      });
      return;
    }

    await onSubmit(data);

    // Reset form and map after successful submission
    form.reset();
    setPosition(null);
    toast({
      title: "Success",
      description: "New bin has been added successfully",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Bin</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bin Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter bin name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Location (Required)</label>
            <div className="h-[300px] rounded-lg overflow-hidden border">
              <MapContainer
                center={[40.7128, -74.0060]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker onLocationSelect={handleLocationSelect} />
                {position && <Marker position={position} />}
              </MapContainer>
            </div>
            {!position && (
              <p className="text-sm text-destructive">Click on the map to select bin location</p>
            )}
          </div>

          <Button type="submit" className="w-full">Add Bin</Button>
        </form>
      </Form>
    </Card>
  );
}