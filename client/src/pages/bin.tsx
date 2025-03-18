import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { BinCard } from "@/components/BinCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useDropzone } from "react-dropzone";
import { queryClient } from "@/lib/queryClient";
import { Link } from "wouter";

export default function BinPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const binId = parseInt(params.id);

  const { data: bin } = useQuery({
    queryKey: [`/api/bins/${binId}`],
  });

  const classifyMutation = useMutation({
    mutationFn: async (file: File) => {
      try {
        // Convert file to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        console.log("heloo client side");
        console.log("base64", base64);
        const tempUrl = "https://cdn.britannica.com/70/158370-050-CC2F25D4/Carrots-Apiales-members.jpg"

        // Send to our API for classification
        // const response = await apiRequest("POST", `/api/classify?binId=${binId}`, {
        //   imageUrl: base64,
        //   // imageUrl: tempUrl,
        // });
        // /api/classify"
        const response = await fetch(`/api/classify?binId=${binId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: base64 }),
        });
        
        console.log(response);

        const data = await response.json();

        toast({ 
          title: "Waste Classified", 
          description: `Detected as ${data.type} waste`
        });

        return data;
      } catch (error) {
        console.error("Classification error:", error);
        toast({ 
          title: "Classification Failed", 
          description: "Could not classify the waste image", 
          variant: "destructive" 
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/bins/${binId}`] });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (files) => {
      const file = files[0];
      if (file) {
        classifyMutation.mutate(file);
      }
    },
  });

  // Function to fetch and classify sample images
  // const classifySampleImage = async (url: string) => {
  //   try {
  //     // Fetch the image and convert to blob
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     // Create a File object from the blob
  //     const file = new File([blob], "sample.jpg", { type: "image/jpeg" });
  //     classifyMutation.mutate(file);
  //   } catch (error) {
  //     console.error("Error loading sample image:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to load sample image",
  //       variant: "destructive"
  //     });
  //   }
  // };

  if (!bin) return null;

  return (
    <>
      <Link href="/">
        <Button variant="outline" className="m-5">Back to map</Button>
      </Link>
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">{bin.name}</h1>

        <div className="mb-8">
          <BinCard bin={bin} />
        </div>

        <div className="space-y-6">
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input {...getInputProps()} />
            <p className="text-lg mb-2">Drop an image here or click to select</p>
            <p className="text-sm text-gray-500">
              Supports common image formats (JPG, PNG, etc.)
            </p>
          </div>

          {classifyMutation.isPending && (
            <div className="text-center text-gray-600">
              Analyzing waste image...
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">How it works</h2>
            <p className="text-gray-600">
              Upload an image of waste, and our AI will classify it as either organic or recyclable waste.
              The bin levels will be automatically updated based on the classification.
            </p>
          </div>
          {/* <div className="grid grid-cols-2 gap-4"> */}
            {/* <div>
              <h3 className="font-semibold mb-2">Sample Organic Waste</h3>
              <div className="grid gap-2">
                {SAMPLE_IMAGES.organic.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Sample organic waste"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => classifySampleImage(url)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sample Recyclable Waste</h3>
              <div className="grid gap-2">
                {SAMPLE_IMAGES.recyclable.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Sample recyclable waste"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => classifySampleImage(url)}
                  />
                ))}
              </div>
            </div>
          </div>*/}
        </div> 
      </div>
    </>
  );
}

{/* const SAMPLE_IMAGES = {
  organic: [
    "https://images.unsplash.com/photo-1526951521990-620dc14c214b",
    "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9",
    "https://images.unsplash.com/photo-1475948164756-9a56289068fb",
  ],
  recyclable: [
    "https://images.unsplash.com/photo-1620545786225-14fcf9a7ab6c",
    "https://images.unsplash.com/photo-1542601524107-6a85034106d7",
    "https://images.unsplash.com/photo-1603189778854-74e82b487041",
  ],
}; */}