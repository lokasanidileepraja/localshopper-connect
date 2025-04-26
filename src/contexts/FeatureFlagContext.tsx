
import { createContext, useContext, ReactNode } from "react";
import { useFeatureFlagStore } from "@/store/featureFlagStore";

interface FeatureFlagContextType {
  isEnabled: (featureId: string) => boolean;
  toggleFeature: (featureId: string) => void;
  setFeature: (featureId: string, enabled: boolean) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const { flags, toggleFlag, setFlag } = useFeatureFlagStore();

  const isEnabled = (featureId: string): boolean => {
    const feature = flags.find(flag => flag.id === featureId);
    return feature?.enabled || false;
  };

  const value = {
    isEnabled,
    toggleFeature: toggleFlag,
    setFeature: setFlag
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  
  if (context === undefined) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagProvider");
  }
  
  return context;
};
