
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { NearbyStoreFinder } from "@/components/store/NearbyStoreFinder";
import { StoreMap } from "@/components/store/StoreMap";

const NearbyStores = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-8">Nearby Stores</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <NearbyStoreFinder onStoreSelect={(storeId) => setSelectedStoreId(storeId)} />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="p-4 h-[500px]">
            <StoreMap selectedStoreId={selectedStoreId} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NearbyStores;
