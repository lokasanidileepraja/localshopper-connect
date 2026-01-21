import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Smartphone, Laptop, Headphones, Watch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { icon: Smartphone, value: "50K+", label: "Products" },
  { icon: MapPin, value: "1000+", label: "Stores" },
  { icon: Laptop, value: "4.9", label: "Rating" },
  { icon: Headphones, value: "24/7", label: "Support" },
];

const features = [
  {
    icon: MapPin,
    title: "Find Local Stores",
    description: "Discover electronics retailers near you with real-time availability.",
    color: "from-blue-500 to-indigo-600",
    link: "/stores"
  },
  {
    icon: Laptop,
    title: "Browse Products",
    description: "Explore the latest electronics from phones to laptops and more.",
    color: "from-emerald-500 to-teal-600",
    link: "/categories"
  },
  {
    icon: Watch,
    title: "Smart Insights",
    description: "Get AI-powered recommendations and price predictions.",
    color: "from-violet-500 to-purple-600",
    link: "/price-compare"
  }
];

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Hero Header */}
        <div className="pt-8 pb-20 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Find the best tech near you</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            <span className="text-primary">Tech</span>
            <span className="text-muted-foreground">Locator</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Your AI-powered electronics shopping companion. Discover, compare, and save with intelligent recommendations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group px-8 py-6 text-base font-medium rounded-full"
              onClick={() => navigate("/stores")}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium rounded-full"
              onClick={() => navigate("/stores")}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Find Stores Near Me
            </Button>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 lg:gap-6 pb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex flex-col items-center px-8 py-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pb-24"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                onClick={() => navigate(feature.link)}
                className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                
                {/* Link */}
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
