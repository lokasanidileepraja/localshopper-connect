
import { useEffect, useState } from "react";
import { BarChart, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { BadgesGrid } from "@/components/gamification/BadgesGrid";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badges: number;
  savingsAmount: number;
  reviewsCount: number;
}

const Leaderboard = () => {
  const [topSavers, setTopSavers] = useState<LeaderboardUser[]>([]);
  const [topReviewers, setTopReviewers] = useState<LeaderboardUser[]>([]);
  const [topOverall, setTopOverall] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Simulate API fetch
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // In a real app, this would be an API call
        const mockUsers: LeaderboardUser[] = [
          {
            id: "user1",
            name: "Amit Sharma",
            avatar: "https://i.pravatar.cc/150?img=1",
            points: 1250,
            rank: 1,
            badges: 5,
            savingsAmount: 12500,
            reviewsCount: 24
          },
          {
            id: "user2",
            name: "Priya Patel",
            avatar: "https://i.pravatar.cc/150?img=2",
            points: 980,
            rank: 2,
            badges: 4,
            savingsAmount: 9800,
            reviewsCount: 19
          },
          {
            id: "user3",
            name: "Rahul Verma",
            avatar: "https://i.pravatar.cc/150?img=3",
            points: 870,
            rank: 3,
            badges: 3,
            savingsAmount: 8700,
            reviewsCount: 15
          },
          {
            id: "user4",
            name: "Neha Gupta",
            avatar: "https://i.pravatar.cc/150?img=4",
            points: 760,
            rank: 4,
            badges: 3,
            savingsAmount: 7600,
            reviewsCount: 12
          },
          {
            id: "user5",
            name: "Vikram Singh",
            avatar: "https://i.pravatar.cc/150?img=5",
            points: 650,
            rank: 5,
            badges: 2,
            savingsAmount: 6500,
            reviewsCount: 10
          },
          {
            id: "user6",
            name: "Ananya Reddy",
            avatar: "https://i.pravatar.cc/150?img=6",
            points: 540,
            rank: 6,
            badges: 2,
            savingsAmount: 5400,
            reviewsCount: 18
          },
          {
            id: "user7",
            name: "Karthik Iyer",
            avatar: "https://i.pravatar.cc/150?img=7",
            points: 430,
            rank: 7,
            badges: 1,
            savingsAmount: 4300,
            reviewsCount: 22
          },
          {
            id: "user8",
            name: "Meera Joshi",
            avatar: "https://i.pravatar.cc/150?img=8",
            points: 320,
            rank: 8,
            badges: 1,
            savingsAmount: 3200,
            reviewsCount: 7
          },
        ];
        
        setTopOverall([...mockUsers].sort((a, b) => b.points - a.points));
        setTopSavers([...mockUsers].sort((a, b) => b.savingsAmount - a.savingsAmount));
        setTopReviewers([...mockUsers].sort((a, b) => b.reviewsCount - a.reviewsCount));
        
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error loading leaderboard",
          description: "Could not fetch leaderboard data. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    fetchLeaderboard();
  }, [toast]);

  // Function to render color based on rank
  const getRankColor = (rank: number) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#C0C0C0"; // Silver
    if (rank === 3) return "#CD7F32"; // Bronze
    return "#9370DB"; // Other ranks
  };
  
  // Format for currency
  const formatCurrency = (amount: number) => 
    `₹${amount.toLocaleString()}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Community Leaderboard | TechLocator</title>
        <meta name="description" content="See the top savers and reviewers in our tech community" />
      </Helmet>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Community Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            See the top members in our tech shopping community
          </p>
        </div>
        <PointsDisplay size="lg" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {["Savings", "Reviews", "Overall"].map((category, index) => (
          <Card key={category} className="overflow-hidden">
            <div className={`h-2 ${
              index === 0 ? "bg-green-500" :
              index === 1 ? "bg-blue-500" :
              "bg-purple-500"
            }`} />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{`Top ${category}`}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {(index === 0 ? topSavers : 
                    index === 1 ? topReviewers : 
                    topOverall).slice(0, 3).map((user, i) => (
                    <motion.li 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: getRankColor(i + 1) }}
                      >
                        {i + 1}
                      </div>
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {index === 0 && `Saved ${formatCurrency(user.savingsAmount)}`}
                          {index === 1 && `${user.reviewsCount} reviews`}
                          {index === 2 && `${user.points.toLocaleString()} points`}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overall" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overall">Overall Points</TabsTrigger>
          <TabsTrigger value="savings">Top Savers</TabsTrigger>
          <TabsTrigger value="reviews">Top Reviewers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Overall Points Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-80 w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <RechartsBarChart data={topOverall} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis 
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} points`, "Score"]}
                      labelFormatter={(label) => `User: ${label}`}
                    />
                    <Bar dataKey="points" radius={[0, 4, 4, 0]}>
                      {topOverall.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRankColor(index + 1)} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="savings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Top Savers Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-80 w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <RechartsBarChart data={topSavers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis 
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount Saved"]}
                      labelFormatter={(label) => `User: ${label}`}
                    />
                    <Bar dataKey="savingsAmount" radius={[0, 4, 4, 0]}>
                      {topSavers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#4ade80" />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Top Reviewers Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-80 w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <RechartsBarChart data={topReviewers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis 
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} reviews`, "Reviews"]}
                      labelFormatter={(label) => `User: ${label}`}
                    />
                    <Bar dataKey="reviewsCount" radius={[0, 4, 4, 0]}>
                      {topReviewers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <BadgesGrid />
    </div>
  );
};

export default Leaderboard;
