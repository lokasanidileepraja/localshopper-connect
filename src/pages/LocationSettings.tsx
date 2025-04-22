
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Locate, Navigation, Store, Home, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function LocationSettings() {
  const { toast } = useToast();
  const [location, setLocation] = useLocalStorage("user-location", "");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  
  // Sample popular locations in India
  const popularLocations = [
    { id: 1, name: "Connaught Place, Delhi", type: "shopping" },
    { id: 2, name: "Indiranagar, Bangalore", type: "shopping" },
    { id: 3, name: "T Nagar, Chennai", type: "shopping" },
    { id: 4, name: "Linking Road, Mumbai", type: "shopping" },
    { id: 5, name: "Sector 18, Noida", type: "shopping" }
  ];
  
  // Sample saved locations
  const [savedLocations, setSavedLocations] = useLocalStorage("saved-locations", [
    { id: 1, name: "Home", address: "123 Main Street, Bangalore", type: "home" },
    { id: 2, name: "Work", address: "Tech Park, Whitefield, Bangalore", type: "work" }
  ]);
  
  // Sample search results based on query
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    
    // Mock search functionality
    return [
      { id: 1, name: `${searchQuery} Market`, distance: "1.2 km" },
      { id: 2, name: `${searchQuery} Mall`, distance: "2.5 km" },
      { id: 3, name: `${searchQuery} Tech Hub`, distance: "3.8 km" }
    ];
  };
  
  const searchResults = getSearchResults();
  
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive"
      });
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would use these coordinates with a geocoding service
        const { latitude, longitude } = position.coords;
        
        // Simulate geocoding by setting a mock address
        const mockAddress = "Your Current Location";
        setLocation(mockAddress);
        
        toast({
          title: "Location updated",
          description: `Successfully set to: ${mockAddress}`,
        });
        
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location error",
          description: "Couldn't access your location. Please try again or enter manually.",
          variant: "destructive"
        });
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };
  
  const selectLocation = (locationName: string) => {
    setLocation(locationName);
    toast({
      title: "Location updated",
      description: `Successfully set to: ${locationName}`,
    });
  };
  
  const saveNewLocation = (name: string, address: string, type: string) => {
    const newLocation = {
      id: Date.now(),
      name,
      address,
      type
    };
    
    setSavedLocations([...savedLocations, newLocation]);
    
    toast({
      title: "Location saved",
      description: `Added ${name} to your saved locations`,
    });
  };
  
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Location Settings</h1>
      <p className="text-muted-foreground text-center mb-8">
        Set your shopping location to find nearby stores and deals
      </p>
      
      <Tabs defaultValue="current" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Current Location
              </CardTitle>
              <CardDescription>
                {location ? "Your current shopping location" : "No location set yet"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Navigation className="h-5 w-5 text-primary mr-2" />
                    <span>{location}</span>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              ) : (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p>No location has been set yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set your location to find nearby stores and deals
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setLocation("")}
                disabled={!location}
              >
                Clear
              </Button>
              <Button 
                onClick={getCurrentLocation} 
                disabled={isLocating}
              >
                <Locate className="mr-2 h-4 w-4" />
                {isLocating ? "Detecting..." : "Get Current Location"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Shopping Areas</CardTitle>
              <CardDescription>
                Quick select from popular shopping locations
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {popularLocations.map((loc) => (
                <Button 
                  key={loc.id}
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => selectLocation(loc.name)}
                >
                  <Store className="mr-2 h-4 w-4 text-primary" />
                  {loc.name}
                  <Badge variant="secondary" className="ml-auto">
                    {loc.type}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Locations</CardTitle>
              <CardDescription>
                Your saved locations for quick access
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {savedLocations.length > 0 ? (
                savedLocations.map((loc: any) => (
                  <Button 
                    key={loc.id}
                    variant="outline" 
                    className="justify-start h-auto py-3"
                    onClick={() => selectLocation(loc.address)}
                  >
                    {loc.type === 'home' ? (
                      <Home className="mr-2 h-4 w-4 text-primary" />
                    ) : (
                      <Store className="mr-2 h-4 w-4 text-primary" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">{loc.name}</div>
                      <div className="text-xs text-muted-foreground">{loc.address}</div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="ml-auto"
                    >
                      {loc.type}
                    </Badge>
                  </Button>
                ))
              ) : (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <p>No saved locations yet</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => saveNewLocation("Office", "Business District, Mumbai", "work")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Add New Location (Demo)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Location</CardTitle>
              <CardDescription>
                Find and set a specific location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type an area name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button disabled={!searchQuery}>
                  Search
                </Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="grid gap-2 mt-4">
                  {searchResults.map((result) => (
                    <Button 
                      key={result.id}
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => selectLocation(result.name)}
                    >
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">{result.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {result.distance} away
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
              
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
