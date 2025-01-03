import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    content: "Found the perfect laptop for my needs at a great price. The local store comparison feature saved me time and money!",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Professional Photographer",
    content: "The detailed product comparisons helped me make an informed decision on my camera purchase. Excellent service!",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Student",
    content: "Great platform for finding student-friendly deals on electronics. The price alerts feature is super helpful!",
    rating: 4
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};